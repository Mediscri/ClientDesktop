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

3.  set up [BackendRESTApi](https://github.com/Mediscri/BackendRESTApi) & get superuser TOKEN

```
~$ curl -X POST \
 http://localhost:8000/api-token-auth/ \
 -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
 -F username={{your_username}} \
 -F password={{your_password}}
```

4. change superuser TOKEN on `/src/networks/indes.js`

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
