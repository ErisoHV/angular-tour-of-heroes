import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {AngularFireDatabase} from 'angularfire2/database';

import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  heroes: Observable<any[]>;
  heroesRef : AngularFireList<Hero[]>;

  heroRef :  AngularFireObject<Hero>;
  hero : Observable<Hero>;

  public constructor (private titleService: Title, db: AngularFireDatabase) {
    this.titleService.setTitle('Tour of Heroes');
    this.heroesRef = db.list('/hero', ref => ref.orderByChild('powerLevel'));
    
     /* this.heroes = this.heroesRef.valueChanges();

    this.heroRef = db.object('hero');
    this.hero = this.heroRef.valueChanges();

    const myRef = db.database.ref().child('hero');
    let heroTest : Hero;

 //   myRef.
    heroTest = new Hero();
    heroTest.id = 11;
    heroTest.name = 'Mr. Nice';
    heroTest.powerLevel = 5;
    heroTest.weakness = 'Soja';

    myRef.push(heroTest);


    heroTest = new Hero();
    heroTest.id = 12;
    heroTest.name = 'Bombasto';
    heroTest.powerLevel = 5;
    heroTest.weakness = 'Eggplant';
    
    myRef.push(heroTest);*/


    
 /*   { id: 11, name: 'Mr. Nice', powerLevel: 5, weakness: 'Soja' },
  { id: 12, name: 'Narco', powerLevel: 7, weakness: 'Bread' },
  { id: 13, name: 'Bombasto', powerLevel: 5, weakness: 'Eggplant' },
  { id: 14, name: 'Celeritas', powerLevel: 10, weakness: 'Kriptonita' },
  { id: 15, name: 'Magneta', powerLevel: 10, weakness: 'Red color' },
  { id: 16, name: 'RubberMan', powerLevel: 8, weakness: 'McDonald\'s' },
  { id: 17, name: 'Dynama', powerLevel: 2 , weakness: 'Rihanna'},
  { id: 18, name: 'Dr IQ', powerLevel: 6, weakness: 'Fool people' },
  { id: 19, name: 'Magma', powerLevel: 10, weakness: 'Children' },
  { id: 20, name: 'Tornado', powerLevel: 10, weakness: 'Hot dogs' }*/

    //this.heroesRef.pus h

    //this.heroesRef.update('-L0Qc_-S-LhcjfyQ7A_B', new Hero());
 //   this.heroes.snapshotChanges(Child)
   // this.heroes.push(new Hero());()
    // this.heroes.remove();
  }

}
