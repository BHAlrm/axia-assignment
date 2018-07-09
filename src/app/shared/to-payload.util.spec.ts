import {toPayload} from './to-payload.util';

describe('toPayload', () => {

  it('should be no problem for object with payload', () => {
    expect(toPayload({payload: 'test'})).toBe('test');
  });

});
