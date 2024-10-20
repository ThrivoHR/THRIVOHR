"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import apiFaceRequest from "@/apiRequest/face"; // Import the API request module
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [employeeCode, setEmployeeCode] = useState<string>("");

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
    if (!videoRef.current || !canvasRef.current || !employeeCode) {
      toast.error("Please enter an employee code and ensure camera access.");
      return;
    }
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
          formData.append("employeeCode", employeeCode); // Add employee code

          // Send the image to the Face API endpoint
          await sendToFaceApi(formData);
          
          // Optionally, you can also call DetectImage API
          await sendToDetectImageApi(formData);

        } catch (error) {
          console.error("Error sending the image to the API: ", error);
          toast.error("Failed to send the image to the API.");
        }
      }
    }, "image/jpeg");
  };

  const sendToFaceApi = async (formData: FormData) => {
    try {
      const response = await apiFaceRequest.Face(formData);
      if (response.payload) {
        toast.success("Image successfully sent to Face API.");
        console.log("Face API response:", response.payload);
      } else {
        toast.error("Face API did not return a valid response.");
      }
    } catch (error) {
      console.error("Error sending image to Face API:", error);
      toast.error("Failed to send image to Face API.");
    }
  };

  const sendToDetectImageApi = async (formData: FormData) => {
    try {
      const response = await apiFaceRequest.DetectImage(formData);
      if (response) {
        toast.success("Image successfully sent to Detect Image API.");
        console.log("Detect Image API response:", response);
      } else {
        toast.error("Detect Image API did not return a valid response.");
      }
    } catch (error) {
      console.error("Error sending image to Detect Image API:", error);
      toast.error("Failed to send image to Detect Image API.");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-xl font-semibold mb-4">Camera</h1>
      <Input
        type="text"
        placeholder="Enter Employee Code"
        value={employeeCode}
        onChange={(e) => setEmployeeCode(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <video
        ref={videoRef}
        width="320"
        height="240"
        autoPlay
        style={{ transform: "scaleX(-1)" }}
      ></video>
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
          <Image
            src={capturedImage}
            alt="Captured"
            width={200}
            height={200}
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      )}
    </div>
  );
}
