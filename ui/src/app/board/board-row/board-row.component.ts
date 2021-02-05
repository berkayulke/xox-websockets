import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-row',
  templateUrl: './board-row.component.html',
  styleUrls: ['./board-row.component.scss']
})
export class BoardRowComponent implements OnInit {

  @Input() index: number

  constructor() { }

  ngOnInit(): void {
  }

  onSquareClick(squareIndex: number) {
    console.log(this.index + '. satırın ' + squareIndex + '. karesine basıldı')
  }

}
