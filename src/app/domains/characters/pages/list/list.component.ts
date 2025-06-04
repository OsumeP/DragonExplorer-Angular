import { Component, effect, HostListener, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { CharacterComponent } from "../../components/character/character.component";
import { CharModel } from '../../../../models/char-model';
import { FavoriteComponent } from "@shared/components/favorite/favorite.component";
import { FavoritesBtnComponent } from "@shared/components/favorites-btn/favorites-btn.component";
import { CharactersService } from '@shared/services/characters.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { CharFiltersComponent } from "../../components/char-filters/char-filters.component";
import { EmptyComponent } from "../../../shared/components/empty/empty.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-list',
  imports: [CharacterComponent, FavoriteComponent, FavoritesBtnComponent, CharFiltersComponent, EmptyComponent, LoadingComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })), // Estado inicial (antes de entrar)
      transition(':enter', [ // Animación de entrada
        animate('2000ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ],
})
export class ListComponent {
  characters = signal<CharModel[]>([]);
  showFavourites = signal(false);
  characterService = inject(CharactersService);
  filtered = signal(false);
  nextUrl = '';
  loading = signal(false);
  loadingCharacters = signal(false);

  constructor() {
  }

  async ngOnInit() {
    this.loadData();
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached() && !this.loadingCharacters()) {
       this.getNewCharacters();
    }
  }

  loadData() : void{
    this.characterService.getCharacters().subscribe((response) =>{
      this.characters.set(response.characters);
      this.nextUrl = response.links.next;
    })
  }

  async getNewCharacters(): Promise<void> {
    if(this.filtered() || this.nextUrl == '') return;
    this.loadingCharacters.set(true);
     await this.characterService.getCharacters(this.nextUrl).subscribe({
      next: (response) =>{
        this.characters.update(characters => [...characters, ...response.characters]);
        this.nextUrl = response.links.next;
      },
      error: () =>{
        console.error('Error loading characters');
        this.loadingCharacters.set(false);
      },
      complete: () =>{
        this.loadingCharacters.set(false);
      }
    })
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  showFavoriteHandler() {
    this.showFavourites.update((state => !state));
  }

}
