module.exports = (app) => {
    const dresses = require('../controllers/dress.controller');    
    
    app.get('/api/dress/metadata',  dresses.metadata);
    
    app.get('/api/dress',  dresses.findAll);
    
    app.get('/api/dress/:id',  dresses.findOne);
    
    app.post('/api/dress',  dresses.create);    
    
    app.put('/api/dress',  dresses.update);

    app.delete('/api/dress/:id', dresses.delete);
}