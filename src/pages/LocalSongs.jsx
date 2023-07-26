import React, { useState } from "react";
import { Error, Loader, TopChartCard } from "../components";
import {
  useAddSongMutation,
  useGetUploadedSongsQuery,
} from "../redux/services/uploadSongs";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { AiOutlineCloudUpload } from "react-icons/ai";

const LocalSongs = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetUploadedSongsQuery();
  const [addSong] = useAddSongMutation();
  const [selectedFile, setSelectedFile] = useState();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("song", selectedFile);
    addSong(formData);
    setSelectedFile();
  };
  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;
  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Uploaded Songs</h2>
          <form
            onSubmit={selectedFile ? handleSubmit : (e) => e.preventDefault()}
          >
            <input
              onChange={(e) => setSelectedFile(e.target.files[0])}
              type="file"
              id="actual-btn"
              hidden={true}
              accept="audio/*"
            />
            <label
              className="text-white cursor-pointer p-4"
              htmlFor="actual-btn"
            >
              {selectedFile ? selectedFile?.name : "Choose File"}
            </label>

            <button className="outline-none border cursor-pointer p-3 rounded-full text-white font-semibold text-base">
              <AiOutlineCloudUpload size={20} />
            </button>
          </form>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {data?.tracks?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalSongs;
