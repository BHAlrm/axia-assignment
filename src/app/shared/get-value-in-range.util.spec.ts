import {getValueInRange} from './get-value-in-range.util';

describe('getValueInRange', () => {

  it('should be noop for numbers in range', () => {
    expect(getValueInRange(5, 10, 0)).toBe(5);
  });

  it('should do corrections in range', () => {
    expect(getValueInRange(11, 10, 0)).toBe(10);
    expect(getValueInRange(-1, 10, 0)).toBe(0);
  });

  it('should take 0 as a default min bound', () => {
    expect(getValueInRange(11, 10)).toBe(10);
    expect(getValueInRange(-1, 10)).toBe(0);
  });

});
