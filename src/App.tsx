import React, { useContext, useEffect } from "react";
import { Store } from "./Store";
import { ActionProps, IEpisode, EpisodeProps } from "./interfaces";
import { Link } from "@reach/router";

const EpisodeList = React.lazy<any>(() => import("./EpisodeList"));

const App = (): JSX.Element => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const URL = `https://api.tvmaze.com/singlesearch/shows?q=seinfeld&embed=episodes`;
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes,
    });
  };

  const toggleFavoriteAction = (episode: IEpisode): ActionProps => {
    const episodeInFav = state.favorites.includes(episode);
    let dispatchObject = {
      type: "ADD_FAV",
      payload: episode,
    };
    if (episodeInFav) {
      const favoriteWithoutEpisode = state.favorites.filter(
        (favorite: IEpisode) => favorite.id !== episode.id
      );
      dispatchObject = {
        type: "REMOVE_FAV",
        payload: favoriteWithoutEpisode,
      };
    }
    return dispatch(dispatchObject);
  };

  const props: EpisodeProps = {
    episodes: state.episodes,
    toggleFavoriteAction,
    favorites: state.favorites,
  };

  return (
    <>
      <header className="header">
        <div>
          <h1>Seinfeld</h1>
          <p>What are your favorite episodes?</p>
        </div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/faves'>Favorites: {state.favorites.length}</Link>
        </div>
      </header>
      <React.Suspense fallback={<div>loading...</div>}>
        <section className="episodeLayout">
          <EpisodeList {...props} />
        </section>
      </React.Suspense>
    </>
  );
};

export default App;
