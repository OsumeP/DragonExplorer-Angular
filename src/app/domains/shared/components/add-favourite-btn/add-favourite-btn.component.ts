import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-favourite-btn',
  imports: [],
  templateUrl: './add-favourite-btn.component.html',
  styleUrl: './add-favourite-btn.component.css'
})
export class AddFavouriteBtnComponent {
  @Input() favorite = false;
}
