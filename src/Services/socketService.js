
class SocketService{

    myWs

    constructor() {
        this.myWs = new WebSocket('ws://127.0.0.1:8100');
        this.myWs.onopen = function () {
            console.log('подключился');
        };

    }

}

export default new SocketService()