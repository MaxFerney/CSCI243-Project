const express = require('express');
const router = express.Router();
const articles = require('./../public/contents/ArticleData.json');


router.get('/subscribe',(req,res)=>{
    //Articles, visits
    let pageCount = [0,0];
    if (req.cookies && req.cookies.pageCount)
    {
        pageCount[0] = parseInt(req.cookies.pageCount[0]);
        pageCount[1] = parseInt(req.cookies.pageCount[1]);
        //pageCount = parseInt(req.cookies.pageCount);
    }
    res.render('subscribe',{
        timesVisited:pageCount[1]
    });
});

router.get('/:id',(req,res)=>{
    //Articles, visits
    let pageCount = [0,0];
    if (req.cookies && req.cookies.pageCount)
    {
        pageCount[0] = parseInt(req.cookies.pageCount[0]);
        pageCount[1] = parseInt(req.cookies.pageCount[1]);
        //pageCount = parseInt(req.cookies.pageCount);
    }
    console.log("articles: "+pageCount[0]+"; visits: "+pageCount[1]);
    //updating visit AND article count
    if (pageCount[0]<3){
        pageCount[0]++;
        pageCount[1]++;
        //updating cookie
        res.cookie('pageCount', pageCount, {
            maxAge : 1000*60*60*24*7
        });
        res.render('article',{
            data:articles[parseInt(req.params.id)]
        });
    }
    else {
        res.redirect('/subscribe');
    }
});



router.get('/',(req,res)=>{
    //Articles, visits
    let pageCount = [0,0];
    if (req.cookies && req.cookies.pageCount)
    {
        pageCount[0] = parseInt(req.cookies.pageCount[0]);
        pageCount[1] = parseInt(req.cookies.pageCount[1]);
        //pageCount = parseInt(req.cookies.pageCount);
    }
    pageCount[1]++;
    //updating cookie
    res.cookie('pageCount',pageCount, {
        maxAge : 1000*60*60*24*7
    });
    res.render('index',{
        dataList:articles,
        pageCount:pageCount[0]
    });
});

module.exports = router;
