"use client";

import React from 'react';
import YouTubePlayer from '@/app/components/youtube';

const ResultPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
        <YouTubePlayer id="XksTfSdP8F4" className="absolute inset-0" />
    </div>
  );
};

export default ResultPage;
