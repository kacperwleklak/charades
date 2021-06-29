package websocket.operators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import websocket.room.RoomService;

import java.io.IOException;

@Component
public class JoinRoomOperator implements WebsocketOperator {

    @Autowired
    private RoomService roomService;

    public String getOperation() {
        return "JOIN_ROOM";
    }

    @Override
    public void operate(WebSocketSession session, TextMessage message) throws IOException {
        if (!isMyOperation(message)) {
            return;
        }
        var values = getMessageValues(message);
        String room = values.get("room").toString();
        roomService.joinRoom(session.getId(), room);
        session.sendMessage(prepareResponse(room));
    }
}
