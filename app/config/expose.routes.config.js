const shoeRoutes = require('../routes/shoe.routes');
const dressRoutes = require('../routes/dress.routes');

const backend = {
    exposeRoutes: (app) => {            
        shoeRoutes(app);
        dressRoutes(app);
    }
} 

module.exports = backend;