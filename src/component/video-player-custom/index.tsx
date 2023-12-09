import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { ControlPlayer } from '../control-player';
import './index.scss';
import { useAppDispatch } from '../../redux/hook';
import { VideoWatching, setDataVideoWatching } from '../../redux/videoSlice';
import screenfull from 'screenfull';

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

    const dispatch = useAppDispatch();

    return (
        <div ref={containerRef}>
            <div className="player">
                <ReactPlayer
                    ref={playerRef}
                    url={
                        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    }
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
            />
        </div>
    );
};
