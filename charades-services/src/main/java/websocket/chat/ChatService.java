package websocket.chat;

import com.google.gson.Gson;
import org.springframework.beans.Mergeable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import websocket.operators.WebSocketResponse;
import websocket.player.PlayerService;
import websocket.room.RoomService;

import java.io.IOException;

@Service
public class ChatService {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private RoomService roomService;

    public void broadcastChatMessage(String roomName, ChatMessage chatMessage) {
        playerService.getPlayersByRoom(roomName)
                .forEach(player -> {
                    WebSocketSession session = player.getSession();
                    WebSocketResponse response = new WebSocketResponse("CHAT", chatMessage);
                    try {
                        session.sendMessage(new TextMessage(new Gson().toJson(response)));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
    }

    public void checkCorrectMessage(String roomName, ChatMessage chatMessage) {
        boolean isCorrect = roomService.checkWord(roomName, chatMessage.getMessage());
        if (isCorrect) {
            ChatMessage message = new ChatMessage();
            message.setAuthor("SYSTEM");
            message.setMessage(chatMessage.getAuthor() + " guessed the correct word which was: " + chatMessage.getMessage());
            broadcastChatMessage(roomName, message);
        }
    }
}
