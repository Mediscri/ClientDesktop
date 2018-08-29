import { http } from './index';

const key = 'authroization/TOKEN';

export async function checkToken() {
  if (localStorage.hasOwnProperty(key)) {
    const data = await localStorage.getItem(key);
    try {
      const { token } = JSON.parse(data);
      console.log('SET TOKEN TO HEADERS');
      http.defaults.headers.common['Authorization'] = `TOKEN ${token}`;
      return Promise.resolve(token);
    } catch (e) {
      console.log('LOCAL STORAGE IS EMPTY');
      return Promise.reject();
    }
  }
  return Promise.reject();
}

type Body = { username: string, password: string };

export async function setToken(body: Body) {
  console.log('GET TOEKN FROM SERVER');
  let url = '';
  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8000/api-token-auth/';
  } else {
    url =
      'http://ec2-13-209-17-145.ap-northeast-2.compute.amazonaws.com:8000/api-token-auth/';
  }

  const res = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  // *** set token to axios instance
  const { token } = await res.json();

  if (token !== null) {
    http.defaults.headers.common['Authorization'] = `TOKEN ${token}`;
    await localStorage.setItem(key, JSON.stringify({ token }));
    return Promise.resolve(token);
  }

  return Promise.reject();
}
