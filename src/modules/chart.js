// @flow
import type { Dispatch } from 'redux';
// import { pender } from 'redux-pender';
import produce from 'immer';
// network
import { getChartAPI } from '../networks';

type ChartNew = {|
  +id: number,
  +created_at: Date,
  +patient: {
    +id: number,
    +name: string,
    +age: number,
    +sex: 'm' | 'f',
  },
  +doctor: {
    +id: number,
    +name: string,
  },
|};

type Chart = {|
  ...ChartNew,
  categories: {
    cc: Array<{ text: string, accuracy?: number }>, // chief complaint
    pi: Array<{ text: string, accuracy?: number }>, // present illness
    pmh: Array<{ text: string, accuracy?: number }>, // past medical history
    fh: Array<{ text: string, accuracy?: number }>, // family history
    sh: Array<{ text: string, accuracy?: number }>, // social history
    ros: Array<{ text: string, accuracy?: number }>, // review of system
  },
|};

type Item = {
  +category: string,
  +prevText?: string,
  +nextText?: string,
  +accuracy?: number,
};

// *** ACTION TYPE
const GET_CHART = 'chart/GET_CHART';
const CREATE_CHART = 'chart/CREATE_CHART';
const CREATE_ITEM = 'chart/CREATE_ITEM';
const UPDATE_ITEM = 'chart/UPDATE_ITEM';
const DELETE_ITEM = 'chart/DELETE_ITEM';

// *** ACTION WITH NETWORK
export const getChart = (id: number) => (dispatch: Dispatch) =>
  getChartAPI(id).then(data =>
    dispatch({
      type: GET_CHART,
      payload: data,
    })
  );

// *** ACTION FUNCTION
export const createChart = (data: ChartNew) => ({
  type: CREATE_CHART,
  payload: data,
});
export const createItem = (data: Item) => ({
  type: CREATE_ITEM,
  payload: data,
});
export const updateItem = (data: Item) => ({
  type: UPDATE_ITEM,
  payload: data,
});
export const deleteItem = (data: Item) => ({
  type: DELETE_ITEM,
  payload: data,
});

// *** INITIAL STATE
const initState = { id: null };

// *** REDUCER
type Action =
  | {|
      +type: typeof GET_CHART,
      +payload: Chart,
    |}
  | {|
      +type: typeof CREATE_CHART,
      +payload: ChartNew,
    |}
  | {|
      +type: typeof CREATE_ITEM,
      +payload: Item,
    |}
  | {|
      +type: typeof UPDATE_ITEM,
      +payload: Item,
    |}
  | {|
      +type: typeof DELETE_ITEM,
      +payload: Item,
    |};

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
        draft.categories[category].push({ text: nextText, accuracy });
      });
    }
    case UPDATE_ITEM: {
      const { category, prevText, nextText } = action.payload;
      return produce(state, draft => {
        const update = draft.categories[category].find(
          data => data.text === prevText
        );
        update.text = nextText;
        update.accuracy = 100;
      });
    }
    case DELETE_ITEM:
      const { category, prevText } = action.payload;
      return produce(state, draft => {
        draft.categories[category].filter(data => data.text !== prevText);
      });
    default:
      return state;
  }
}
