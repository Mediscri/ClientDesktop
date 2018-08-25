# mediscri

client-side(doctor side) for mediscri

## Packages

- react
- redux
- redux-logger
- redux-flux
- flow
- react-router
- styled-components
- cross-env
- axios
- react-contextmenu
- immer

## Run on Local Env

1.  로컬 환경에 백엔드 세팅 [BackendRESTApi](https://github.com/Mediscri/BackendRESTApi)

2.  `~$ git clone https://github.com/Mediscri/ClientDoctor.git`

3.  `~$ cd ClientDoctor`

4.  Superuser Token 을 가져오는 스크립스 실행

```
~/ClientDoctor$ curl -X POST http://localhost:8000/api-token-auth/ -F username=admin -F password=admin
```

4. `/src/networks/index.js`에서 TOKEN 키 변경하기

```javascript
function setAxios() {

  ...
  switch (process.env.NODE_ENV) {
      case 'development':
      	...
      	// HERE
      	instance.defaluts.headers.common['Authorization'] = 'TOKEN {불러온 토큰 키 입력}';
      	...
  }
  ...
}
```

5.  `~/ClientDoctor$ npm i`

6.  `~/ClientDoctor$ npm start`
