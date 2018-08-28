// @flow
import moment from 'moment';
import produce from 'immer';
// network
import { Chart as ChartAPI, Patient as PatientAPI } from '../networks';
// type
import type { Dispatch } from 'redux';
import type Moment from 'moment';
import type { Patient, PatientNew } from '../networks/Patient';
import type { BrowserHistory } from 'history';

export type ChartNew = {|
  +id: string,
  +created: Moment,
  +patient: Patient,
  +doctor: { +id: string, +name: string },
|};

export type ChartItem = {|
  text: string,
  index: number,
  accuracy?: number,
|};

export type Chart = {|
  ...ChartNew,
  categories: {
    cc: Array<ChartItem>, // chief complaint
    pi: Array<ChartItem>, // present illness
    pmh: Array<ChartItem>, // past medical history
    fh: Array<ChartItem>, // family history
    sh: Array<ChartItem>, // social history
    ros: Array<ChartItem>, // review of system
    u: Array<ChartItem>, // undefined
  },
|};

export type Item = {
  +category: string,
  +index?: number,
  +nextText?: string,
  +accuracy?: number,
};

export type Move = {
  +prevCategory: string,
  +nextCategory: string,
  +prevIndex: number,
  +nextIndex: number,
};

// *** ACTION TYPE
const GET_CHART = 'chart/GET_CHART';
const CREATE_CHART = 'chart/CREATE_CHART';
const CREATE_ITEM = 'chart/CREATE_ITEM';
const MOVE_ITEM = 'chart/MOVE_ITEM';
const UPDATE_ITEM = 'chart/UPDATE_ITEM';
const DELETE_ITEM = 'chart/DELETE_ITEM';

// *** ACTION WITH NETWORK
export const getChart = (chart_id: string, history: BrowserHistory) => (
  dispatch: Dispatch
) =>
  ChartAPI.getDetail(chart_id).then(data => {
    dispatch({ type: GET_CHART, payload: data });
    history.replace(`/dashboard/${chart_id}`);
  });

export const createChart = (data: PatientNew) => (dispatch: Dispatch) =>
  PatientAPI.post(data).then(patient =>
    ChartAPI.post({ patient: patient.id }).then(chartData =>
      dispatch({
        type: CREATE_CHART,
        payload: {
          ...chartData,
          created: moment(chartData.created),
          patient: {
            ...patient,
            gender: patient.gender === 0 ? 'male' : 'female',
          },
        },
      })
    )
  );

export const createItem = (data: Item) => (dispatch: Dispatch) =>
  dispatch({ type: CREATE_ITEM, payload: data });

// *** ACTION FUNCTION
export const moveItem = (data: Move) => ({ type: MOVE_ITEM, payload: data });
export const updateItem = (data: Item) => (dispatch: Dispatch) =>
  dispatch({ type: UPDATE_ITEM, payload: data });
export const deleteItem = (data: Item) => (dispatch: Dispatch) =>
  dispatch({ type: DELETE_ITEM, payload: data });

// *** INITIAL STATE
const initState = { id: null };

// *** REDUCER
type Action =
  | { +type: typeof GET_CHART, +payload: Chart }
  | { +type: typeof CREATE_CHART, +payload: ChartNew }
  | { +type: typeof CREATE_ITEM, +payload: Item }
  | { +type: typeof MOVE_ITEM, +payload: Move }
  | { +type: typeof UPDATE_ITEM, +payload: Item }
  | { +type: typeof DELETE_ITEM, +payload: Item };

export default function chart(
  // $FlowFixMe
  state: Chart = initState,
  action: Action
): Chart | ChartNew {
  switch (action.type) {
    case GET_CHART:
      return action.payload;
    case CREATE_CHART:
      return action.payload;
    case CREATE_ITEM: {
      const { category, nextText, accuracy } = action.payload;
      return produce(state, draft => {
        const index = draft.categories[category].length;
        draft.categories[category].push({
          text: nextText,
          accuracy,
          index,
        });
      });
    }
    case MOVE_ITEM: {
      // TODO: work Move Item function
      const {
        prevCategory,
        nextCategory,
        prevIndex,
        nextIndex,
      } = action.payload;
      return produce(state, draft => {
        const item = draft.categories[prevCategory].splice(prevIndex, 0);
        draft.categories[nextCategory].splice(nextIndex, 0, item);
      });
    }
    case UPDATE_ITEM: {
      const { category, index, nextText } = action.payload;
      return produce(state, draft => {
        const update = draft.categories[category][index];
        update.text = nextText;
        update.accuracy = 100;
      });
    }
    case DELETE_ITEM:
      const { category, index } = action.payload;
      return produce(state, draft => {
        draft.categories[category].splice(index, 1);
        // *** RESET INDEX
        draft.categories[category].forEach((data, idx) => {
          data.index = idx;
        });
      });
    default:
      return state;
  }
}
