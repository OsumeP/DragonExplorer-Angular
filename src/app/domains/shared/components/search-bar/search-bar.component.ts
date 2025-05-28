import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Filters } from '../../../../models/filters';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchControl = new FormControl();
  @Output() addName = new EventEmitter();

  constructor(){
    this.searchControl.valueChanges.subscribe((value) => this.searchNameHandler(value));
  }

  searchNameHandler(value: string){
    this.addName.emit(value);
  }
}
