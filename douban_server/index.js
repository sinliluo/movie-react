const express = require('express');
const request = require('request');

const app = express();

app.use(express.static(__dirname+"/public"));

// 实现cors跨域
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})




// 请求电影列表
app.get('/getMovieListData',function (req,res,next) {
    const message=JSON.parse(req.query.message)
    // 用request模块实现数据请求
    console.log(11111);
    console.log(message);
    const url='https://api.douban.com/v2/movie/'+message.movieType+'?start='+message.start+'&count='+message.count;
    // const url='https://api.douban.com/v2/movie/in_theaters';
    console.log(url);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(2222);
            res.send(body)
        }
    })

})


// 请求电影详情页
app.get("/getMovieDetailData",(req,res,next)=>{
    const id = req.query.id;
    const url = 'https://api.douban.com/v2/movie/subject/'+id;
    request(url,(err,response,body)=>{
        if(!err && response.statusCode == 200){
            res.send(body);
        }
    })
})

// 请求搜索列表
app.get('/getSearchListData',function (req,res,next) {
    const message=JSON.parse(req.query.message)
    // 用request模块实现数据请求
    // console.log(message);
    const url='https://api.douban.com/v2/movie/search?start='+message.start+'&count='+message.count+'&q='+encodeURI(message.searchTxt);
    // const url='https://api.douban.com/v2/movie/in_theaters';
    // console.log(url);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(url);
            res.send(body)
        }
    })

})

app.listen('3008',()=>{
	console.log("正在监听3008");
})