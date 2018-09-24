export function artistsToString(artists) {
  if (artists.length === 1) {
    return `${artists[0].name}`;
  }
  return artists.reduce((res, artist, index) => (
    index === artists.length - 1 ? artist.name : `${artist.name}, `
  ), '');
}
