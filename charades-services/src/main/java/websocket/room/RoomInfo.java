package websocket.room;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomInfo {

    String name;
    Integer players;
    String drawing;
}
