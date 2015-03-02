var express = require('express');
var _ = require('lodash');
var router = express.Router();
var m1 = { _id:"1", name:"name 1", status:"disable", type:"normal", normal_value:1, wierd_value:1};
var m2 = { _id:"2", name:"name 2", status:"production", type:"wierd", normal_value:2, wierd_value:2};
var m3 = { _id:"3", name:"name 3", status:"production", type:"wierd", normal_value:3, wierd_value:3};
var models = [m1,m2,m3];

var idToObject = function(id){
  for (i in models){
    if (models[i]._id === id) return models[i];
  }
  return null;
};
var modelsIdCounter = 3;

router.get('/api/models', function(req, res){
  res.send(models); 
});

router.put('/api/models/:id', function(req, res){
  var m = idToObject(req.params.id);
  m.name = req.body.name;
  m.status = req.body.status;
  m.type = req.body.type;
  res.send(m); 
});

router.post('/api/models', function(req, res){
  var model = req.body;
  var id = ++modelsIdCounter;
  model._id = "" + id;
  model.name = "name " + id; 
  models.push(model);
  res.send(model);
});

router.delete('/api/models/:id', function(req, res){
  var m = idToObject(req.params.id);
  models = _.remove(models, m);
  res.send(m); 
});
router.get('/api/models/:id', function(req, res){
  res.send(idToObject(req.params.id)); 
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
