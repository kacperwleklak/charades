import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: ''},
  {path: '/game-room', title: 'Game room', icon: 'ni-controller text-primary', class: ''},
  {path: '/rooms', title: 'Rooms list', icon: 'ni-bullet-list-67 text-red', class: ''},
  {path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: ''},
  {path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: ''},
  {path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
