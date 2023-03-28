//Main API file. creates routes dynamically for every endpoint defined qpieEndpointConfig.json
const express = require('express');
const app = express();
const config = require('./qpieEndpointsConfig.json');
const port=process.env.API_PORT||3000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));

for (const endpoint of config.endpoints) {
  const { path, method, handler } = endpoint;
  const [moduleName, methodName] = handler.split('.');
  const handlerModule = require(`./${moduleName}`);
  const handlerMethod = handlerModule[methodName].bind(handlerModule);
  app[method](path, handlerMethod);
}

app.listen(port,()=>{console.log(`listening at http://localhost:${port}/`)});
