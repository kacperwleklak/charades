package websocket.operators;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import websocket.player.Player;
import websocket.player.PlayerService;
import websocket.room.Room;
import websocket.room.RoomInfo;
import websocket.room.RoomService;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class RoomInfoOperator implements WebsocketOperator {

    Logger logger = LoggerFactory.getLogger(RoomInfoOperator.class);

    @Autowired
    private RoomService roomService;
    @Autowired
    private PlayerService playerService;

    public String getOperation() {
        return "ROOM_INFO";
    }

    @Override
    public void operate(WebSocketSession session, TextMessage message) throws Exception {
        if (!isMyOperation(message)) {
            return;
        }
        Optional<Player> playerOptional = playerService.getPlayerBySessionId(session.getId());
        if (playerOptional.isPresent()) {
            Player player = playerOptional.get();
            Room room = roomService.getRoomInfo(player.getRoom());
            session.sendMessage(prepareResponse(room));
        } else {
            throw new Exception("Player not found");
        }
    }
}
