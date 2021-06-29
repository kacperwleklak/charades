package websocket.room;

import lombok.Data;

@Data
public class Room {

    private String name;
    private int players;
    private String drawing;
    private String canvasPicture;
    private String word;
}
