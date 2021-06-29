import { Component, OnInit, OnDestroy } from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private gameService: GameService) {}
  nickname : string;

  ngOnInit() {}
  ngOnDestroy() {}

  onLogin() {
    this.gameService.establishConnection(this.nickname);
  }

}
