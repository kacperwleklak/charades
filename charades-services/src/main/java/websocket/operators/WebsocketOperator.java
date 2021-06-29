package websocket.operators;

import com.google.gson.Gson;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

public interface WebsocketOperator {

    String getOperation();

    void operate(WebSocketSession session, TextMessage message) throws Exception;

    default boolean isMyOperation(TextMessage message) {
        Map value = new Gson().fromJson(message.getPayload(), Map.class);
        return getOperation().equals(value.get("operation"));
    }

    default Map getMessageValues(TextMessage message) {
        return new Gson().fromJson(message.getPayload(), Map.class);
    }

    default TextMessage prepareResponse(Object data) {
        WebSocketResponse response = new WebSocketResponse(getOperation(), data);
        return new TextMessage(new Gson().toJson(response));
    }
}
