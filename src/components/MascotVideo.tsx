import React, { useRef, useState, useEffect } from 'react';
import { Mascot } from '../config/mascots';
import styles from './MascotVideo.module.css';

interface MascotVideoProps {
  mascot: Mascot;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onVideoEnd?: () => void;
  onVideoError?: (error: string) => void;
}

const MascotVideo: React.FC<MascotVideoProps> = ({
  mascot,
  autoPlay = false,
  loop = false,
  muted = false,
  onVideoEnd,
  onVideoError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onVideoEnd?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      const errorMsg = `Failed to load video for ${mascot.displayName}. Please ensure the video file exists at ${mascot.videoFile}`;
      setErrorMessage(errorMsg);
      onVideoError?.(errorMsg);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [mascot, onVideoEnd, onVideoError]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((error) => {
        console.error('Error playing video:', error);
        setHasError(true);
        setErrorMessage('Unable to play video. Please try again.');
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(console.error);
  };

  return (
    <div className={styles.videoContainer}>
      <div className={styles.mascotInfo}>
        <h3 className={styles.mascotName}>{mascot.displayName}</h3>
        <p className={styles.mascotDescription}>{mascot.description}</p>
      </div>

      <div className={styles.videoWrapper}>
        {isLoading && !hasError && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
            <p>Loading {mascot.displayName}...</p>
          </div>
        )}

        {hasError ? (
          <div className={styles.errorOverlay}>
            <div className={styles.errorIcon}>!</div>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <p className={styles.errorHint}>
              Add your video file to: <code>{mascot.videoFile}</code>
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline
            poster={mascot.thumbnailFile}
          >
            <source src={mascot.videoFile} type="video/mp4" />
            <source src={mascot.videoFile.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {!hasError && !isLoading && (
          <div className={styles.controls}>
            <button
              className={styles.playButton}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>

            <div className={styles.progressContainer}>
              <span className={styles.time}>{formatTime(currentTime)}</span>
              <input
                type="range"
                className={styles.progressBar}
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Video progress"
              />
              <span className={styles.time}>{formatTime(duration)}</span>
            </div>

            <button
              className={styles.restartButton}
              onClick={restartVideo}
              aria-label="Restart video"
            >
              ↺
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MascotVideo;
