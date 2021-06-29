import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GameRoomComponent} from "../../pages/game-room/game-room.component";
import {ComponentsModule} from "../../components/components.module";
import {RoomsListComponent} from "../../pages/rooms-list/rooms-list.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    TablesComponent,
    IconsComponent,
    GameRoomComponent,
    RoomsListComponent
  ]
})

export class AdminLayoutModule {
}
