const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/TaskList'));

ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/TaskList/index.html'));
});
ngApp.listen(process.env.PORT || 5000);

