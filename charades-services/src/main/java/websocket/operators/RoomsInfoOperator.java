package websocket.operators;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import websocket.room.RoomInfo;
import websocket.room.RoomService;

import java.io.IOException;
import java.util.List;

@Component
public class RoomsInfoOperator implements WebsocketOperator {

    Logger logger = LoggerFactory.getLogger(RoomsInfoOperator.class);

    @Autowired
    private RoomService roomService;

    public String getOperation() {
        return "ROOMS_INFO";
    }

    @Override
    public void operate(WebSocketSession session, TextMessage message) throws IOException {
        if (!isMyOperation(message)) {
            return;
        }
        List<RoomInfo> rooms = roomService.getRoomsInfo();
        session.sendMessage(prepareResponse(rooms));
    }
}
