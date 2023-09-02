import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Error, Loader, SongCard } from "../components";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title={"Searching for songs..."} />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((song, i) =>
          song?.artists && song?.hub?.actions ? (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data.tracks}
            />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default TopCharts;
