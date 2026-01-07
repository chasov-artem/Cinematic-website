import { useEffect, useState, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import styles from "./VideoModal.module.css";

function VideoModal({ isOpen, onClose, story }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const prevStoryIdRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const video = videoRef.current;
    return () => {
      document.body.style.overflow = "";
      // Reset video state when modal closes
      setIsPlaying(false);
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [isOpen]);

  // Reset video when story changes
  useEffect(() => {
    if (!isOpen || !story) {
      prevStoryIdRef.current = story?.id || null;
      return;
    }

    // Only reset if story id actually changed
    if (prevStoryIdRef.current !== story.id) {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      prevStoryIdRef.current = story.id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, story?.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [isPlaying]);

  if (!isOpen || !story) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    setIsPlaying(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError" && error.name !== "NotAllowedError") {
            console.error("Error playing video:", error);
          }
        });
      }
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      // Reset video to beginning when paused
      video.currentTime = 0;
    } else {
      video.play();
    }
  };

  const handleVolumeClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * duration;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        {/* Border frame */}
        <div className={styles.modalBorder}></div>

        {/* Green corner accents */}
        <div
          className={`${styles.cornerAccent} ${styles.cornerAccentTopLeft}`}
        ></div>
        <div
          className={`${styles.cornerAccent} ${styles.cornerAccentTopRight}`}
        ></div>
        <div
          className={`${styles.cornerAccent} ${styles.cornerAccentBottomLeft}`}
        ></div>
        <div
          className={`${styles.cornerAccent} ${styles.cornerAccentBottomRight}`}
        ></div>

        {/* Top right - Close button */}
        <button
          className={styles.modalCloseButton}
          onMouseDown={(e) => {
            // Запобігаємо автоматичному кліку при відкритті модального вікна
            const timeSinceModalOpen =
              Date.now() - (window.__modalOpenTime || 0);
            if (timeSinceModalOpen < 100) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          <span className={styles.closeText}>
            <IoIosClose className={styles.closeX} />
            <span className={styles.closeWord}>CLOSE</span>
            <span className={styles.closeLineLeft}></span>
            <span className={styles.closeLineRight}></span>
          </span>
        </button>

        {/* Center content frame */}
        <div className={styles.contentFrame}>
          <div
            className={styles.imageContainer}
            onClick={!isPlaying ? handlePlayClick : undefined}
          >
            {!isPlaying ? (
              <img
                src={story.image}
                alt={story.name}
                className={styles.storyImage}
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  className={styles.storyVideo}
                  src={
                    story.videoSrc ||
                    "https://wakanda-forever-master.dogstudio-dev.co/zerolimits/assets/videos/hannah.webm"
                  }
                  autoPlay
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                  onClick={handlePlayPause}
                  volume={volume}
                  muted={isMuted}
                />
                {/* Custom Video Controls */}
                <div className={styles.videoControlsContainer}>
                  {/* Play/Pause Button */}
                  <button
                    className={styles.playPauseButton}
                    onClick={handlePlayPause}
                  >
                    <img
                      src="/octagon-frame.svg"
                      alt="Octagon frame"
                      className={styles.octagonButtonFrame}
                    />
                    {isPlaying ? (
                      <svg
                        className={styles.octagonButtonIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg
                        className={styles.octagonButtonIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Progress Bar Wrapper */}
                  <div className={styles.progressBarWrapper}>
                    {/* Progress Bar */}
                    <div
                      ref={progressBarRef}
                      className={styles.progressBarContainer}
                      onClick={handleProgressClick}
                    >
                      <div
                        className={styles.progressBarFill}
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      ></div>
                    </div>
                    {/* Time Display - Under progress bar, right */}
                    <span className={styles.timeDisplay}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Volume and Fullscreen Controls - Side by Side */}
                  <div className={styles.rightControlsWrapper}>
                    {/* Volume Button - Mute/Unmute only */}
                    <button
                      className={styles.volumeButton}
                      onClick={handleVolumeClick}
                    >
                      <img
                        src="/octagon-frame.svg"
                        alt="Octagon frame"
                        className={styles.octagonButtonFrame}
                      />
                      {isMuted || volume === 0 ? (
                        <svg
                          className={styles.octagonButtonIcon}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      ) : (
                        <svg
                          className={styles.octagonButtonIcon}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      )}
                    </button>

                    {/* Fullscreen Button */}
                    <button
                      className={styles.fullscreenButton}
                      onClick={handleFullscreen}
                    >
                      <img
                        src="/octagon-frame.svg"
                        alt="Octagon frame"
                        className={styles.octagonButtonFrame}
                      />
                      <svg
                        className={styles.octagonButtonIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Play button overlay - only show when not playing */}
            {!isPlaying && (
              <div className={styles.playButtonOverlay}>
                <div className={styles.playButtonContainer}>
                  {/* Additional octagon frames - outer layers */}
                  <img
                    src="/octagon-frame.svg"
                    alt="Octagon frame outer 1"
                    className={styles.octagonFrameOuter1}
                  />
                  <img
                    src="/octagon-frame.svg"
                    alt="Octagon frame outer 2"
                    className={styles.octagonFrameOuter2}
                  />
                  <img
                    src="/octagon-frame.svg"
                    alt="Octagon frame outer 3"
                    className={styles.octagonFrameOuter3}
                  />
                  {/* Main octagon frame - white */}
                  <svg
                    className={styles.octagonFrame}
                    width="90"
                    height="90"
                    viewBox="0 0 218 218"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M107.278 216.745L34.0301 186.405C32.9275 185.949 32.0515 185.072 31.5947 183.97L1.2545 110.722C0.797769 109.619 0.79777 108.381 1.2545 107.278L31.5947 34.0301C32.0515 32.9275 32.9275 32.0515 34.0301 31.5947L107.278 1.25451C108.381 0.797781 109.619 0.797781 110.722 1.25451L183.97 31.5948C185.073 32.0515 185.949 32.9275 186.405 34.0301L216.746 107.278C217.202 108.381 217.202 109.619 216.746 110.722L186.405 183.97C185.949 185.073 185.073 185.949 183.97 186.405L110.722 216.745C109.619 217.202 108.381 217.202 107.278 216.745Z"
                      stroke="white"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* Hover octagon - green filled */}
                  <svg
                    className={styles.octagonHover}
                    width="120"
                    height="120"
                    viewBox="0 0 218 218"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M107.278 216.745L34.0301 186.405C32.9275 185.949 32.0515 185.072 31.5947 183.97L1.2545 110.722C0.797769 109.619 0.79777 108.381 1.2545 107.278L31.5947 34.0301C32.0515 32.9275 32.9275 32.0515 34.0301 31.5947L107.278 1.25451C108.381 0.797781 109.619 0.797781 110.722 1.25451L183.97 31.5948C185.073 32.0515 185.949 32.9275 186.405 34.0301L216.746 107.278C217.202 108.381 217.202 109.619 216.746 110.722L186.405 183.97C185.949 185.073 185.073 185.949 183.97 186.405L110.722 216.745C109.619 217.202 108.381 217.202 107.278 216.745Z"
                      fill="#99ff88"
                      stroke="white"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <button
                    className={styles.playButton}
                    onClick={handlePlayClick}
                  >
                    <svg
                      className={styles.playIcon}
                      width="13"
                      height="17"
                      viewBox="0 0 24 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className={styles.playIconPath}
                        d="M0 0L24 14L0 28V0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Text overlay - bottom left - hidden when video is playing */}
            {!isPlaying && (
              <div className={styles.textOverlay}>
                <div className={styles.nameContainer}>
                  <div className={styles.firstName}>{story.firstName}</div>
                  <div className={styles.lastName}>{story.lastName}</div>
                </div>
                <div className={styles.role}>{story.role}</div>
                <div className={styles.quote}>{story.quote}</div>
                <div className={styles.diagonalLine}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
