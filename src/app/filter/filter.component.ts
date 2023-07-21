import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  public activeNav:number=0;

  filterChanged(number: number) {
    console.log(`namestam ${number}`)
    this.activeNav=number;

  }
}
