const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const data = require('./../public/ItemData.json');
const Calc = require('./../utils/functions.js')


//USE COOKIES TO STORE LAST USE DATA (like for a build).


// router.get('/:id',(req,res)=>{
//     //Articles, visits
//     let pageCount = [0,0];
//     if (req.cookies && req.cookies.pageCount)
//     {
//         pageCount[0] = parseInt(req.cookies.pageCount[0]);
//         pageCount[1] = parseInt(req.cookies.pageCount[1]);
//         //pageCount = parseInt(req.cookies.pageCount);
//     }
//     console.log("articles: "+pageCount[0]+"; visits: "+pageCount[1]);
//     //updating visit AND article count
//     if (pageCount[0]<3){
//         pageCount[0]++;
//         pageCount[1]++;
//         //updating cookie
//         res.cookie('pageCount', pageCount, {
//             maxAge : 1000*60*60*24*7
//         });
//         res.render('article',{
//             data:articles[parseInt(req.params.id)]
//         });
//     }
// });

router.post('/selectRarity',(req,res)=>{
    res.json({rarityName:req.body.rarityName})
});

router.post('/buildMe',(req,res)=>{
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
    res.json(info)
    // res.render('build', {
    //     data : data,
    //     hasInfo:hasInfo,
    //     info : info,
    // });

});

router.get('/build',(req,res)=>{
    var defaultInfo = {
        amount:1,
        name:data[0].name,
        rarity:"common"
    }
    res.render('build', {
        data : data,
        info : defaultInfo
    });
});





router.get('/item/:id',(req,res)=>{
    item=data[parseInt(req.params.id)-1];
    res.render('item', {
        item : item
    })
});

router.get('/',(req,res)=>{
    //Articles, visits

    // let pageCount = [0,0];
    // if (req.cookies && req.cookies.pageCount)
    // {
    //     pageCount[0] = parseInt(req.cookies.pageCount[0]);
    //     pageCount[1] = parseInt(req.cookies.pageCount[1]);
    //     //pageCount = parseInt(req.cookies.pageCount);
    // }
    // pageCount[1]++;
    // //updating cookie
    // res.cookie('pageCount',pageCount, {
    //     maxAge : 1000*60*60*24*7
    // });

    res.render('index',{
        data : data
    });
});

module.exports = router;
