import decodeData from '@/utils/decodeData';

describe('decodeData', () => {
  it('returns empty string for empty string', () => {
    const data = '';

    expect(decodeData(data)).toEqual('');
  });

  it('returns empty string for undefined data', () => {
    const data = undefined;

    expect(decodeData(data)).toEqual('');
  });

  it('returns decoded ASCII hexacode strings', () => {
    const data = 's\\xe9';

    expect(decodeData(data)).toBe('s\xe9');
  });

  it('returns decoded unicode strings', () => {
    const data = 's\\u1234';

    expect(decodeData(data)).toBe('s\u1234');
  });

  it('returns decoded strings consisting of both unicode and ASCII hexacode characters', () => {
    const data = 's\\u1234\xe9';

    expect(decodeData(data)).toBe('s\u1234\xe9');
  });
});
