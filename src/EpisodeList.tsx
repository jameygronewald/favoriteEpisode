import React from "react";
import { IEpisode } from "./interfaces";

const EpisodeList = (props: any): JSX.Element[] => {
  const { episodes, toggleFavoriteAction, favorites } = props;

  return episodes.map((episode: IEpisode) => {
    return (
      <section className="episodeBox" key={episode.id}>
        <img src={episode.image.medium} alt={`Seinfeld: ${episode.name}`} />
        <div>{episode.name}</div>
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            Season: {episode.season} Number: {episode.number}
          </div>
          <button type="button" onClick={() => toggleFavoriteAction(episode)}>
            {favorites.includes(episode) ? "Remove" : "Favorite"}
          </button>
        </section>
      </section>
    );
  });
};

export default EpisodeList;
