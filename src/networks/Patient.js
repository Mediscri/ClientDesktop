// @flow
import { http } from './index';

async function get() {
  const response = await http.get('/patients/');
  return Promise.resolve(response.data);
}

export default { get };
