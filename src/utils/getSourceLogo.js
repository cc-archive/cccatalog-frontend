import ImageSourceService from '@/api/ImageSourceService';

export default function getSourceLogo(sourceName) {
  const source = ImageSourceService.getSourceInfo(sourceName);
  if (source) {
    const logo = source.logo;
    const logoUrl = require(`@/assets/${logo}`); // eslint-disable-line global-require, import/no-dynamic-require

    return logoUrl;
  }

  return '';
}
