import {Component, OnInit, ViewChild} from '@angular/core';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {BrushSettings} from "./brush-settings";
import {BoardComponent} from "./board/board.component";

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit {

  @ViewChild(ToolbarComponent) toolbar: ToolbarComponent;
  @ViewChild(BoardComponent) board: BoardComponent;
  brushSettings: BrushSettings;

  constructor() {
    this.brushSettings = new BrushSettings();
  }

  ngOnInit(): void {
  }

  onEraseCanvas() {
    this.board.eraseCanvas();
  }

  afterToolbarLoaded() {
    this.brushSettings = this.toolbar.brushSettings;
  }

}
