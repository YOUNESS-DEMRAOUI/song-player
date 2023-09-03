import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { Error, Loader, SongCard } from "../components";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  if (isFetching) return <Loader title={"Searching for songs..."} />;

  if (error) return <Error />;

  const songs = data?.tracks?.hits?.map((song) => song.track) || [];
  const artists = data?.artists?.hits?.map((artist) => artist.artist) || [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artists.length > 0 &&
          artists.map(
            (artist) =>
              artist?.avatar && (
                <div
                  className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
                  onClick={() => navigate(`/artists/${artist.adamid}`)}
                  key={artist.adamid}
                >
                  <img
                    src={artist.avatar}
                    alt="artist"
                    className="w-full h-56 rounded-lg"
                  />
                  <p className="mt-4 font-semibold text-lg text-white truncate">
                    {artist.name}
                  </p>
                </div>
              )
          )}
        {songs.length > 0 &&
          songs.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data.tracks.hits}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
