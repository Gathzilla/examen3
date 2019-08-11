const wrapper = require('../utils/wrapper');

const checkHealth = (app, port) => {
    app.get('/api', (req, res) => {
        const response = { "status": "ok", "message": "Examen api running on " + port , "error": false, "data": undefined };
        return wrapper.sendResponse({ method: "GET /api", response: response, httpCode: 200, res: res });
    });
}

module.exports = checkHealth;