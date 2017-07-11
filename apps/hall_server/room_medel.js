var Respones = require("../Respones.js");
var mysql_room = require("../../database/mysql_room.js");
var utils = require("../../utils/utils.js");
var log = require("../../utils/log.js");

function crete_room(uid, body,ret_func) {
	// 验证玩家是否在房间里
	mysql_room.isExistRoom(uid, function(ret) {
		if (ret === true) {
			// 存在这个房间，创建房间失败
		} else {
			// 不存在这个房间号，创建房间
			mysql_room.crete_room(uid, body, function(ret_fun) {

			});
		}
	});
}


module.exports = {
	crete_room: crete_room,
	delete_room: delete_room,
};
