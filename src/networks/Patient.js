// @flow
import { http } from './index';

// [GET] /patients/
async function get() {
  const response = await http.get('/patients/');
  return Promise.resolve(response.data);
}

// [GET] /patients/:id/
async function getById(patient_id: string) {
  const response = await http.get(`/patients/${patient_id}/`);
  return Promise.resolve(response.data);
}

// [POST] /patients/
async function post(body: { gender: 0 | 1, name: string, age: number }) {
  const response = await http.post('/patients/', { body });
  return Promise.resolve(response);
}

export default { get, getById, post };
