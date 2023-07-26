import React from "react";
import { Link } from "react-router-dom";

const Track = ({ isPlaying, isActive, activeSong }) => {
  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={activeSong?.images?.coverart}
          alt="cover art"
          className="rounded-full"
        />
      </div>
      <div className="w-[50%]">
        <p className="truncate max-w-[350px] text-white font-bold text-lg">
          {activeSong?.subtitle ? (
            <Link to={`/songs/${activeSong?.key}`}>{activeSong?.title}</Link>
          ) : (
            activeSong?.title
          )}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.subtitle ? (
            <Link to={`/artists/${activeSong?.artists[0].adamid}`}>
              {activeSong?.subtitle}
            </Link>
          ) : (
            "Unknown"
          )}
        </p>
      </div>
    </div>
  );
};

export default Track;
