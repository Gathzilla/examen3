const Dress = require('../models/dress.model');
const wrapper = require('../utils/wrapper');


let isValid = (dress) => {
    if (!dress.color) {
        return { isValid: false, propertyInvalid: "color" };
    } else if (!dress.brand) {
        return { isValid: false, propertyInvalid: "brand" };
    }else if (!dress.model) {
        return { isValid: false, propertyInvalid: "size" };
    }else if (!dress.price) {
        return { isValid: false, propertyInvalid: "price" };
    }else if (!dress.barcode) {
        return { isValid: false, propertyInvalid: "barcode" };
    }else if (!dress.code) {
        return { isValid: false, propertyInvalid: "code" };
    }else {
        return { isValid: true, propertyInvalid: undefined }
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "Dress metadata queried successfully", "error": false, "data": Dress.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/dress/metadata", response: response, httpCode: 200, res: res });
};


exports.create = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Dress content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/dress", response: response, httpCode: 400, res: res });
    } else {
        
        const newDress = new Dress({
            
            color: req.body.color,            
            brand: req.body.brand,            
            price: req.body.price,
            barcode: req.body.barcode,
            size: req.body.size,
            code: req.body.code
            
            
        });

        let validation = isValid(newDress);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Dress " + validation.propertyInvalid + " is required", "error": true, "data": newDress };
            return wrapper.sendResponse({ method: "POST /api/dress", response: response, httpCode: 400, res: res });
        } else {
            
            
            
            newDress.save()
                .then(data => {
                    let response = { "status": "ok", "message": "Dress saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/dress", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the Dress", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/dress", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    Dress.find()
        .then(dresss => {
            if (dresss && dresss.length > 0) {
                let response = { "status": "ok", "message": "Dresss queried successfully", "error": false, "data": dresss };
                return wrapper.sendResponse({ method: "GET /api/dress", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/dress", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving all dresss", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/dress", response: response, httpCode: 500, res: res });
        });
};


exports.findOne = (req, res) => {
    Dress.findById(req.params.id)
        .then(dress => {
            if (!dress) {
                let response = { "status": "error", "message": "Dress not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/dress/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Dress queried successfully", "error": false, "data": dress };
                return wrapper.sendResponse({ method: "GET /api/dress/" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Dress not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/dress/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving dress with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/dress", response: response, httpCode: 500, res: res });
            }
        });
};


exports.update = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Dress content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/dress", response: response, httpCode: 400, res: res });
    } else {
        
        const dressToUpdate = {
            name: req.body.name,
            gender: req.body.gender,
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,            
            barcode: req.body.barcode,
            size: req.body.size,
            code: req.body.code
        };

        let validation = isValid(dressToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Dress " + validation.propertyInvalid + " is required", "error": true, "data": dressToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/dress", response: response, httpCode: 400, res: res });
        } else {
            
            

            
            Dress.findByIdAndUpdate(req.body._id, dressToUpdate, { new: true, upsert: true })
                .then(dress => {
                    if (!dress) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the dress with id" + req.body._id, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/dress", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Dress updated successfully", "error": false, "data": dress };
                        return wrapper.sendResponse({ method: "PUT /api/dress", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Dress not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/dress", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the dress", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PUT /api/dress", response: response, httpCode: 500, res: res });
                    }
                });
        }
    }
};


exports.delete = (req, res) => {
    Dress.findByIdAndRemove(req.params.id)
        .then(dress => {
            if (!dress) {
                let response = { "status": "error", "message": "Dress not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/dress", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Dress deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/dress/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "Dress not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/dress", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete dress with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/dress", response: response, httpCode: 500, res: res });
            }
        });
};