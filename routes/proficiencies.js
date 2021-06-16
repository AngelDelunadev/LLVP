var express = require('express');
var router = express.Router();
const models = require('../models')
const session = require('express-session');

router.get('/:languageId', async(req,res) => {
    const proficiencies = await models.Proficiencies.findAll({
        where: {LanguageId: req.params.languageId}
    })

   return res.status(201).json({
        proficiencies
    })

})

router.post('/create', async (req,res) => {
    const newProf = await models.Proficiencies.create({
        UserId: req.body.UserId,
        LanguageId: req.body.LanguageId,
        proficiencyLvl: req.body.profLvl
    })

    return res.status(201).json(newProf)
})

module.exports = router