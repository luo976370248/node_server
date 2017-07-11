var log = require("../../utils/log.js");
var Cmd = require("../Cmd.js");
var auth_model = require("./auth_model.js");
var Respones = require("../Respones.js");
var Stype = require("../Stype.js");
var Cmd = require("../Cmd.js");
var utils = require("../../utils/utils.js");

function guest_login(session, utag, proto_type, body) {
	// 验证数据合法性
	if(!body) {
		session.send_cmd(Stype.Auth, Cmd.Auth.GUEST_LOGIN, Respones.INVALID_PARAMS, utag, proto_type);
		return;
	}
	// end 

	var ukey = body;
	auth_model.guest_login(ukey, function(ret) {
		session.send_cmd(Stype.Auth, Cmd.Auth.GUEST_LOGIN, ret, utag, proto_type);
	});
}

function edit_profile(session, uid, proto_type, body) {
	// 检查数据的合性
	if (!body || !body.unick || !body.usex) {
		// 数据不合法
		session.send_cmd(Stype.Auth, Cmd.Auth.GUEST_LOGIN, Respones.INVALID_PARAMS, ui, proto_type);
		return;
	}

	auth_model.edit_profile(uid, unick, usex, function(body) {
		session.send_cmd(Stype.Auth, Cmd.Auth.EDIT_PROFILE, body, uid, proto_type);
	});
}

var service = {
	name: "auth_service", // 服务名称
	is_transfer: false, // 是否为转发模块,

	// 收到客户端给我们发来的数据
	on_recv_player_cmd: function(session, stype, ctype, body, utag, proto_type, raw_cmd) {
		log.info(stype, ctype, body);
		switch(ctype) {
			case Cmd.Auth.GUEST_LOGIN:
				guest_login(session, utag, proto_type, body);
				break;
			case Cmd.Auth.EDIT_PROFILE: 
				edit_profile(session,utag, proto_type, body)
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
