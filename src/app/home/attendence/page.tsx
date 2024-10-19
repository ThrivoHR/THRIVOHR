'use client';
import Image from 'next/image';
// components/Attendance.tsx
import React, { useRef, useState, useEffect } from 'react';

const Attendance: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [videoWidth, setVideoWidth] = useState(50); // Default width as 50%

  useEffect(() => {
    const startCamera = async () => {
      try {
        console.log('Attempting to start the camera...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          console.log('Camera started successfully.');
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraOn(true);
      } catch (err) {
        console.error('Error accessing the camera: ', err);
        alert('Failed to access the camera. Please ensure your browser has permission and the site is using HTTPS.');
      }
    };

    startCamera();

    return () => {
      console.log('Cleaning up camera resources...');
      if (videoRef.current && videoRef.current.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => {
          console.log('Stopping camera track:', track);
          track.stop();
        });
      }
    };
  }, []);

  // Capture the current frame from the video
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      if (context) {
        console.log('Capturing the current frame...');
        // Set canvas size equal to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL('image/png');
        console.log('Captured image:', image);
        setCapturedImage(image);
      } else {
        console.error('Failed to get canvas context.');
      }
    } else {
      console.error('Video or canvas element is not available.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-center text-2xl font-semibold mb-6">Attendance Camera Capture</h1>
      
      <div className="flex flex-col items-center">
        {isCameraOn ? (
          <>
            <video
              ref={videoRef}
              className="rounded-md shadow-lg transform scale-x-[-1]"
              style={{ width: `${videoWidth}%`, height: 'auto' }}
              autoPlay
              onError={(e) => console.error('Video error:', e)}
            />
            <button
              onClick={captureImage}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Take Picture
            </button>

            {/* Slider to adjust video size */}
            <div className="mt-4 flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Adjust Size:</label>
              <input
                type="range"
                min="10"
                max="100"
                value={videoWidth}
                onChange={(e) => setVideoWidth(Number(e.target.value))}
                className="slider w-40"
              />
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading camera...</p>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
      {capturedImage && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold">Captured Image:</h2>
          <Image
            src={capturedImage}
            alt="Captured"
            className="mt-4 w-auto h-64 object-cover rounded shadow-lg scale-x-[-1]"
            width={200}
            height={200}
            onError={(e) => console.error('Image load error:', e)}
          />
        </div>
      )}
    </div>
  );
};

export default Attendance;
