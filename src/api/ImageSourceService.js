
import ApiService from './ApiService';

const ImageSourceService = {
  /**
   * Implements an endpoint to get image source statistics.
   * SSR-called
  */
  getSourceStats() {
    return ApiService.get('statistics', 'image');
  },
  getSourceInfo(sourceName) {
    const SOURCE_NAME_LOOKUP = {
      animaldiversity: {
        logo: 'animaldiversity_logo.png',
      },
      behance: {
        logo: 'behance_logo.svg',
      },
      brooklynmuseum: {
        logo: 'brooklyn_museum_logo.png',
      },
      CAPL: {
        logo: 'capl_logo.png',
      },
      clevelandmuseum: {
        logo: 'cleveland.png',
      },
      deviantart: {
        logo: 'deviantart_logo.png',
      },
      digitaltmuseum: {
        logo: 'digitaltmuseum_logo.png',
      },
      flickr: {
        logo: 'flickr_icon.png',
      },
      floraon: {
        logo: 'floraon_logo.png',
      },
      geographorguk: {
        logo: 'geographorguk_logo.gif',
      },
      mccordmuseum: {
        logo: 'mccordmuseum_logo.png',
      },
      met: {
        logo: 'met_logo.png',
      },
      museumsvictoria: {
        logo: 'museumvictoria_logo.png',
      },
      nhl: {
        logo: 'nhm_logo.png',
      },
      phylopic: {
        logo: 'phylopic_logo.png',
      },
      rawpixel: {
        logo: 'rawpixel_logo.png',
      },
      rijksmuseum: {
        logo: 'rijksmuseum_logo.png',
      },
      sciencemuseum: {
        logo: 'sciencemuseum_logo.svg',
      },
      svgsilh: {
        logo: 'svg-silh_logo.png',
      },
      thingiverse: {
        logo: 'thingiverse_logo.png',
      },
      thorvaldsensmuseum: {
        logo: 'thorvaldsensmuseum_logo.png',
      },
      wikimedia: {
        logo: 'wikimedia_logo.png',
      },
      WoRMS: {
        logo: 'worms_logo.png',
      },
    };

    return SOURCE_NAME_LOOKUP[sourceName];
  },
};

export default ImageSourceService;
