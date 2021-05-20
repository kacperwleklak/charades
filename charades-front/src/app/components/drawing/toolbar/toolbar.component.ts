import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() activeColor: string;
  @Output() activeBrush: string;
  colors : string[];
  brushSizes : number[] = [6, 12, 18, 24];

  constructor() { }

  ngOnInit(): void {
    this.setColors();

  }

  defaultSettings() {
    this.activeColor = this.colors[0];
    this.activeBrush = this.activeBrush[0];
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
