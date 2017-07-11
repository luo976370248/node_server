var mysql = require("mysql");
var util = require('util')
var Respones = require("../apps/Respones.js");
var log = require('../utils/log.js');
var conn_pool = null;
function connect_to_center(host, port, db_name, uname, upwd) {
	conn_pool = mysql.createPool({
		host: host, // 数据库服务器的IP地址
		port: port, // my.cnf指定了端口，默认的mysql的端口是3306,
		database: db_name, // 要连接的数据库
		user: uname,
		password: upwd,
	});
}


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

function module_create_room(userid, data, callback)  {
    var sql = "insert into room_info(uuid, room_id, base_info,current_num, total_num,author,room_type)values(%s,%d,%s,%d,%d,%d,%d,%d)";

	var sql_cmd = util.format(sql, ukey);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic) {
		if (err) {
			callback(Respones.SYSTEM_ERR, null);
			return;
		}
		callback(Respones.OK, sql_ret);
	});
};

function module_delete_room(room_id) {

}

function module_get_roominfo_by_userid(uid) {

}

function module_get_roominfo_by_roomid(roomid) {
    
}

module.exports = {
	connect: connect_to_center,
};