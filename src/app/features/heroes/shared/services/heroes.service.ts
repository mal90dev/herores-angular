import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl = 'http://localhost:3000';
  private _totalHeroes = 25;
  
  public get totalHeroes() {
    return this._totalHeroes;
  }
  public set totalHeroes(value) {
    this._totalHeroes = value;
  }

  constructor(private readonly http: HttpClient) { }

  getHeroes(page: number, numberItems: number): Observable<Hero[]> {
    const params = new HttpParams()
    .set('_page', page)
    .set('_limit', numberItems);
    return this.http.get<Hero[]>(this.baseUrl + '/heroes', {params});
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`);
  }

  searchHeroes(searchTerm: string): Observable<Hero[]> {
    const params = new HttpParams()
      .set('name_like', searchTerm)
      .set('_limit', 8);
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`, {params});
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  deleteHero(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`);
  }


}
