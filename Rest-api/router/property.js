const router = require('express').Router();
const { auth } = require('../utils');
const propertyController = require('../controllers/propertyController');

// Public
router.get('/user', auth(), propertyController.getUserProperties); // Moved up
router.get('/', propertyController.getProperties);
router.get('/:propertyId', propertyController.getProperty);

// Protected
router.post('/', auth(), propertyController.createProperty);
router.put('/:propertyId', auth(), propertyController.editProperty);
router.delete('/:propertyId', auth(), propertyController.deleteProperty);

module.exports = router;