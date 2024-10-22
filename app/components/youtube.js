import React, { useEffect } from 'react';

export default function YouTubePlayer({ id, onFinished }) {
  useEffect(() => {
    let player;

    const onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player('player', {
        videoId: id,
        playerVars: {
          'controls': 0,
          'autoplay': 1,
          'fs': 0,
          'rel': 0,
          'modestbranding': 1,
          'showinfo': 0,
          'loop': 0,
        },
        events: {
          'onReady': (event) => {
            event.target.playVideo();
          },
          'onStateChange': (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onFinished && onFinished();
            }
          },
        }
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [id, onFinished]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div id="player" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};