import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";

const TopChartCard = ({
  song,
  i,
  activeSong,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="w-full flex animate-slideup flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        {song?.subtitle ? (
          <img
            className="w-20 h-20 rounded-lg"
            src={song?.images?.coverart}
            alt={song?.title}
          />
        ) : (
          <img
            className="w-10 h-10 rounded-lg"
            src={song?.images?.coverart}
            alt={song?.title}
          />
        )}

        <div className="flex-1 flex flex-col justify-center mx-3 w-14">
          {song?.subtitle ? (
            <>
              <Link to={`/songs/${song?.key}`}>
                <p className="text-xl font-bold text-white truncate">{song?.title}</p>
              </Link>
              <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
              </Link>
            </>
          ) : (
            <p className="text-base text-white truncate">{song?.title}</p>
          )}
        </div>
      </div>
      <PlayPause
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export default TopChartCard;
