import { Event } from './GoogleAnalytics';

export function CopyAttribution(text) {
  return new Event('Attribution', 'Copy', text);
}

export function EmbedAttribution() {
  return new Event('Attribution', 'Embed HTML');
}

export function SocialMediaShare(site) {
  return new Event('Social Media', 'Share', site);
}
