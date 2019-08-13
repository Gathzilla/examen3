const Shoe = require('../models/shoe.model');
const wrapper = require('../utils/wrapper');


let isValid = (shoe) => {
    if (!shoe.name) {
        return { isValid: false, propertyInvalid: "name" };
    } else if (!shoe.gender) {
        return { isValid: false, propertyInvalid: "gender" };
    } else if (!shoe.brand) {
        return { isValid: false, propertyInvalid: "brand" };
    }else if (!shoe.model) {
        return { isValid: false, propertyInvalid: "model" };
    }else if (!shoe.price) {
        return { isValid: false, propertyInvalid: "price" };
    }else if (!shoe.barcode) {
        return { isValid: false, propertyInvalid: "barcode" };
    }else if (!shoe.code) {
        return { isValid: false, propertyInvalid: "code" };
    }else if (!shoe.size) {
        return { isValid: false, propertyInvalid: "size" };
    }else {
        return { isValid: true, propertyInvalid: undefined }
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "Shoe metadata queried successfully", "error": false, "data": Shoe.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/shoe/metadata", response: response, httpCode: 200, res: res });
};


exports.create = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Shoe content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/shoe", response: response, httpCode: 400, res: res });
    } else {
        
        const newShoe = new Shoe({
            
            name: req.body.name,
            gender: req.body.gender,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            barcode: req.body.barcode,
            size: req.body.size,
            code: req.body.code
            
            
        });

        let validation = isValid(newShoe);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Shoe " + validation.propertyInvalid + " is required", "error": true, "data": newShoe };
            return wrapper.sendResponse({ method: "POST /api/shoe", response: response, httpCode: 400, res: res });
        } else {
            
            
            
            newShoe.save()
                .then(data => {
                    let response = { "status": "ok", "message": "Shoe saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/shoe", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the Shoe", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/shoe", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    Shoe.find()
        .then(shoes => {
            if (shoes && shoes.length > 0) {
                let response = { "status": "ok", "message": "Shoes queried successfully", "error": false, "data": shoes };
                return wrapper.sendResponse({ method: "GET /api/shoe", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/shoe", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving all shoes", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/shoe", response: response, httpCode: 500, res: res });
        });
};


exports.findOne = (req, res) => {
    Shoe.findById(req.params.id)
        .then(shoe => {
            if (!shoe) {
                let response = { "status": "error", "message": "Shoe not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/shoe/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Shoe queried successfully", "error": false, "data": shoe };
                return wrapper.sendResponse({ method: "GET /api/shoe/" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Shoe not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/shoe/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving shoe with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/shoe", response: response, httpCode: 500, res: res });
            }
        });
};


exports.update = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Shoe content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/shoe", response: response, httpCode: 400, res: res });
    } else {
        
        const shoeToUpdate = {
            name: req.body.name,
            gender: req.body.gender,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,            
            barcode: req.body.barcode,
            size: req.body.size,
            code: req.body.code
        };

        let validation = isValid(shoeToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Shoe " + validation.propertyInvalid + " is required", "error": true, "data": shoeToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/shoe", response: response, httpCode: 400, res: res });
        } else {
            
            

            
            Shoe.findByIdAndUpdate(req.body._id, shoeToUpdate, { new: true, upsert: true })
                .then(shoe => {
                    if (!shoe) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the shoe with id" + req.body._id, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/shoe", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Shoe updated successfully", "error": false, "data": shoe };
                        return wrapper.sendResponse({ method: "PUT /api/shoe", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Shoe not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/shoe", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the shoe", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PUT /api/shoe", response: response, httpCode: 500, res: res });
                    }
                });
        }
    }
};


exports.delete = (req, res) => {
    Shoe.findByIdAndRemove(req.params.id)
        .then(shoe => {
            if (!shoe) {
                let response = { "status": "error", "message": "Shoe not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/shoe", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Shoe deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/shoe/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "Shoe not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/shoe", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete shoe with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/shoe", response: response, httpCode: 500, res: res });
            }
        });
};