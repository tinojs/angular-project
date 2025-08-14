const { propertyModel, userModel } = require('../models');
function getProperties(req, res, next) {
  propertyModel.find()
    .populate('creator', '-password')
    .then(properties => {
      console.log('Properties fetched:', properties.length);
      res.json(properties);
    })
    .catch(error => {
      console.error('Error fetching properties:', error);  // ✅ log the real error
      res.status(500).json({ message: 'Error fetching properties', error }); // Send it to frontend
    });
}

function getProperty(req, res, next) {
  propertyModel.findById(req.params.propertyId)
    .populate('creator', '-password')
    .then(property => res.json(property))
    .catch(next);
}

function createProperty(req, res, next) {
  const { title, description, imageUrl, price, location, rooms, area } = req.body;
  const { _id: creator } = req.user;

  propertyModel.create({ title, description, imageUrl, price, location, rooms, area, creator })
    .then(property => property.populate('creator', '-password'))
    .then(populated => res.json(populated))
    .catch(next);
}

function editProperty(req, res, next) {
  const { propertyId } = req.params;
  const { title, description, imageUrl, price, location, rooms, area } = req.body;
  const { _id: userId } = req.user;

  propertyModel.findOneAndUpdate(
    { _id: propertyId, creator: userId },
    { title, description, imageUrl, price, location, rooms, area },
    { new: true }
  )
    .populate('creator', '-password')
    .then(updated => {
      if (updated) res.json(updated);
      else res.status(401).json({ message: 'Unauthorized edit attempt' });
    })
    .catch(next);
}

function deleteProperty(req, res, next) {
  const { propertyId } = req.params;
  const { _id: userId } = req.user;

  propertyModel.findOneAndDelete({ _id: propertyId, creator: userId })
    .then(deleted => {
      if (deleted) res.json(deleted);
      else res.status(401).json({ message: 'Unauthorized delete attempt' });
    })
    .catch(next);
}

function getUserProperties(req, res, next) {
  const { _id: userId } = req.user;

  propertyModel.find({ creator: userId })
    .populate('creator', '-password')
    .then(properties => res.json(properties))
    .catch(next);
}


module.exports = {
  getProperties,
  getProperty,
  createProperty,
  editProperty,
  deleteProperty,
  getUserProperties,
};
