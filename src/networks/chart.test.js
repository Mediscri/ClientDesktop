// @flow
import produce from 'immer';
import moment from 'moment';

const chart = {
  id: 'eb18a87d-d431-46f7-acec-d7c21510701d',
  created: moment(),
  patient: {
    id: 4,
    name: '원지운',
    age: 27,
    gender: 'male',
  },
  doctor: { id: 'ci2xa87d-da31-4637-ccbe-d7c21513501d', name: '전명훈' },
  categories: {
    cc: [{ text: '자고 일어나니까 배가 너무 아파요 의사선생님' }],
    pi: [
      { text: '아랫배쪽이 아파요' },
      { text: '누가 바늘로 쿡쿡 찌르는 것 같아요' },
      { text: '처음에는 한 곳만 아팠는데 점점 퍼지는 것 같아요' },
      { text: '어제 중국집에 가서 과식했었어요' },
    ],
    pmh: [
      { text: '이렇게 아픈건 처음이에요' },
      { text: '전에 장염에 걸려서 병원에 간 적이 있어요' },
      { text: '소화제 먹은 적 있었어요' },
    ],
    fh: [{ text: '가족중에 아픈 사람은 없어요' }],
    sh: [{ text: '술을 좋아해서 자주 마셔요' }],
    ros: [
      { text: '아프고 나서 몸무게가 한 4키로 빠진 것 같아요' },
      { text: '열은 없어요' },
    ],
    u: [],
  },
};

async function get() {
  return await Promise.resolve(
    produce(chart, draft => {
      for (const key in draft.categories) {
        draft.categories[key].forEach((data, idx) => {
          data.index = idx;
        });
      }
    })
  );
}

export default { get };
