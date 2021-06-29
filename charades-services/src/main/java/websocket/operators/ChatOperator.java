package websocket.operators;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import websocket.chat.ChatMessage;
import websocket.chat.ChatService;
import websocket.player.Player;
import websocket.player.PlayerService;

import java.util.Map;
import java.util.Optional;

@Component
public class ChatOperator implements WebsocketOperator {

    public String getOperation() {
        return "CHAT";
    }

    @Autowired
    private PlayerService playerService;

    @Autowired
    private ChatService chatService;

    @Override
    public void operate(WebSocketSession session, TextMessage message) {
        if (!isMyOperation(message)) {
            return;
        }
        Optional<Player> playerOptional = playerService.getPlayerBySessionId(session.getId());
        Map value = new Gson().fromJson(message.getPayload(), Map.class);
        if (playerOptional.isPresent()) {
            Player player = playerOptional.get();
            String sendMessage = value.get("message").toString();
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setMessage(sendMessage);
            chatMessage.setAuthor(player.getName());
            chatService.broadcastChatMessage(player.getRoom(), chatMessage);
            chatService.checkCorrectMessage(player.getRoom(), chatMessage);
        } else {
            System.out.println("Player not found!");
        }

    }
}
