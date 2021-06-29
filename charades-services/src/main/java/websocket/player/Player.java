package websocket.player;

import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

@Data
public class Player {

    private String sessionId;
    private String name;
    private String room;
    private WebSocketSession session;
    private boolean drawing = false;
}
