package websocket.operators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import websocket.room.RoomService;

import java.io.IOException;

@Component
public class DrawOnCanvasOperator implements WebsocketOperator {

    @Autowired
    private RoomService roomService;

    public String getOperation() {
        return "DRAW_ON_CANVAS";
    }

    @Override
    public void operate(WebSocketSession session, TextMessage message) throws IOException {
        if (!isMyOperation(message)) {
            return;
        }
        var values = getMessageValues(message);
        String drawing = values.get("drawing").toString();
        roomService.putDrawing(session.getId(), drawing);
    }
}
