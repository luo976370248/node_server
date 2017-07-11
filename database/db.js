var mysql = require("mysql");
var util = require('util')
var Respones = require("../apps/Respones.js");
var log = require('../utils/log.js');
var conn_pool = null;


function mysql_exec(sql, callback) {
	conn_pool.getConnection(function(err, conn) {
		if (err) { // 如果有错误信息
			if(callback) {
				callback(err, null, null);
			}
			return;
		}
		conn.query(sql, function(sql_err, sql_result, fields_desic) {
			conn.release(); // 忘记加了
			if (sql_err) {
				if (callback) {
					callback(sql_err, null, null);
				}
				return;
			}

			if (callback) {
				callback(null, sql_result, fields_desic);
			}
		});
		// end 
	});
}

// 初始化连接
exports.init = function(host, port, db_name, uname, upwd) {
	conn_pool = mysql.createPool({
		host: host, // 数据库服务器的IP地址
		port: port, // my.cnf指定了端口，默认的mysql的端口是3306,
		database: db_name, // 要连接的数据库
		user: uname,
		password: upwd,
	});
}

// 通过ukey 查询一个游客账号
exports.get_guest_uinfo_by_ukey = function(ukey, callback)  {
	var sql = "select uid, unick, usex, uface, uvip, status, is_guest, ugold, uroomCard, udiamond  from uinfo where guest_key = \"%s\" limit 1";
	var sql_cmd = util.format(sql, ukey);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic) {
		if (err) {
			callback(Respones.SYSTEM_ERR, null);
			return;
		}
		callback(Respones.OK, sql_ret);
	});
}

// 插入一个游客账号
exports.insert_guest_user = function(unick, uface, usex, ukey, callback) {
	var sql = "insert into uinfo(`guest_key`, `unick`, `uface`, `usex`, `is_guest`)values(\"%s\", \"%s\",\"%s\", %d, 1)";
	var sql_cmd = util.format(sql, ukey, unick, uface, usex);
	log.info(sql_cmd);
	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic) {
		if (err) {
			log.info(err);
			callback(Respones.SYSTEM_ERR);
			return;
		}
		callback(Respones.OK);
	});
}

// 修改账号
exports.edit_profile = function(uid, unick, usex, callback) {
	var sql = "update uinfo set unick = \"%s\", usex = %d where uid = %d";
	var sql_cmd = util.format(sql, unick, usex, uid);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic) {
		if (err) {
			callback(Respones.SYSTEM_ERR);
			return;
		}
		callback(Respones.OK);
	});
}
