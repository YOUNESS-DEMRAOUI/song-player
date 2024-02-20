import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: songError,
  } = useGetSongDetailsQuery({ songid });

  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  if (isFetchingRelatedSongs || isFetchingSongDetails)
    return <Loader title={"Searching song details..."} />;

  if (error || songError) return <Error />;

  return (
    <div className="flex flex-col">
      {songData?.sections?.length > 0 ? (
        <div>
          <DetailsHeader artistId="" songData={songData} data={[]} i={0} />
          <div className="mb-10">
            <h2 className="text-white text-3xl font-bold">Lyrics :</h2>
            <div className="mt-5">
              {songData?.sections[1].type === "LYRICS" ? (
                songData?.sections[1].text.map((line, i) => (
                  <p key={i} className="text-gray-400 text-base my-1">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 text-base my-1">No lyrics found!</p>
              )}
            </div>
          </div>
          <RelatedSongs
            data={
              data?.tracks
                ? data?.tracks.filter((song) => song?.artists)
                : data?.tracks || []
            }
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </div>
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default SongDetails;
