import { Component, inject, Input, signal } from '@angular/core';
import { DisplayObj } from '../../../../models/display-obj';
import { CharModel } from '../../../../models/char-model';
import { FavoritesService } from '@shared/services/favorites.service';

@Component({
  selector: 'app-favorite',
  imports: [],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  favorites = signal<DisplayObj[]>([]);
  favoritesService = inject(FavoritesService);

  ngOnInit(){
    this.favorites = this.favoritesService.favorites;
  }
}
