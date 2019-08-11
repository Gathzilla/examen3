let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

let port = 3001;



app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});




app.listen(port);
