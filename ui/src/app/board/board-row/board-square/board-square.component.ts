import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.scss']
})
export class BoardSquareComponent implements OnInit {

  @Output() onClick = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

}
