const express = require('express');
const router = express.Router();
const data = require('./../public/ItemData.json');
const Calc = require('./../utils/functions.js')

//AJAX UPDATE BUILD
router.post('/buildMe',(req,res)=>{
    //Update session info
    if (req.session.buildData){
        req.session.buildData = {
            amount:parseInt(req.body.amount),
            name:req.body.itemName
        };
    }
    else {
        req.session.buildData = {
            amount:1,
            name:data[0].name
        };
    }

    //Recieve Data
    var hasInfo=true;
    numItems = parseInt(req.body.amount);
    for(var i=0;i<data.length;i++){
        if(data[i].name == req.body.itemName)
        {
            var currentItem=data[i];
            break;
        }
    }

    //Process and Calculate Data
    var value1=null;
    var value2=null;
    if (currentItem.stackType == "additive"){
        var value1=Calc.additiveStack(currentItem.stackingVar1,currentItem.stackingValue1,numItems);
        if(currentItem.stackingVar2!=null){
            var value2=Calc.additiveStack(currentItem.stackingVar2,currentItem.stackingValue2,numItems);
        }
    }
    else {
        console.log("WARNING: Could not perform calculation!")
    }

    //Turn computation into a formatted string
    var returnString = "Could not Compute";
    var suffixes = Calc.itemSuffix(currentItem);
    if(suffixes[0]=="%"){
        value1*=100;
    }
    returnString = value1.toFixed(2).toString() + suffixes[0] + " "+currentItem.stackingName1;
    if(currentItem.stackingVar2!=null){
        if(suffixes[1]=="%"){
            value2*=100;
        }
        returnString+="<br>"+value2.toFixed(2).toString() + suffixes[1] + " "+currentItem.stackingName2;
    }

    //Gather computed data to send back
    var info = {
        amount:parseInt(req.body.amount),
        name:req.body.itemName,
        calcInfo:returnString
    };

    //Sends data to the site
    res.json(info);

});

//RENDER BUILD PAGE
router.get('/build',(req,res)=>{
    
    //gather session info
    var info;
    if(req.session.buildData){
        info = req.session.buildData;
    }
    else{
        req.session.buildData = {
            name:data[0].name,
            amount:1
        };
        info = req.session.buildData;
    }

    //render file
    res.render('build', {
        data : data,
        info : info
    });
});

//RENDER ITEM DESCRIPTION PAGE
router.get('/item/:id',(req,res)=>{
    item=data[parseInt(req.params.id)-1];
    res.render('item', {
        item : item
    })
});

//RENDER INDEX PAGE
router.get('/',(req,res)=>{
    if(!req.session.buildData){
        req.session.buildData = {
            name:data[0].name,
            amount:1
        };
    }
    //req.session.buildData
    res.render('index',{
        data : data
    });
});

module.exports = router;
