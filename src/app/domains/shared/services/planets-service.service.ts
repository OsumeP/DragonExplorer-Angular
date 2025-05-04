import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PlanetModel } from '../../../models/planet-model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsServiceService {
  httpService = inject(HttpClient);
  constructor() { }

  getPlanets() : any;
  getPlanets(url: string) : any;
  getPlanets(url?: string){
    if(url) return this.httpService.get(url);
    return this.httpService.get('https://dragonball-api.com/api/planets?limit=6');
  }

  getPlanet(id: number): Observable<PlanetModel> {
      return this.httpService.get<any>(`https://dragonball-api.com/api/planets/${id}`).pipe(
        map(data => {
          const planet = new PlanetModel(
            data.id, 
            data.name,
            data.isDestroyed,
            data.description,
            data.image,
          );
  
          return planet;
        }),
        catchError(error => {
          console.error('Error fetching character:', error);
          return of(new PlanetModel(-1, '', false, '', ''));
        })
      );
    }
}
