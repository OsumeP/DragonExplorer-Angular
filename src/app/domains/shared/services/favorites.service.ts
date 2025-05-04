import { effect, Injectable, signal } from '@angular/core';
import { CharModel } from '../../../models/char-model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites = signal<CharModel[]>([]);
  set = signal<Set<string>>(new Set());

  constructor() { 
    let value : string | null = localStorage.getItem('favorites');
    if(!value) return; 
    let obj : CharModel[] = JSON.parse(value);
    this.favorites.set(obj);
    this.set.set(new Set(obj.map((item) => `${item.type}${item.id}`)));
  }

  saveFavorites(){
    const arr = this.favorites();
    localStorage.setItem('favorites', JSON.stringify(arr));
  }
}
