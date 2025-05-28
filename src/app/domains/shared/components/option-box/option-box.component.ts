import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-option-box',
  imports: [],
  templateUrl: './option-box.component.html',
  styleUrl: './option-box.component.css'
})
export class OptionBoxComponent {
  @Input({required: true}) options : string[] = [];
  @Input() color: string = '#000';
  showOptions = signal(false);
  selectedOption = signal('Select...');

  @Output() addFilter = new EventEmitter();

  clickHandler(){
    this.showOptions.update((show) => !show);
  }

  selectOptionHandler(option: string){
    this.selectedOption.set(option);
    this.addFilterHandler();
  }

  addFilterHandler(){
    this.addFilter.emit(this.selectedOption());
  }
}
