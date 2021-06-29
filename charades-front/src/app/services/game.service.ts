import {EventEmitter, Injectable} from '@angular/core';
import {PlayerSession} from "./player-session/player-session";
import {Operation} from "./ws-message/operation.enum";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {Room} from "./room/room";
import {Message} from "../components/chat/message/message";

@Injectable({
  providedIn: 'root'
})

export class GameService {

  public playerSession: PlayerSession;
  public rooms: Subject<Object>;
  public currentRoom: string;
  public roomUpdater: EventEmitter<Room>;
  public chatUpdater: EventEmitter<Message>;
  private socket: WebSocket;
  private executors: Map<string, Function>;
  private service = this;

  constructor(private router: Router) {
    this.rooms = new Subject<Array<Object>>();
    this.currentRoom = "HOME";
    this.roomUpdater = new EventEmitter<Room>();
    this.chatUpdater = new EventEmitter<Message>();

    this.executors = new Map<string, Function>();
    this.executors.set(Operation.ROOMS_INFO, this.handleRoomsInfoResponse);
    this.executors.set(Operation.ROOM_INFO, this.handleRoomInfoResponse);
    this.executors.set(Operation.JOIN_ROOM, this.handleJoinRoomResponse);
    this.executors.set(Operation.CHAT, this.handleChatMessageResponse);

    this.socket = new WebSocket('ws://localhost:8080/game');
    this.socket.onmessage = this.getMessageHandler();
    this.playerSession = new PlayerSession();
  }

  roomsObservable() {
    return this.rooms.asObservable();
  }

  establishConnection(nickname: string) {
    this.playerSession.name = nickname;
    let message = {operation: Operation.ESTABLISH, name: nickname};
    this.sendMessage(message);
  }

  getRoomsInfo() {
    let message = {operation: Operation.ROOMS_INFO};
    this.sendMessage(message);
  }

  joinRoom(room: string) {
    let message = {operation: Operation.JOIN_ROOM, room: room}
    this.sendMessage(message);
  }

  getRoomInfo() {
    let message = {operation: Operation.ROOM_INFO}
    this.sendMessage(message);
  }

  drawImage(drawing: string): void {
    let message = {operation: Operation.DRAW, drawing: drawing}
    this.sendMessage(message)
  }

  sendChatMessage(content: string): void {
    let message = {operation: Operation.CHAT, message: content}
    this.sendMessage(message)
  }

  sendMessage(message) {
    this.socket.send(JSON.stringify(message));
  }

  getMessageHandler() {
    let service = this.service;
    return function messageHandler(data: MessageEvent) {
      let messageData = JSON.parse(data.data);
      let operation = messageData.operation;
      try {
        service.executors.get(operation)(messageData.data, service);
      } catch (e) {
        console.error("Unsupported operation: " + operation)
      }
    }
  }

  handleRoomsInfoResponse(message, service) {
    service.rooms.next(message);
  }

  handleJoinRoomResponse(message, service) {
    service.currentRoom = message;
    if (message != "HOME") {
      service.router.navigateByUrl("/game-room");
    } else {
      service.router.navigateByUrl("/rooms-list");
    }
  }

  handleRoomInfoResponse(message, service) {
    debugger;
    let room = new Room();
    room.name = message.name;
    room.drawing = message.drawing;
    room.players = message.players;
    room.canvasPicture = message.canvasPicture;
    room.word = message.word;
    service.roomUpdater.emit(room);
  }

  handleChatMessageResponse(message, service) {
    debugger;
    let chatMessage = new Message();
    chatMessage.author = message.author;
    chatMessage.message = message.message;
    service.chatUpdater.emit(chatMessage);
  }


}
