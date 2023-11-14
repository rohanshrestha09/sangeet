import { Song } from '@/interface/models';

export const SAAVN_API_URL = 'https://saavn.me/';

export const TEST_SOUND = {
   id: '5WXAlMNt',
   name: 'Thunderclouds',
   album: {
      id: '13615087',
      name: 'Thunderclouds',
      url: 'https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_',
   },
   year: '2018',
   releaseDate: '2018-08-09',
   duration: '187',
   label: 'Records/Columbia',
   primaryArtists: 'Lsd',
   primaryArtistsId: '1153577',
   featuredArtists: 'Sia, Diplo, Labrinth, Sia, Diplo, And Labrinth',
   featuredArtistsId: '568707, 599061, 577223, 4799650',
   explicitContent: 0,
   playCount: 8822136,
   language: 'english',
   hasLyrics: 'false',
   url: 'https://www.jiosaavn.com/song/thunderclouds/RT8zcBh9eUc',
   copyright: '(P) 2018 RECORDS, LLC / Columbia',
   image: [
      {
         quality: '50x50',
         link: 'https://c.saavncdn.com/679/Thunderclouds-English-2018-20180809032729-50x50.jpg',
      },
      {
         quality: '150x150',
         link: 'https://c.saavncdn.com/679/Thunderclouds-English-2018-20180809032729-150x150.jpg',
      },
      {
         quality: '500x500',
         link: 'https://c.saavncdn.com/679/Thunderclouds-English-2018-20180809032729-500x500.jpg',
      },
   ],
   downloadUrl: [
      {
         quality: '12kbps',
         link: 'https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_12.mp4',
      },
      {
         quality: '48kbps',
         link: 'https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_48.mp4',
      },
      {
         quality: '96kbps',
         link: 'https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_96.mp4',
      },
      {
         quality: '160kbps',
         link: 'https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_160.mp4',
      },
      {
         quality: '320kbps',
         link: 'https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_320.mp4',
      },
   ],
} satisfies Song;
