var log = require("../../utils/log.js");
var Cmd = require("../Cmd.js");
var room_model = require("./room_model.js");
var Respones = require("../Respones.js");
var Stype = require("../Stype.js");
var Cmd = require("../Cmd.js");
var utils = require("../../utils/utils.js");

function create_room(session, uid, proto_type, body) {
    // 验证数据的合法性
    if(!body) {
		session.send_cmd(Stype.Auth, Cmd.Room.CREATE_ROOM, Respones.INVALID_PARAMS, utag, proto_type);
		return;
	}

   // body {uid, num}
    var ukey = body;
	room_model.create_room(uid, body, function(ret) {
		session.send_cmd(Stype.Room, Cmd.Room.CREATE_ROOM, ret, utag, proto_type);
	});
}

function delete_room(session, utag, proto_type, body) {
	 if(!body) {
		session.send_cmd(Stype.Auth, Cmd.Room.CREATE_ROOM, Respones.INVALID_PARAMS, utag, proto_type);
		return;
	}

   // body {uid, num}
    var ukey = body;
	room_model.delete_room(ukey, function(ret) {
		session.send_cmd(Stype.Room, Cmd.Room.CREATE_ROOM, ret, utag, proto_type);
	});
}

var service = {
	name: "room_service", // 服务名称
	is_transfer: false, // 是否为转发模块,



	// 收到客户端给我们发来的数据
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info(stype, ctype, body);
		switch(ctype) {
			case Cmd.Room.CREATE_ROOM:
                create_room(session, utag, proto_type, body);
				break;
			case Cmd.Room.DELETE_ROOM: 
				delete_room(session, utag, proto_type, body);
				break;
		}
	},

	// 收到我们连接的服务给我们发过来的数据;
	on_recv_server_return: function (session, stype, ctype, body, utag, proto_type, raw_cmd) {

	}, 

	// 收到客户端断开连接;
	on_player_disconnect: function(stype, session) {
	},
};

module.exports = service;