import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharModel } from '../../../models/char-model';
import { TransformationModel } from '../../../models/transformation-model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private httpService = inject(HttpClient);
  constructor() { }

  getCharacters() : Observable<{characters: CharModel[], links: any}>;
  getCharacters(url: string) : Observable<{characters: CharModel[], links: any}>;
  getCharacters(url?: string) : Observable<{characters: CharModel[], links: any}>{
    if(!url) url = 'https://dragonball-api.com/api/characters?page=1&limit=6'
    return this.httpService.get<any>(url).pipe(
      map(data => {
        const response: any[] = data.items;
        const characters: CharModel[] = [];
        for(let character of response){
          characters.push(new CharModel(
            character.id,
            character.name,
            character.ki,
            character.race,
            character.gender,
            character.description,
            character.image,
            character.affiliation
          ));
        }

        return {characters: characters, links: data.links};
      }),
      catchError(error => {
        console.error('Error fetching character:', error);
        return of({characters: [new CharModel(-1, '', '', '', '', '', '','')], links: {}});
      })
    );
  }

  getCharacter(id: number): Observable<CharModel> {
    return this.httpService.get<any>(`https://dragonball-api.com/api/characters/${id}`).pipe(
      map(data => {
        const character = new CharModel(
          data.id, 
          data.name, 
          data.ki, 
          data.race,
          data.gender, 
          data.description, 
          data.image, 
          data.affiliation
        );

        if (data.transformations) {
          for (const trs of data.transformations) {
            character.transformations.push(
              new TransformationModel(trs.id, trs.name, trs.image, trs.ki)
            );
          }
        }

        if (data.originPlanet) {
          character.planetId = data.originPlanet.id;
        }

        return character;
      }),
      catchError(error => {
        console.error('Error fetching character:', error);
        return of(new CharModel(-1, '', '', '', '', '', '', ''));
      })
    );
  }
}
