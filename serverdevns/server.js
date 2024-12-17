const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express();
const http = require('http').Server(app);
const https = require('https');
const path = require('path');
var cors = require('cors');
const fs = require('fs');

const errorLogger = require('./src/log')

const dbUtililty = require('./src/utility');
const userRoutes = require('./src/routes/users');

const activeClients = new Map();
const dashboardSocketIds = [];

const port = process.env.NODE_SERVER_PORT;

app.use(express.json());

//app.use('/env/server', express.static(__dirname + '/env/server', { 'extensions': ['js'] }));
app.use(cors());
app.get('/', function (req, res) {
    console.log('Server is running');
    //res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
    const clientSecretHeader = req.header('bearer');
   // if (clientSecretHeader !== config.CLIENT_SECRET) {
        // const error = new Error(JSON.stringify({ success: false, message: 'Invalid Client Code ', eventTriggered: 'Server connection condition ', data: { clientCode: clientSecretHeader || '' } }));
        // errorLogger.error({ message: error });
        // return res.status(403).json({ success: false, message: '無効なクライアント' });
    //}
    next();
});

app.use('/api/users', userRoutes);








http.listen(port, function () {
    console.log(`Server ready on http://localhost:${port} port`);
});
