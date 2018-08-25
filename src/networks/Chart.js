// @flow
import { http } from './index';
// network
import chartTest from './chart.test';

// [GET] /charts/?created_today
async function getByDate(created_today: boolean = true) {
  // const response = await http.get('/charts/', { params: { created_today } });
  // return Promise.resolve(response.data);

  // *** TODO: REMOVE TEST CODE
  const resAlt = await chartTest.get();
  return Promise.resolve(resAlt);
}

// [GET] /charts/?patient
async function getById(patient: string) {
  const response = await http.get('/charts/', { params: { patient } });
  return Promise.resolve(response.data);
}

// [GET] /charts/:id/
async function getDetail(chart_id: string) {
  const response = await http.get(`/charts/${chart_id}/`);
  return Promise.resolve(response.data);
}

// [POST] /charts/
async function post(data: { patient: string }) {
  const response = await http.post('/charts/', data);
  const result = {
    ...response.data,
    // INITIAL DATA
    doctor: { id: 'ci2xa87d-da31-4637-ccbe-d7c21513501d', name: '전명훈' },
    categories: { cc: [], pi: [], pmh: [], fh: [], sh: [], ros: [] },
  };

  return Promise.resolve(result);
}

export default { getByDate, getById, getDetail, post };
