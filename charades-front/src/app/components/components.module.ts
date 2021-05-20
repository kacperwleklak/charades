import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './drawing/board/board.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import { InputFieldComponent } from './chat/input-field/input-field.component';
import {FormsModule} from "@angular/forms";
import { DrawingComponent } from './drawing/drawing.component';
import { ToolbarComponent } from './drawing/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    FooterComponent,
    SidebarComponent,
    BoardComponent,
    ChatComponent,
    MessageComponent,
    InputFieldComponent,
    DrawingComponent,
    ToolbarComponent
  ],
    exports: [
        FooterComponent,
        SidebarComponent,
        BoardComponent,
        ChatComponent,
        DrawingComponent
    ]
})
export class ComponentsModule { }
