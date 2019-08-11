const wrapper = {
    sendResponse: (options) => {        
        options.res.status(options.httpCode);
        options.res.json(options.response);
    }
}

module.exports = wrapper;