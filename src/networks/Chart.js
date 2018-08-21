// @flow
import { http } from './index';
import chartTest from './chart.test';

// [GET] /charts/?created_today
async function getByDate(created_today: boolean = true) {
  const response = await http.get('/charts/', { params: { created_today } });
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
  return Promise.resolve(response);
}

// [POST] /charts/
async function post(body: { patient: string }) {
  const response = await http.post('/charts/', { body });
  return Promise.resolve(response);
}

export default { getByDate, getById, getDetail, post };
