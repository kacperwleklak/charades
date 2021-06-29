package websocket.randomizer;

import org.springframework.stereotype.Service;
import websocket.player.Player;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class RandomWordsService {

    private final String[] WORDS_LIST = new String[]
            {"moda", "odrzut", "majtki", "higiena", "guma", "automat", "chór", "lampa", "gazeta", "azyl", "wodorosty",
                    "rusztowanie", "zmiana", "konsument", "pobocze", "futro", "niger", "kenia", "koniec", "paragwaj", "trucizna",
                    "rodzaj", "tarta", "choroba", "wietnam", "sudan", "samochód", "narzuta", "kalkulator", "raport", "witaminy",
                    "wdowa", "barbados", "gęś", "masaż", "badania", "ciasto", "parkometr", "miejsce", "senator"};
    private ArrayList<String> words = new ArrayList<>(Arrays.asList(WORDS_LIST));

    public String getRandomWord() {
        return words.stream()
                .sorted((o1, o2) -> ThreadLocalRandom.current().nextInt(-1, 2))
                .findAny()
                .get();
    }

    public Player getRandomPlayer(List<Player> players) {
        return players.stream()
                .sorted((o1, o2) -> ThreadLocalRandom.current().nextInt(-1, 2))
                .findAny()
                .get();
    }
}
