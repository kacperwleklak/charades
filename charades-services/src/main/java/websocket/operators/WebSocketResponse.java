package websocket.operators;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WebSocketResponse {

    private String operation;
    private Object data;

}
