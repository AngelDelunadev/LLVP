var express = require('express');
var router = express.Router();
const models = require('../models')
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat/:user/:user2' ,async (req,res) => {
    const messages = await models.Message.findAll({
        where:{
            sender: [req.params.user,req.params.user2],
            receiver: [req.params.user,req.params.user2]
        }
    })

    return res.status(201).json(messages)
})

router.post('/create' , async (req,res) => {

    const proficiencies = await models.Proficiencies.findAll({
        where: {
            LanguageId: req.body.LanguageId
        }
    })
    let senderProf=0
    let receiverProf=0

    
    proficiencies.forEach(e => {
        if(e.UserId === req.body.sender)
        {
            senderProf = e.proficiencyLvl
        }
        else if (e.UserId === req.body.receiver)
        {
            receiverProf = e.proficiencyLvl
        }
    });
    
    if(Math.abs(senderProf-receiverProf) > 2 ){
        return res.status(403).json({
            error: "Proficiency Level not in range "
        })
    }
    else{
        const newMessage = await models.Message.create({
            sender: req.body.sender,
            receiver: req.body.receiver,
            LanguageId: req.body.LanguageId,
            text: req.body.text
        })
        return res.status(201).json(newMessage)
    }

})



module.exports = router;