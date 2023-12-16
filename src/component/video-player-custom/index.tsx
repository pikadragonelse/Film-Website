import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { ControlPlayer } from '../control-player';
import './index.scss';
import { useAppDispatch } from '../../redux/hook';
import { VideoWatching, setDataVideoWatching } from '../../redux/videoSlice';
import screenfull from 'screenfull';
import { CaretRightOutlined } from '@ant-design/icons';

export interface VideoState {
    playing: boolean;
    muted: boolean;
    volume: number;
    played: number;
    seeking: boolean;
    buffer: boolean;
    loadedSeconds: number;
    playedSeconds: number;
}

export type VideoPlayerCustom = { sourceUrl?: string; posterUrl?: string };
export const VideoPlayerCustom = ({ sourceUrl, posterUrl }: VideoPlayerCustom) => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isShowControl, setIsShowControl] = useState(false);

    const [videoState, setVideoState] = useState<VideoState>({
        playing: true,
        muted: false,
        volume: 0.5,
        played: 0,
        loadedSeconds: 0,
        playedSeconds: 0,
        seeking: false,
        buffer: true,
    });

    const { playing, muted, volume, played, seeking, buffer, loadedSeconds, playedSeconds } =
        videoState;

    const playPauseHandler = () => {
        setVideoState({ ...videoState, playing: !videoState.playing });
    };

    const rewindHandler = () => {
        if (playerRef.current != null) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
        }
    };

    const forwardHandler = () => {
        if (playerRef.current != null) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
        }
    };

    const fullscreenHandler = () => {
        if (containerRef.current != null) {
            screenfull.toggle(containerRef.current);
            setIsFullscreen((prev) => !prev);
        }
    };

    const handleVolumeChange = (value: number) => {
        setVideoState({ ...videoState, volume: value });
    };

    const handleMouseOverPlayer = () => {
        if (isShowControl !== true) {
            setIsShowControl(true);
        }
    };

    const handleMouseMove = () => {
        setIsShowControl(true);
        const timeout = setTimeout(() => {
            if (isShowControl) {
                setIsShowControl(false);
                // Your logic for when the mouse stops moving
            }
        }, 250); // Adjust the timeout duration as needed
        return () => clearTimeout(timeout);
    };

    const handleMouseOutPlayer = () => {
        const timer = setTimeout(() => {
            setIsShowControl(false);
        }, 3000);
        return () => clearTimeout(timer);
    };

    const dispatch = useAppDispatch();

    return (
        <div
            ref={containerRef}
            onMouseLeave={handleMouseOutPlayer}
            onMouseOver={handleMouseOverPlayer}
        >
            <div
                className="player relative flex items-center justify-center"
                onClick={() => playPauseHandler()}
            >
                <ReactPlayer
                    ref={playerRef}
                    url={sourceUrl}
                    poster={posterUrl}
                    playing={playing}
                    onProgress={(props) => {
                        const data: VideoWatching = {
                            loadedSeconds: props.loadedSeconds,
                            played: props.played * 100,
                            playedSeconds: props.playedSeconds,
                        };
                        dispatch(setDataVideoWatching(data));
                    }}
                    className="watching-player"
                    width="100%"
                    height="100%"
                    onEnded={playPauseHandler}
                    volume={volume}
                />
                <CaretRightOutlined
                    className="text-5xl absolute m-auto cursor-pointer bg-black/[.5] rounded-full p-3"
                    hidden={playing}
                />
                <div className="absolute bottom-0 h-3 w-full bottom-box-shadow"></div>
            </div>
            <ControlPlayer
                onPlayPause={playPauseHandler}
                isPlaying={playing}
                isMuted={muted}
                videoState={{
                    played: played,
                    loadedSeconds: loadedSeconds,
                    playedSeconds: playedSeconds,
                }}
                rewindHandle={rewindHandler}
                forwardHandle={forwardHandler}
                videoRef={playerRef}
                fullscreenHandler={fullscreenHandler}
                isFullscreen={isFullscreen}
                handleVolumeChange={handleVolumeChange}
                valueVolume={volume}
                hidden={!isShowControl}
            />
        </div>
    );
};
