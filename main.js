let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

let port = 3001;




/* not quite sure yet lol
let sendResponse = (options) => {
    logger({ method: options.method, message: JSON.stringify(options.response), isError: options.response.error });
    options.res.status(options.httpCode);
    options.res.json(options.response);
}*/


app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});




app.listen(port);
