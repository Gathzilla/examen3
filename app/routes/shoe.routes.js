module.exports = (app) => {
    const shoes = require('../controllers/shoe.controller');    
    
    app.get('/api/shoe/metadata',  shoes.metadata);
    
    app.get('/api/shoe',  shoes.findAll);
    
    app.get('/api/shoe/:id',  shoes.findOne);
    
    app.post('/api/shoe',  shoes.create);
    
    app.post('/api/register', shoes.create);
    
    app.put('/api/shoe',  shoes.update);

    app.delete('/api/shoe/:id', shoes.delete);
}