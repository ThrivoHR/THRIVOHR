"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };
    startCamera();
    const currentVideoRef = videoRef.current;
    return () => {
      if (currentVideoRef?.srcObject) {
        const tracks = (currentVideoRef.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
    // Convert canvas image to data URL and set the captured image state
    const dataUrl = canvasRef.current.toDataURL("image/jpeg");
    setCapturedImage(dataUrl);

    canvasRef.current.toBlob(async (blob) => {
      if (blob) {
        try {
          const formData = new FormData();
          formData.append("image", blob, "captured_image.jpg");

          const response = await fetch("YOUR_API_ENDPOINT", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            console.log("Image uploaded successfully");
          } else {
            console.error("Failed to upload image");
          }
        } catch (error) {
          console.error("Error sending the image to the API: ", error);
        }
      }
    }, "image/jpeg");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-xl font-semibold mb-4">Camera</h1>
      <video ref={videoRef} width="320" height="240" autoPlay></video>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      ></canvas>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCapture}
      >
        Capture
      </button>
      {capturedImage && (
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Captured Image</h2>
          <Image src={capturedImage} alt="Captured" width={200} height={200}/>
        </div>
      )}
    </div>
  );
}
