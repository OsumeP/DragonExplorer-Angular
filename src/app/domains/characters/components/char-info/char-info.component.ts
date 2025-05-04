import { Component, inject, Input, Signal, signal, WritableSignal } from '@angular/core';
import { CloseBtnComponent } from "../../../shared/components/close-btn/close-btn.component";
import { CharModel } from '../../../../models/char-model';
import { PlanetModel } from '../../../../models/planet-model';
import { PlanetsServiceService } from '@shared/services/planets-service.service';
import { CharactersService } from '@shared/services/characters.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-char-info',
  imports: [CloseBtnComponent],
  templateUrl: './char-info.component.html',
  styleUrl: './char-info.component.css'
})
export class CharInfoComponent {
  @Input({required: true}) showInfo = signal(false);
  @Input({required: true}) charId = -1;
  character = signal(new CharModel(0,'','','','','','',''));
  planet: WritableSignal<PlanetModel> = signal(new PlanetModel(-1, '', false, '', ''));
  loadingPlanet = signal(false);
  planetService = inject(PlanetsServiceService);
  characterService = inject(CharactersService);
  async ngOnInit(){
    this.loadData();
  }

  loadData(): void{
    this.characterService.getCharacter(this.charId).pipe(
      switchMap(character => {
        this.character.set(character);
        return this.planetService.getPlanet(character.planetId);
      })
    ).subscribe({
      next: planet => this.planet.set(planet),
      error: err => console.error('Error loading data:', err)
    });
  }
}
