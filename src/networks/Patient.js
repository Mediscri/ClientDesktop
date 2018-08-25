// @flow
import { http } from './index';

export type PatientNew = {|
  +name: string,
  gender: 'male' | 'female',
  +age: number,
|};

export type Patient = {|
  +id: string,
  ...PatientNew,
|};

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
async function post(patient: PatientNew) {
  const response = await http.post('/patients/', JSON.stringify(patient));
  return Promise.resolve(response.data);
}

export default { get, getById, post };
