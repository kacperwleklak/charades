import {Component, OnInit} from '@angular/core';
import {Message} from './message/message';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messagesList: Array<Message>;

  constructor(private gameService: GameService) {
    this.messagesList = new Array<Message>();
  }

  ngOnInit(): void {
    this.gameService.chatUpdater.subscribe(this.getChatSubscriber());
  }

  getChatSubscriber() {
    let component = this;
    return (chatMessage : Message) => {
      component.messagesList.push(chatMessage);
    }
  }

  handleSentMessage(messageText: string) {
    this.gameService.sendChatMessage(messageText);
  }

}
