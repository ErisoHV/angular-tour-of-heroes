import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';


import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireObject, DatabaseReference } from 'angularfire2/database/interfaces';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

    heroes: Observable<any[]>;
    heroesReference : DatabaseReference;
    heroesList : AngularFireList<Hero[]>;

  constructor(private messageService: MessageService, private http : HttpClient, 
    private db: AngularFireDatabase) { 
      this.heroesReference = db.database.ref('/hero');
      this.heroesList = db.list('/hero', ref => ref.orderByChild('powerLevel'));
      this.heroes = this.heroesList.valueChanges();
      console.log(this.heroes)
    }

  getHeroes(): Observable<Hero[]> {
    return this.heroes;
  }

  getHero(name: string): Observable<Hero>{
    // return of(HEROES.find(hero => hero.id === id));
    //return this.heroes.filter((hero : Hero[], i) => hero[i].name === name);
    return null;
  }

  updateHero(hero : Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero : Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
          tap((hero: Hero) => (this.log(`added Hero w/ id=${hero.id}`))),
          catchError(this.handleError<Hero>('addError'))
      );
  }

  deleteHero(hero : Hero | number):Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url,httpOptions)
      .pipe(
          tap(_ => this.log(`deleted hero id=${id}`)),
          catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()){
      return of([]);
    }

    const url = `api/heroes/?name=${term}`;

    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log (message : string){
    this.messageService.add('HeroService: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => { 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
