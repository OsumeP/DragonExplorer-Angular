import { Component, inject, Input, signal } from '@angular/core';
import { CharModel } from '../../../../models/char-model';
import { AddFavouriteBtnComponent } from "../../../shared/components/add-favourite-btn/add-favourite-btn.component";
import { CharInfoComponent } from "../char-info/char-info.component";
import { FavoritesService } from '@shared/services/favorites.service';

@Component({
  selector: 'app-character',
  imports: [AddFavouriteBtnComponent, CharInfoComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  @Input({required: true}) character: CharModel = new CharModel(-1,'','','','','','','');
  favorites = signal<CharModel[]>([]);
  set = signal(new Set());
  favoritesService = inject(FavoritesService);
  showInfo = signal(false);

  ngOnInit(){
    this.favorites = this.favoritesService.favorites;
    this.set = this.favoritesService.set;
  }

  addFavorite(){
    const newArr : CharModel[] = [];
    let already : boolean = false;
    console.log(this.favorites());
    for(let item of this.favorites()){
      if(item.id == this.character.id && this.character.type === 'character'){
        already = true;
        continue;
      }

      newArr.push(item);
    }
    if(!already) newArr.push(this.character);
    this.favorites.set(newArr);
    this.set.set(new Set(newArr.map((item) => item.type+item.id)));
    this.favoritesService.saveFavorites();
  }

  showInfoHandler(){
    this.showInfo.set(true);
  }
}
