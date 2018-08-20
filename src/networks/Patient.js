// @flow
import { http } from './index';

async function getByDate(created_today: boolean = true) {
  const response = await http.get('/charts/', { params: { created_today } });
  console.log(response);
}

export default { getByDate };
