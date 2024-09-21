// import { createWsServer } from "tinybase/synchronizers/synchronizer-ws-server/with-schemas";
import { defineWebSocket, eventHandler } from "vinxi/http";

// const server = createWsServer(new ws.WebSocketServer({port: 8043}));

export default eventHandler({
	handler: () => {},
	websocket: defineWebSocket({
		async open(peer) {
			// peer.
			console.log("Open", peer);
		},
		async message(peer, message) {
			console.log("Message", peer, message);
			peer.send("Hi");
		},
		async close(peer, details) {
			console.log("CLOSE", peer, details);
		},
	}),
});
