/* eslint-disable */
const Package = require('../src/index.js');
const Options = { token: 'TOKEN_HERE', botID: 'Bot_ID', client: 'none', log: false };
const Client = new Package(Options);

/*
Edit the function as needed.
If you want to log the output, change the "log" value of Options to true
Use ``npm run test`` at the command line when you are ready to test the commands.
*/
Client.example();