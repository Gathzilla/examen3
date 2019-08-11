
const mongoose = require('mongoose');
const dbConfig = require('./database.config');

const moongoseConfig = {
    configure: () => {
        mongoose.Promise = global.Promise;
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        

        mongoose.connect(dbConfig.url, {
            useNewUrlParser: true
        });
    }
};

module.exports = moongoseConfig;