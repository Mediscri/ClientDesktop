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

## Run Local-env

1.  `~$ git clone https://github.com/Mediscri/ClientDoctor.git`

2.  `~$ cd ClientDoctor`

3.  set up [BackendRESTApi](https://github.com/Mediscri/BackendRESTApi) & run script below to get superuser TOKEN

```
~$ curl -X POST http://localhost:8000/api-token-auth/ -F username=admin -F password=admin
```

4. change TOKEN on `/src/networks/index.js`

```javascript
function setAxios() {

  ...
  switch (process.env.NODE_ENV) {
      case 'development':
      	...
      	// HERE
      	instance.defaluts.headers.common['Authorization'] = 'TOKEN {{YOUR_TOKEN}}';
      	...
  }
  ...
}
```

5.  `~/ClientDoctor$ npm i`

6.  `~/ClientDoctor$ npm start`
