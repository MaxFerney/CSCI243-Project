const express = require('express');
const router = express.Router();
const data = require('./../public/ItemData.json');


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
router.get('/build',(req,res)=>{
    res.render('build', {
        data : data
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
