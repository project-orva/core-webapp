import formFieldHof from './form-field-hof';

describe('form field hof', () => {
  const ep = { type: 'THING', fid: 'test', value: 'example' };
  const red = formFieldHof(['THING']);

  it('should set fid to payload value value if payload type is included in types', () => {
    expect(red(undefined, ep)).toStrictEqual({ [ep.fid]: ep.value });
  });
  it('should use default state if type does not exists', () => {
    const f = { type: 'NOT_THING' };
    expect(red(undefined, f)).toEqual({});
  });
});
