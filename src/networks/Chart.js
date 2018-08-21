// @flow
import { http } from './index';
import chartTest from './chart.test';

async function getByDate(created_today: boolean = true) {
  const response = await http.get('/charts/', { params: { created_today } });
  // return Promise.resolve(response.data);

  // *** TODO: REMOVE TEST CODE
  const resAlt = await chartTest.get();
  return Promise.resolve(resAlt);
}

export default { getByDate };
