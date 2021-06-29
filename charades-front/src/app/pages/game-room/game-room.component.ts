import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Room} from "../../services/room/room";

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit, AfterViewInit{

  public room: Room;
  public viewInitialized = false;
  public playerName: string;
  @ViewChild('showingCanvas') showingCanvas: ElementRef;
  cx: HTMLCanvasElement;

  constructor(private gameService: GameService) {
    this.gameService.getRoomInfo();
    this.playerName = this.gameService.playerSession.name;
  }

  ngAfterViewInit(): void {
    this.cx = this.showingCanvas.nativeElement;
    this.cx.width = 600
    this.cx.height = 500;
  }

  ngOnInit(): void {
    this.gameService.roomUpdater.subscribe(this.getRoomSubscriber());
  }

  getRoomSubscriber() {
    let component = this;
    return (room) => {
      component.viewInitialized = true;
      component.room = room;
      component.putImgOnCanvas(component.room.canvasPicture);
    }
  }


  putImgOnCanvas(data) {
    if (!data) {
      return;
    }
    let canvas = this.cx;
    let img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
    };
    img.src = data;
  }

}
