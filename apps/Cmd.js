var Cmd = {
    // 全局命令号，当我们用户连接丢失的时候
    // 所有的服务都会受到网关转发过来的这个时间这个消息
    USER_DISCONNECT: 10000,

    Auth: {
        GUEST_LOGIN: 1, // 游客登录
    }
};

module.exports = Cmd;