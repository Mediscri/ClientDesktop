import moment from 'moment';
import produce from 'immer';
import { getChart } from './chart';
// network
import { Chart as ChartAPI } from '../networks';
// type
import type { Dispatch } from 'redux';
import type Moment from 'moment';
import type { Patient } from '../networks/Patient';
import type { BrowserHistory } from 'history';

export type Item = {|
  +id: string,
  +patient: Patient,
  +cc: string | null,
  created: Moment,
  modified: Moment,
|};

export type Data = {|
  date: Moment,
  history: Array<Item>,
|};

export type ChartList = {|
  +count: number,
  +next: null,
  +previous: null,
  list: Array<Data>,
|};

type Response = {|
  +count: number,
  +next: null,
  +previous: null,
  +results: Array<Item>,
|};

// *** ACTION TYPE
const GET_CHART_LIST = 'chart/GET_CHART_LIST';
const ADD_CHART_TO_LIST = 'chart/ADD_CHART_TO_LIST';

// *** ACTION FUNCTION
function updateFormat(data: Response) {
  const { results, ...ect } = data;
  let list = [];

  for (const item of results) {
    item.created = moment(item.created, 'YYYY년 MM월 DD일 HH:mm:ss');
    item.modified = moment(item.modified, 'YYYY년 MM월 DD일 HH:mm:ss');
    if (list.length === 0) {
      list.push({ date: item.created, history: [item] });
      continue;
    }

    if (list[list.length - 1].date.isSame(item.created, 'day')) {
      list[list.length - 1].history.push(item);
    } else {
      list.push({ date: item.created, history: [item] });
    }
  }

  return { ...ect, list };
}

export const getChartListByDate = (
  created_today?: boolean = true,
  history?: BrowserHistory
) => (dispatch: Dispatch) =>
  ChartAPI.getByDate(created_today).then(prevData => {
    const data = updateFormat(prevData);
    dispatch({ type: GET_CHART_LIST, payload: data });

    // *** LOAD FIRST DASHBOARD DATA
    if (history && prevData.count > 0) {
      const chart_id = prevData.results[0].id;
      getChart(chart_id, history)(dispatch);
    }
  });

export const getChartListById = (patient: string) => (dispatch: Dispatch) =>
  ChartAPI.getById(patient).then(data =>
    dispatch({ type: GET_CHART_LIST, payload: updateFormat(data) })
  );

export const addChartToList = (item: Item) => (dispatch: Dispatch) =>
  dispatch({ type: ADD_CHART_TO_LIST, payload: item });

// *** INITIAL STATE
const initState = { count: 0, next: null, previous: null, list: [] };

// *** REDUCER
type Action =
  | {
      +type: typeof GET_CHART_LIST,
      +payload: ChartList,
    }
  | {
      +type: typeof ADD_CHART_TO_LIST,
      +payload: Item,
    };

export default function chartList(
  state: ChartList = initState,
  action: Action
) {
  switch (action.type) {
    case GET_CHART_LIST:
      return { ...state, ...action.payload };
    case ADD_CHART_TO_LIST:
      return produce(state, draft => {
        // $FlowFixMe
        const { created } = action.payload;
        if (draft.count > 0 && draft.list[0].date.isSame(created, 'day')) {
          draft.list[0].history.unshift(action.payload);
        } else {
          draft.list.unshift({ date: created, history: [action.payload] });
        }
      });
    default:
      return state;
  }
}
