/**
 *  All the interfaces
 */

export interface StateProps {
  episodes: Array<IEpisode>;
  favorites: Array<any>;
}

export interface EpisodeProps {
  episodes: IEpisode[];
  toggleFavoriteAction: (episode: IEpisode) => ActionProps;
  favorites: Array<IEpisode>;
}

export interface ActionProps {
  type: string;
  payload: any;
}

export interface IEpisode {
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: { medium: string; original: string };
  name: string;
  number: number;
  runtime: number;
  season: number;
  summary: string;
  url: string;
  _links: { self: {} };
}
