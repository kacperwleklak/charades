import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {BrushSettings} from "./brush-settings";
import {BoardComponent} from "./board/board.component";

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit, AfterViewInit {

  @ViewChild(ToolbarComponent) toolbar: ToolbarComponent;
  @ViewChild(BoardComponent) board: BoardComponent;
  brushSettings: BrushSettings;
  toolbarInitialized: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.toolbarInitialized = false;
  }

  ngAfterViewInit() {
    this.brushSettings = this.toolbar.brushSettings;
    this.toolbarInitialized = true;
  }

  onEraseCanvas() {
    this.board.eraseCanvas();
  }

}
