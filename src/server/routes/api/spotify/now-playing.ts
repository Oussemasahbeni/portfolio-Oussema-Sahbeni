import { defineEventHandler } from 'h3';
import { SpotifyNowPlayingResponse, SpotifyTokenResponse } from '../../../../app/models/spotify';

const SPOTIFY_CLIENT_ID = process.env['SPOTIFY_CLIENT_ID'];
const SPOTIFY_CLIENT_SECRET = process.env['SPOTIFY_CLIENT_SECRET'];
const SPOTIFY_REFRESH_TOKEN = process.env['SPOTIFY_REFRESH_TOKEN'];

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function getAccessToken(): Promise<SpotifyTokenResponse> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error('Spotify credentials not configured');
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Spotify token error: ${data.error} - ${data.error_description}`);
  }

  return data as SpotifyTokenResponse;
}
async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const song = (await response.json()) as SpotifyNowPlayingResponse;

  if (!song.is_playing) {
    return { isPlaying: false };
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((artist) => artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0]?.url;
  const songUrl = song.item.external_urls.spotify;

  return {
    isPlaying,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
  };
}

export default defineEventHandler(async () => {
  try {
    const nowPlaying = await getNowPlaying();
    return nowPlaying;
  } catch (error) {
    console.error('Error fetching now playing:', error);
    return { isPlaying: false };
  }
});
