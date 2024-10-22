"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import YouTubePlayer from '@/app/components/youtube';

const videoFinished = () => {
  // alert('Video finished!');
  // todo set overlay with stats
};

const ResultPage = () => {
  const { result } = useParams();

  let videoId;
  switch (result) {
    case "00":
      videoId = "IqmbXV54J3Q";
      break;
    case "01":
      videoId = "PMN92k_9yY4";
      break;
    case "10":
      videoId = "Es30iGhURfk";
      break;
    case "11":
      videoId = "XksTfSdP8F4";
      break;
  }

  return (
    <div className="h-screen flex items-center justify-center">
        { videoId && <YouTubePlayer id={videoId} className="absolute inset-0" onFinished={videoFinished} /> }
    </div>
  );
};

export default ResultPage;
