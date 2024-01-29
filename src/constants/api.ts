export const BASE_URL = 'https://640799f62f01352a8a7faa72.mockapi.io/api/'

export const ARTISTS_URL = 'artists'
export const ONE_ARTIST_URL = (artistId: string | number) => `artists/${artistId}`
export const SONGS_URL = (artistId: string | number) => `artists/${artistId}/songs`
export const ONE_SONG_URL = (artistId: string | number, songId: string | number) => `artists/${artistId}/songs/${songId}`
