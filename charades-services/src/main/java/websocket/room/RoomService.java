package websocket.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import websocket.player.Player;
import websocket.player.PlayerService;
import websocket.randomizer.RandomWordsService;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
public class RoomService {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private RandomWordsService randomWordsService;

    public static final String HOME = "HOME";

    List<Room> rooms;

    @PostConstruct
    private void postConstruct() {
        rooms = new ArrayList<>();
        createRoom(HOME);
        createRoom("#1 Room");
        createRoom("#2 Room");
        createRoom("#3 Room");
        createRoom("#4 Room");
        createRoom("#5 Room");
        createRoom("#6 Room");
        createRoom("#7 Room");
        createRoom("#8 Room");
    }

    public void createRoom(String name) {
        Room room = new Room();
        room.setName(name);
        rooms.add(room);
    }

    public List<Room> getRooms() {
        return rooms.stream()
                .filter(room -> !room.getName().equals(HOME))
                .collect(Collectors.toList());
    }

    public Room getRoomInfo(String roomName) throws Exception {
        return rooms.stream()
                .filter(room -> room.getName().equals(roomName))
                .map(room -> {
                    room.setPlayers(playerService.getPlayersByRoom(roomName).size());
                    return room;
                }).findAny()
                .orElseThrow(() -> new Exception("Room not found"));
    }

    public String getRoomSecretWord(String roomName) throws Exception {
        return rooms.stream()
                .filter(room -> room.getName().equals(roomName))
                .map(room -> room.getWord())
                .findAny()
                .orElseThrow(() -> new Exception("Room not found"));
    }

    public List<RoomInfo> getRoomsInfo() {
        return getRooms().stream()
                .map(room -> RoomInfo.builder()
                        .drawing(room.getDrawing())
                        .players(playerService.getPlayersByRoom(room.getName()).size())
                        .name(room.getName())
                        .build())
                .toList();
    }

    public void putDrawing(String sessionId, String drawing) {
        Player player = playerService.getPlayerBySessionId(sessionId).get();
        Consumer<Room> drawOnCanvas = room -> {
            if (room.getDrawing().equals(player.getName())) {
                room.setCanvasPicture(drawing);
            }
        };
        findRoomAndModify(player.getRoom(), drawOnCanvas);
        try {
            playerService.notifyAllRoomPlayers(getRoomInfo(player.getRoom()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void joinRoom(String sessionId, String roomName) {
        Player player = playerService.getPlayerBySessionId(sessionId).get();
        Consumer<Room> drawIfNoOneIsDrawing = room -> {
            if (room.getDrawing() == null || room.getDrawing().isEmpty()) {
                room.setDrawing(player.getName());
                room.setWord(randomWordsService.getRandomWord());
            }
        };
        findRoomAndModify(roomName, drawIfNoOneIsDrawing);
        playerService.joinRoom(sessionId, roomName);

    }

    public boolean checkWord(String roomName, String word) {
        boolean isCorrectWord = false;
        try {
            Room room = getRoomInfo(roomName);
            isCorrectWord = room.getWord().equals(word);
            if (isCorrectWord) {
                resetRoom(roomName);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return isCorrectWord;
        }
    }

    private void resetRoom(String roomName) {
        Consumer<Room> roomReset = room -> {
            room.setWord(randomWordsService.getRandomWord());
            List<Player> playersByRoom = playerService.getPlayersByRoom(roomName);
            room.setDrawing(randomWordsService.getRandomPlayer(playersByRoom).getName());
        };
        findRoomAndModify(roomName, roomReset);
        try {
            playerService.notifyAllRoomPlayers(getRoomInfo(roomName));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void findRoomAndModify(String roomName, Consumer<Room> consumer) {
        rooms.stream()
                .filter(room -> room.getName().equals(roomName))
                .forEach(consumer);
    }

}
