import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './drawing/board/board.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    SidebarComponent,
    BoardComponent,
    ChatComponent,
    MessageComponent
  ],
  exports: [
    FooterComponent,
    SidebarComponent,
    BoardComponent
  ]
})
export class ComponentsModule { }
