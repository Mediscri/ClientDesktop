// @flow
import produce from 'immer';
import moment from 'moment';

type Chart = {|
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
  categories: {
    cc: string, // chief complaint
    pi: string, // present illness
    pmh: string, // past medical history
    fh: string, // family history
    sh: string, // social history
    ros: string, // review of system
  },
|};

const response: Chart = {
  id: 1,
  created_at: moment(),
  patient: {
    id: 4,
    name: '원지운',
    age: 27,
    sex: 'm',
  },
  doctor: {
    id: 4,
    name: '전명훈',
  },
  categories: {
    cc: '[{"text":"자고 일어나니까 배가 너무 아파요 의사선생님"}]',
    pi:
      '[{"text":"아랫배쪽이 아파요"},{"text":"누가 바늘로 쿡쿡 찌르는 것 같아요"},{"text":"처음에는 한 곳만 아팠는데 점점 퍼지는 것 같아요"},{"text":"어제 중국집에 가서 과식했었어요"}]',
    pmh:
      '[{"text":"이렇게 아픈건 처음이에요"},{"text":"전에 장염에 걸려서 병원에 간 적이 있어요"},{"text":"소화제 먹은 적 있었어요"}]',
    fh: '[{"text":"가족중에 아픈 사람은 없어요"}]',
    sh: '[{"text":"술을 좋아해서 자주 마셔요"}]',
    ros:
      '[{"text":"아프고 나서 몸무게가 한 4키로 빠진 것 같아요"},{"text":"열은 없어요"}]',
  },
};

export const getChart = (id: number) => {
  return produce(response, draft => {
    for (const key in draft.categories) {
      const value = draft.categories[key];
      draft.categories[key] = JSON.parse(value);
    }
  });
};