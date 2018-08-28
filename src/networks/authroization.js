import { http } from './index';

const key = 'authroization/TOKEN';

export async function checkToken() {
  if (localStorage.hasOwnProperty(key)) {
    let data = await localStorage.getItem(key);
    try {
      const { token } = JSON.parse(data);
      http.defaults.headers.common['Authorization'] = `TOKEN ${token}`;
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  }
  return Promise.reject();
}

export async function setToken(body: { username: string, password: string }) {
  let url = '';
  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8000/api-token-auth/';
  } else {
    url =
      'http://ec2-54-180-32-15.ap-northeast-2.compute.amazonaws.com:8000/api-token-auth/';
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
    return Promise.resolve();
  }

  return Promise.reject();
}
