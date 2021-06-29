import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BrushSettings} from "../brush-settings";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Output() eraseCanvas: EventEmitter<null> = new EventEmitter();
  @Output() toolbarLoaded: EventEmitter<boolean> = new EventEmitter();

  brushSettings: BrushSettings;
  colors : string[];
  brushSizes : number[] = [6, 12, 18, 24];

  constructor() { }

  ngOnInit(): void {
    this.setColors();
    this.defaultSettings();
  }

  ngAfterViewInit(){
    console.log('Toolbar loaded');
    this.toolbarLoaded.emit(true);
  }

  defaultSettings() {
    this.brushSettings = new BrushSettings();
    this.brushSettings.color = this.colors[5];
    this.brushSettings.size = this.brushSizes[0];
  }

  onColorClick(chosenColor : string) {
    this.brushSettings.color = chosenColor;
    console.debug("New active color: " + this.brushSettings.color)
  }

  onBrushSizeClick(chosenBrushSize : number) {
    this.brushSettings.size = chosenBrushSize;
    console.debug("New active brush: " + this.brushSettings.size)
  }

  onEraseCanvas() {
    this.eraseCanvas.emit();
  }

  setColors() {
    this.colors = [
      "#ffffff",
      "#000000",
      "#5c5c5c",
      "#a6a6a6",
      "#eb3434",
      "#eba234",
      "#faef20",
      "#76e024",
      "#24a4e0",
      "#2434e0",
      "#9b12db",
      "#db1298"
    ];
  }

}
