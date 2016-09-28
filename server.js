var StaticServer = require('static-server');

var server = new StaticServer({
  rootPath: './public/',
  port: 1337
});

server.start(function(){
  console.log('server started on port ' + server.port);
});
