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
    this.heroes = this.heroesRef.valueChanges();

    this.heroRef = db.object('hero/-L0Qc_-S-LhcjfyQ7A_B');
    this.hero = this.heroRef.valueChanges();

    this.heroRef.update({'name':'ciclope'});
    this.heroRef.update({'powerLevel': 6});
    //this.heroesRef.update('-L0Qc_-S-LhcjfyQ7A_B', new Hero());
 //   this.heroes.snapshotChanges(Child)
   // this.heroes.push(new Hero());()
    // this.heroes.remove();
  }

}
