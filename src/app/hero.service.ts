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
      this.heroes = this.heroesList.snapshotChanges();
    }

  getHeroes(): Observable<Hero[]> {
    return this.heroes;
  }

  getHero(name: string): Observable<Hero>{
    // return of(HEROES.find(hero => hero.id === id));
    //return this.heroes.filter((hero : Hero[], i) => hero[i].name === name);
   // console.log(this.heroesList)
    //this.heroes.map
    return null;
  }

  updateHero(hero : Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.key}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero : Hero){
      this.heroesReference.push(hero);
  }

  deleteHero(hero : Hero | string):void{
    const id = typeof hero === 'string' ? hero : hero.key;
    console.log(hero)
    console.log(`Eliminando: ${id}`)
    this.heroesReference.child(`${id}`).remove();
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
