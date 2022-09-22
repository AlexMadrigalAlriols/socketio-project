import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { io,Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket !: Socket;

  constructor() { }

  connect(gameId: string) {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('joinGame', {gameId: gameId});
  }

  startGame(gameId: string) {
    this.socket.emit('startGame', {gameId: gameId});
  }

  sendGameUpdate(gameId : string, words : any) {
    this.socket.emit('gameUpdate', {gameId: gameId, words: words});
  }

  recieveJoinedPlayers() {
    return new Observable((observer) => {
      this.socket.on('joinGame', (message) => {
        observer.next(message);
      });
    });
  }

  recieveStartGame() {
    return new Observable((observer) => {
      this.socket.on('startGame', (message) => {
        observer.next(message);
      });
    });
  }

  recieveGameUpdate(gameId: string) {
    return new Observable((observer) => {
      this.socket.on(gameId, (words) => {
        observer.next(words);
      });
    });
  }
}
