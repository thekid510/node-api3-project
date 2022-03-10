// require your server and launch it
const server = require('./api/server');

const PORT = 7766;

server.listen(PORT,()=> {
    console.log(`Up & Running on`, PORT)
})