const shoeRoutes = require('../routes/shoe.routes');

const backend = {
    exposeRoutes: (app) => {            
        shoeRoutes(app);
    }
} 

module.exports = backend;