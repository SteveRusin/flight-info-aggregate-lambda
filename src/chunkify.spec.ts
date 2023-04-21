import { chunkify } from './chunkify';

describe('chunkify', () => {
  it('Should correctly split arr', () => {
    const arr = [1, 2, 3, 4];

    const chuncked = chunkify(arr, 2);

    expect(chuncked.length).toBe(2);
    expect(chuncked[0]).toEqual([1, 2]);
    expect(chuncked[1]).toEqual([3, 4]);
  });
});
