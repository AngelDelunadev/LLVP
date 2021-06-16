var express = require('express');
var router = express.Router();
const models = require('../models')
const session = require('express-session');

router.get('/', async(req,res) => {
    const languages = await models.Languages.findAll()

   return res.status(201).json({
        language: languages
    })

})

router.post('/create', async (req,res) => {
    const newLanguage = await models.Languages.create({
        name: req.body.name,
        avgProficiency: req.body.avgProficiency
    })

    return res.status(201).json(newLanguage)
})

module.exports = router