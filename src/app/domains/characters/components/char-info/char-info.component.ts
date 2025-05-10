import { Component, inject, Input, Signal, signal, WritableSignal } from '@angular/core';
import { CloseBtnComponent } from "../../../shared/components/close-btn/close-btn.component";
import { CharModel } from '../../../../models/char-model';
import { PlanetModel } from '../../../../models/planet-model';
import { PlanetsServiceService } from '@shared/services/planets-service.service';
import { CharactersService } from '@shared/services/characters.service';
import { switchMap } from 'rxjs';
import { ArrowComponent } from "../../../shared/components/arrow/arrow.component";
import { ScouterComponent } from "../../../shared/components/scouter/scouter.component";
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-char-info',
  imports: [CloseBtnComponent, ArrowComponent, ScouterComponent],
  templateUrl: './char-info.component.html',
  styleUrl: './char-info.component.css',
  animations:[
    trigger('moveAnimation',[
      transition('* => sequence', [
        sequence([
          animate('0.1s ease', style({ opacity: '1' })),
          // upLeft
          animate('0.3s ease', style({ transform: 'translateX(-70%) translateY(-100%)' })),
          // upRight
          animate('0.3s ease', style({ transform: 'translateX(70%) translateY(-100%)' })),
          // down
          animate('0.3s ease', style({ transform: 'translateX(0) translateY(100%)' })),
          // left
          animate('0.3s ease', style({ transform: 'translateX(-65%) translateY(0)' })),
          //center
          animate('0.3s ease', style({ transform: 'translateX(0) translateY(0)' })),
          animate('0.5s ease', style({ 
            opacity: 0
          }))
        ])
      ]),
    ]),
    trigger('fadeAnimation', [
      state('dark', style({filter: 'brigthness(1)'})),
      transition('* => dark', [
        animate('100ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({filter: 'brightness(0)'})),
          animate('1500ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({filter: 'brightness(0.01)'})),
          animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({filter: 'brightness(1)'})),
      ]),
    ]),
    trigger('bgAnimation',[
      state('darkBg', style({backgroundColor: 'transparent'})),
      transition('* => darkBg', [
        animate('50ms ease', style({ backgroundColor: '#000000' })),
        animate('1500ms ease', style({ backgroundColor: '#000001' })),
        animate('300ms ease', style({ backgroundColor: 'transparent' }))
      ])
    ])
  ]
})
export class CharInfoComponent {
  @Input({required: true}) showInfo = signal(false);
  @Input({required: true}) charId = -1;
  character = signal(new CharModel(0,'','','','','','/Question_mark.png',''));
  planet: WritableSignal<PlanetModel> = signal(new PlanetModel(-1, '', false, '', ''));
  loadingPlanet = signal(false);
  planetService = inject(PlanetsServiceService);
  characterService = inject(CharactersService);
  index = signal(-1);
  moveState: string = 'neutral';
  darkState: string = 'neutral';
  bgState: string = 'neutral';

  async ngOnInit(){
    this.darkState = 'dark';
    this.bgState = 'darkBg';
    this.loadData();
    this.moveState = 'sequence';
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

  nextTransformationHandler(){
    this.index.update(index => index + 1);
  }

  prevTransformationHandler(){
    this.index.update(index => index - 1);
  }

  getName() : string{
    const transIndex = this.index();
    if(transIndex > -1){
      return this.character().transformations[transIndex].name;
    }
    return this.character().name;
  }
  getImg() : string{
    const transIndex = this.index();
    if(transIndex > -1){
      return this.character().transformations[transIndex].img;
    }
    return this.character().imgUrl;
  }
}
