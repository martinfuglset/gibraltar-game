"use client";  // Add this as required

import React, { useState, useEffect } from 'react';
import NotFound from '@/app/components/not-found';
import { useParams } from 'next/navigation';
import Spinner from '@/app/components/spinner';
import QRCode from 'qrcode';


export default function SessionPage() {
  const { id } = useParams();

  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState(null);
  const [src, setSrc] = useState('');
  
  useEffect(() => {
    fetch(`/api/get-game?id=${id}`)
      .then(response => {
        if (response.status === 404) {
          setNotFound(true);
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          setData(data);
        }
      })
      .catch(error => {
        console.error('Error fetching the game:', error);
        // Handle the error appropriately
      });

      // get the domain from the request, including the protocol
      const domain = window.location.origin;
      QRCode.toDataURL(`${domain}/session/${id}`, { width: 800 })
        .then(url => setSrc(url))
        .catch(err => console.error(err));
  }, [id]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      { src && <img src={src} alt="QR Code" /> }
    </div>
  );
}
