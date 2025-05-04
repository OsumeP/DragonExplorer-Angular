import { PlanetModel } from './planet-model';

describe('PlanetModel', () => {
  it('should create an instance', () => {
    expect(new PlanetModel(-1,'',false,'','')).toBeTruthy();
  });
});
