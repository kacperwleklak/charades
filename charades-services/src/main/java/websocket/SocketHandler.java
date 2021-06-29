package websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import websocket.operators.WebsocketOperator;
import websocket.player.Player;
import websocket.player.PlayerService;
import websocket.room.RoomService;

import java.util.List;

@Component
public class SocketHandler extends TextWebSocketHandler {

    @Autowired
    private List<? extends WebsocketOperator> operators;

    @Autowired
    private PlayerService playerService;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        operators.forEach(
                websocketOperator -> {
                    try {
                        websocketOperator.operate(session, message);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
        );
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Player player = new Player();
        player.setSessionId(session.getId());
        player.setRoom(RoomService.HOME);
        player.setSession(session);
        playerService.addPlayer(player);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        playerService.removePlayer(session.getId());
        super.afterConnectionClosed(session, status);
    }
}
