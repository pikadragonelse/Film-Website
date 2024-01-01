import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { ControlPlayer } from '../control-player';
import './index.scss';
import { useAppDispatch } from '../../redux/hook';
import { VideoWatching, setDataVideoWatching } from '../../redux/videoSlice';
import screenfull from 'screenfull';
import { CaretRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { request } from '../../utils/request';
import { useToken } from '../../hooks/useToken';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

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

export type VideoPlayerCustom = {
    sourceUrl?: string;
    posterUrl?: string;
    episodeId?: number | string;
    setSrcVideo?: (props?: any) => void;
};
export const VideoPlayerCustom = ({
    sourceUrl,
    posterUrl,
    episodeId,
    setSrcVideo = () => {},
}: VideoPlayerCustom) => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isShowControl, setIsShowControl] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isMouseStill, setIsMouseStill] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
    const [isLoadingHidden, setIsLoadingHidden] = useState(true);
    const [speedVid, setSpeedVid] = useState(1);

    const [videoState, setVideoState] = useState<VideoState>({
        playing: false,
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

    const { pathname } = useLocation();

    useEffect(() => {
        localStorage.setItem(
            'durationInfo',
            JSON.stringify({ episodeId: episodeId, duration: playedSeconds.toFixed() }),
        );
    }, [playedSeconds, pathname]);

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            localStorage.setItem(
                'durationInfo',
                JSON.stringify({ episodeId: episodeId, duration: playedSeconds.toFixed() }),
            );
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        // window.addEventListener('popstate', handleBeforeUnload);

        return () => {
            // Clean up event listeners when the component unmounts
            window.addEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

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

    // const handleMouseOverPlayer = () => {
    //     setIsShowControl(true);
    // };

    // const handleMouseOutPlayer = () => {
    //     const timer = setTimeout(() => {
    //         setIsShowControl(false);
    //     }, 3000);
    //     return () => clearTimeout(timer);
    // };

    const handleMouseEnter = () => {
        setIsShowControl(true);
        setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        setIsShowControl(false);
        setIsMouseStill(false);
        setIsMouseOver(false);
    };

    const handleMouseMove = (event: any) => {
        const currentPosition = { x: event.clientX, y: event.clientY };
        console.log(currentPosition, lastMousePosition);

        let timer: NodeJS.Timeout;
        if (isMouseStill === true) {
            timer = setTimeout(() => {
                setIsShowControl(false);
            }, 3000);
        }

        if (
            currentPosition.x !== lastMousePosition.x ||
            currentPosition.y !== lastMousePosition.y
        ) {
            setIsMouseStill(true);
        } else {
            setIsMouseStill(false);
        }

        if (isMouseOver) {
            // Check for movement

            setLastMousePosition(currentPosition);
        }
        return () => {
            clearTimeout(timer);
        };
    };

    const dispatch = useAppDispatch();

    return (
        <div
            ref={containerRef}
            // onMouseLeave={handleMouseOutPlayer}
            // onMouseOver={handleMouseOverPlayer}
            onMouseOver={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div className="player flex " onClick={() => playPauseHandler()}>
                <ReactPlayer
                    ref={playerRef}
                    url={sourceUrl}
                    poster={posterUrl}
                    playing={playing}
                    onProgress={(props) => {
                        const data: VideoWatching = {
                            episodeId: episodeId,
                            loadedSeconds: props.loadedSeconds,
                            played: props.played * 100,
                            playedSeconds: props.playedSeconds,
                        };
                        setVideoState({
                            ...videoState,
                            playedSeconds: props.playedSeconds,
                            played: props.played,
                        });
                        dispatch(setDataVideoWatching(data));
                    }}
                    className="watching-player"
                    width="100%"
                    height="100%"
                    onEnded={playPauseHandler}
                    volume={volume}
                    playbackRate={speedVid}
                />
                <CaretRightOutlined
                    className="text-5xl absolute cursor-pointer bg-black/[.5] rounded-full p-3 top-[40%] left-[48%] z-10"
                    hidden={playing || !isLoadingHidden}
                />
                <LoadingOutlined
                    className="text-5xl absolute top-[40%] left-[48%] z-10 bg-black/[.5] rounded-full p-3"
                    hidden={isLoadingHidden}
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
                setIsLoadingHidden={setIsLoadingHidden}
                setSpeedVid={setSpeedVid}
                setSrcVideo={setSrcVideo}
            />
        </div>
    );
};
