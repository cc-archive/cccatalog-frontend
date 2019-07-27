import getParameterByName from '@/utils/getParameterByName';

describe('getParameterByName', () => {
  const queryStr = '?q=nature&source=flickr&li=by&lt=';
  it('finds "q" key', () => {
    expect(getParameterByName('q', queryStr)).toBe('nature');
  });

  it('finds "source" key', () => {
    expect(getParameterByName('source', queryStr)).toBe('flickr');
  });

  it('finds "li" key', () => {
    expect(getParameterByName('li', queryStr)).toBe('by');
  });

  it('finds "lt" to be empty', () => {
    expect(getParameterByName('lt', queryStr)).toBe('');
  });

  it('finds "lt"', () => {
    const query = '?q=landscapes&source=met&li=&lt=commercial';
    expect(getParameterByName('lt', query)).toBe('commercial');
  });
});
