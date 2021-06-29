package websocket.player;

import com.google.gson.Gson;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import websocket.operators.WebSocketResponse;
import websocket.room.Room;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    List<Player> players;

    @PostConstruct
    private void postConstruct() {
        System.out.println("PlayerService initialized");
        players = new ArrayList<>();
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public void removePlayer(String sessionId) {
        players.removeIf(player -> player.getSessionId().equals(sessionId));
    }

    public void setPlayerNickname(String sessionId, String name) {
        Consumer<Player> consumer = player -> {
            player.setName(name);
        };
        findPlayerAndModify(sessionId, consumer);
    }

    public List<Player> getPlayersByRoom(String roomName) {
        return players.stream()
                .filter(player -> player.getRoom().equals(roomName))
                .collect(Collectors.toList());
    }

    public void joinRoom(String sessionId, String roomName) {
        Consumer<Player> consumer = player -> {
            player.setRoom(roomName);
        };
        findPlayerAndModify(sessionId, consumer);
    }

    public Optional<Player> getPlayerBySessionId(String sessionId) {
        return players.stream()
                .filter(player -> player.getSessionId().equals(sessionId))
                .findFirst();
    }

    public void findPlayerAndModify(String sessionId, Consumer<Player> consumer) {
        players.stream()
                .filter(player -> player.getSessionId().equals(sessionId))
                .forEach(consumer);
    }

    public void notifyAllRoomPlayers(Room room) {
        players.stream()
                .filter(player -> player.getRoom().equals(room.getName()))
                .forEach(player -> {
                    WebSocketSession session = player.getSession();
                    WebSocketResponse response = new WebSocketResponse("ROOM_INFO", room);
                    try {
                        session.sendMessage(new TextMessage(new Gson().toJson(response)));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });

    }
}
