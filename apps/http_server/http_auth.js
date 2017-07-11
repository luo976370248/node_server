const express = require('express');
const user_mudle = require('./user_mudle.js');
const Respones = require("../../apps/Respones.js");
const shop = require('../../config/shop.js');

const app = express();
var hallAddr = "";

function send(res, ret) {
    var str = JSON.stringify(ret);
    res.send(str);
} 

var config = null;

exports.start = function() {
   // config = cfg;
    // hallAddr = config.HALL_IP + ":" + config.HALL_PORT;
    app.listen(5000);
    console.log("account server is listening on " + 5000);
}

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 游客登录
app.get('/guest_login', function(req, res) {
    var ukey = req.query.ukey;
    if (!ukey) {
        // 参数无效
        res.send()
        return;
    }

    // 查询数据库是否有一个这样的账号
    user_mudle.guest_login(ukey, function(state, data){
        if (state != Respones.OK) {
            var ret = {};
            ret.state = state;
            res.send(state);
        } else {
             res.send(data);
        }
    });
});

// 大厅活动公告
app.get('/hall_notity', function(req, res) {
    var notify = [
        '<color=#cc0033>[玩家: ] 转身与爱</c><color=#0fffff>获得10张房卡</color>'
    ];
    res.send(notify);
});

app.get('/hall_shop', function(req, res) {
    var type = req.query.type;
    if (!type) {
        return;
    }
    res.send(shop[type]);
});

