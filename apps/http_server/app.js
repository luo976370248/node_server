const db = require('../../database/db.js');
const game_config = require('../game_config.js');
const config = game_config.center_database;

// 初始化数据库连接池
db.init(config.host, config.port, config.db_name, config.uname, config.upwd);

// 登录验证服务器
const http_auth = require('./http_auth.js')
http_auth.start();