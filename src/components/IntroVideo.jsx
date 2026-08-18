import { useEffect, useRef, useState } from "react";
import "./IntroVideo.css";

function IntroVideo({ onComplete }) {
  const videoRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const finishIntro = () => {
    if (closing) return;

    setClosing(true);

    setTimeout(() => {
      onComplete();
    }, 700);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const video = videoRef.current;

    if (video) {
      video.play().catch(() => {
        // Browser blocked autoplay.
        // User can still continue when video ends.
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`intro-video ${closing ? "intro-video-closing" : ""}`}
    >
      <video
        ref={videoRef}
        className="intro-video-media"
        src="/videos/logo-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finishIntro}
      />

      <div className="intro-video-overlay" />

      <button
        type="button"
        className="intro-skip"
        onClick={finishIntro}
      >
        SKIP INTRO
        <span>↗</span>
      </button>
    </div>
  );
}

export default IntroVideo;