import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  private rooms: Observable<any>;

  constructor(private gameService: GameService) {
    this.rooms = this.gameService.roomsObservable();
    this.gameService.getRoomsInfo();
  }

  ngOnInit(): void {
  }

  joinRoom(room) {
    this.gameService.joinRoom(room.name);
  }

  getString(obj) {
    return JSON.stringify(obj, undefined, 2);
  }

}
