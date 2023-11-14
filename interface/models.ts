type ImageQuality = '50x50' | '150x150' | '500x500';

type SongQuality = '12kbps' | '48kbps' | '96kbps' | '160kbps' | '320kbps';

export interface Song {
   id: string;
   name: string;
   album: {
      id: string;
      name: string;
      url: string;
   };
   year: string;
   releaseDate: string;
   duration: string;
   label: string;
   primaryArtists: string;
   primaryArtistsId: string;
   featuredArtists: string;
   featuredArtistsId: string;
   explicitContent: number;
   playCount: number;
   language: string;
   hasLyrics: 'true' | 'false';
   url: string;
   copyright: string;
   image: { quality: ImageQuality; link: string }[];
   downloadUrl: { quality: SongQuality; link: string }[];
}

export interface MinimalArtist {
   id: string;
   name: string;
   url: string;
   role: string;
   type?: string;
   image?: { quality: ImageQuality; link: string }[];
   isRadioPresent?: boolean;
}

export interface Album {
   id: string;
   name: string;
   year: string;
   releaseDate: string;
   songCount: string;
   url: string;
   primaryArtistsId: string;
   primaryArtists: MinimalArtist[] | string;
   featuredArtists: MinimalArtist[];
   artists: MinimalArtist[];
   image: { quality: ImageQuality; link: string }[];
   songs: Song[];
}

export interface Artist {
   id: string;
   name: string;
   url: string;
   image: { quality: ImageQuality; link: string }[];
   followerCount: string;
   fanCount: string;
   isVerified: boolean;
   dominantLanguage: string;
   dominantType: string;
   bio: string[];
   dob: string;
   fb: string;
   twitter: string;
   wiki: string;
   availableLanguages: string[];
   isRadioPresent: boolean;
}

export interface Playlist {
   id: string;
   userId: string;
   name: string;
   followerCount: string;
   songCount: string;
   fanCount: string;
   username: string;
   firstname: string;
   lastname: string;
   shares: string;
   image: { quality: ImageQuality; link: string }[];
   url: string;
   songs: Song[];
}

export interface TopQuery {
   id: string;
   title: string;
   image: { quality: ImageQuality; link: string }[];
   url: string;
   type: string;
   description: string;
   position: number;
}
