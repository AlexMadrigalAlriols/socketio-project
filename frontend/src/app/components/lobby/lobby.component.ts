import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public createGame() {
    const uuid4 = uuid();
    this.router.navigate(['/game', uuid4]);
  }

}
