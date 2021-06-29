package websocket.operators;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import websocket.player.PlayerService;

import java.util.Map;

@Component
public class EstablishingOperator implements WebsocketOperator {

    Logger logger = LoggerFactory.getLogger(EstablishingOperator.class);

    @Autowired
    private PlayerService playerService;

    public String getOperation() {
        return "ESTABLISH";
    }

    @Override
    public void operate(WebSocketSession session, TextMessage message) {
        if (!isMyOperation(message)) {
            return;
        }
        Map<String, Object> values = getMessageValues(message);
        String name = values.get("name").toString();
        playerService.setPlayerNickname(session.getId(), name);
        logger.info("Player connected: " + name);
    }
}
