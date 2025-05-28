import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharModel } from '../../../models/char-model';
import { TransformationModel } from '../../../models/transformation-model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { Filters } from '../../../models/filters';
import { FilterChar } from '../../../models/filter-char';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private httpService = inject(HttpClient);
  public filters: FilterChar = new FilterChar();

  constructor() { }

  mapCharacter(character: any) : CharModel{
    return new CharModel(
            character.id,
            character.name,
            character.ki,
            character.race,
            character.gender,
            character.description,
            character.image,
            character.affiliation
          )
  }
  getCharacters() : Observable<{characters: CharModel[], links: any}>;
  getCharacters(url: string) : Observable<{characters: CharModel[], links: any}>;
  getCharacters(url?: string) : Observable<{characters: CharModel[], links: any}>{
    if(!url) url = 'https://dragonball-api.com/api/characters?page=1&limit=6'
    return this.httpService.get<any>(url).pipe(
      map(data => {
        const response: any[] = data.items;
        const characters: CharModel[] = [];
        for(let character of response){
          characters.push(this.mapCharacter(character));
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

  getFilteredCharacters(): Observable<CharModel[]>{
    let params = new HttpParams();

    if(this.filters.name) params = params.append('name', this.filters.name);
    if(this.filters.affiliation) params = params.append('affiliation', this.filters.affiliation);
    if(this.filters.race) params = params.append('race', this.filters.race);
    if(this.filters.gender) params = params.append('gender', this.filters.gender);
    return this.httpService.get<any>('https://dragonball-api.com/api/characters', {params}).pipe(
      map(data => {
        const response: any[] = data;
        const characters: CharModel[] = [];
        for(let character of response){
          characters.push(this.mapCharacter(character));
        }
        return characters;
      }),
      catchError(error => {
        console.error('Error fetching character:', error);
        return of([]);
      })
    );
  }
}
