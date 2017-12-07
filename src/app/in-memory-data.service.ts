import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', powerLevel:5 },
      { id: 12, name: 'Narco', powerLevel: 7 },
      { id: 13, name: 'Bombasto', powerLevel: 5 },
      { id: 14, name: 'Celeritas', powerLevel: 10 },
      { id: 15, name: 'Magneta', powerLevel: 10 },
      { id: 16, name: 'RubberMan', powerLevel: 8 },
      { id: 17, name: 'Dynama', powerLevel: 2 },
      { id: 18, name: 'Dr IQ', powerLevel: 6 },
      { id: 19, name: 'Magma', powerLevel: 10 },
      { id: 20, name: 'Tornado', powerLevel: 10 }
    ];
    return {heroes};
  }
}