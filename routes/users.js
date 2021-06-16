var express = require('express');
var router = express.Router();
const models = require('../models')
const session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all',async (req,res) => {
  users = await models.User.findAll()

  res.status(201).json(users)
})

router.post('/register' , async (req,res) => {
  if(!req.body.email || !req.body.firstName || !req.body.lastName){
    return res.status(401).json({
      error: 'Please include all fields'
    })
  }

  const user = await models.User.findOne({
    where:{
      email: req.body.email
    }
  })

  if(user){
    return res.status(400).json({
      error: 'Email already in use'
    })
  }

  const newUser = await models.User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  return res.status(201).json(newUser)
})


module.exports = router;
