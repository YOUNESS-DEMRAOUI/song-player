import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
import { Error, Loader, SongCard } from "../components";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country?.code);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get(
          `https://api.getgeoapi.com/v2/ip/check?api_key=${import.meta.env.VITE_GEO_API_KEY}`
        );
        setCountry(response?.data?.country);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    request();
  }, []);

  if (isFetching && loading) return <Loader title={"Searching for songs..."} />;

  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country?.name}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data.tracks}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
