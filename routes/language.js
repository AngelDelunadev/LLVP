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
        avgProficiency: 0
    })

    return res.status(201).json(newLanguage)
})

router.patch("/update/prof/:languageId", async (req,res) => {
    const proficiencies = await models.Proficiencies.findAll({
        where: {LanguageId: req.params.languageId}
    })
    let avg = 0
    proficiencies.forEach(e => {
        avg += e.proficiencyLvl
    });
    avg = Math.round(avg/proficiencies.length) 

    await models.Languages.update({avgProficiency: avg},{
         where:{
             id: req.params.languageId
         }
     })
    
     return res.status(201).json({
        message: "successfully updated"
    })

})

router.delete('/delete' ,async (req,res) => {
    await models.Languages.destroy({
        where: {
            id: req.body.id
        }
    })
    
    return res.status(201).json({
        message: "successfully deleted"
    })
}) 

module.exports = router