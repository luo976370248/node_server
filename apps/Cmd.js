var Cmd = {
	// 全局的命令号，当我们的用户丢失链接的时候，
	// 所有的服务都会收到网关转发过来的这个时间这个消息
	USER_DISCONNECT: 10000, 

	Auth: {
		GUEST_LOGIN: 1, // 游客登陆
		RELOGIN: 2, // 账号在另外的地方登陆
		EDIT_PROFILE: 3,// 修改用户资源
	},

	Room: {
		CREATE_ROOM: 1, // 创建房间
		DELETE_ROOM: 2, // 创建房间
	},

	ZJH_GAME: {
		CONNENT: 1,// 连接
		ENTER_ROOM: 2// 进入房间
	}
	
};

module.exports = Cmd;