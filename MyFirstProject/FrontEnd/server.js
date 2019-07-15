let connect = require('connect');
let serveStatic = require('serve-static');
let port = process.env.PORT || 8080;

connect().use(serveStatic(__dirname)).listen(port, function(){
    console.log('Server running on 8080...');
});