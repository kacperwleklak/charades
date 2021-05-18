import {Component, OnInit} from '@angular/core';
import {Message} from './message/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messagesList: Array<Message>;

  constructor() {
  }

  ngOnInit(): void {
    this.messagesList = new Array<Message>();
    let text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius sit. Enim nunc faucibus a pellentesque sit amet. Tortor vitae purus faucibus ornare suspendisse sed. Euismod in pellentesque massa placerat duis ultricies. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Sed enim ut sem viverra aliquet eget sit. Ullamcorper morbi tincidunt ornare massa eget. Morbi blandit cursus risus at. Elementum curabitur vitae nunc sed. Nisi est sit amet facilisis magna etiam tempor. Dui id ornare arcu odio ut sem nulla pharetra. Massa eget egestas purus viverra. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Velit euismod in pellentesque massa. Aliquet enim tortor at auctor urna nunc. Nisl tincidunt eget nullam non nisi est. Amet facilisis magna etiam tempor orci eu lobortis. Quis risus sed vulputate odio ut enim blandit volutpat maecenas. Interdum posuere lorem ipsum dolor sit. Quis risus sed vulputate odio ut enim blandit. Proin sed libero enim sed. Purus faucibus ornare suspendisse sed nisi lacus. Posuere sollicitudin aliquam ultrices sagittis. Nibh mauris cursus mattis molestie a. Amet risus nullam eget felis eget nunc lobortis. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a. Dui ut ornare lectus sit amet est placerat in. Praesent tristique magna sit amet purus gravida quis blandit. Risus viverra adipiscing at in tellus integer. Lacus luctus accumsan tortor posuere ac ut consequat. Ipsum consequat nisl vel pretium lectus quam id leo in. Purus sit amet luctus venenatis lectus magna fringilla. Velit egestas dui id ornare arcu. Enim eu turpis egestas pretium aenean pharetra magna. Quis commodo odio aenean sed adipiscing diam. Aliquam purus sit amet luctus. Fringilla est ullamcorper eget nulla facilisi etiam. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae. Nisl condimentum id venenatis a. Neque volutpat ac tincidunt vitae semper quis lectus nulla. A iaculis at erat pellentesque. Aenean pharetra magna ac placerat vestibulum. Consequat semper viverra nam libero justo laoreet sit. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Eget nulla facilisi etiam dignissim diam. Senectus et netus et malesuada. Tellus molestie nunc non blandit massa enim nec dui nunc. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Semper quis lectus nulla at volutpat diam ut. Faucibus et molestie ac feugiat sed. Egestas congue quisque egestas diam. Consectetur a erat nam at lectus urna duis convallis. Tempor id eu nisl nunc mi ipsum faucibus vitae. Ipsum consequat nisl vel pretium lectus quam id. Non arcu risus quis varius. Amet commodo nulla facilisi nullam vehicula ipsum a. Risus sed vulputate odio ut enim blandit. Tortor aliquam nulla facilisi cras. Sit amet venenatis urna cursus eget nunc. Urna cursus eget nunc scelerisque viverra mauris. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Mauris sit amet massa vitae tortor condimentum lacinia quis vel.";
    for (let i = 0; i < 15; i++) {
      let mess: Message = new Message();
      mess.message = text.substr(i * 100, 100);
      mess.user = text.substr(i * 100, 10);
      this.messagesList.push(mess)
    }
  }

  handleSentMessage(messageText: string) {
    let message: Message = new Message()
    message.user = "User";
    message.message = messageText;
    this.messagesList.push(message);
  }

}
