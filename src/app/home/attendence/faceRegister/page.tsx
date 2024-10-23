"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiFaceRequest from "@/apiRequest/face";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [employeeCode, setEmployeeCode] = useState<string>("");
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);

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

    // Set the canvas size to match the desired image resolution
    canvasRef.current.width = 640;
    canvasRef.current.height = 480;

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
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setCapturedImage(dataUrl);

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        setCapturedBlob(blob);
        // Create FormData and send to Face API
        const formData = new FormData();
        formData.append("image", blob, "captured_image.png");
        sendToFaceApi(formData, employeeCode);
      }
    }, "image/png");
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://owl-touched-slug.ngrok-free.app';

  const sendToFaceApi = async (formData: FormData, employeeCode: string) => {
    try {
      const url = `${apiUrl}/api/v1/face-recognition?employeeCode=${encodeURIComponent(employeeCode)}`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
        credentials: 'include',
        headers: {"Access-Control-Allow-Credentials": "true"}
      });
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      toast.success("Image successfully sent to Face API.");
    } catch (error) {
      console.error("Error sending image to Face API:", error);
      toast(`Error processing request: ${(error as Error).message}`);
    }
  };

  // const sendToDetectImageApi = async () => {
  //   if (!capturedBlob) {
  //     toast.error("No image captured. Please capture an image first.");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("image", capturedBlob, "captured_image.png");
  //   try {
  //     const url = `${process.env.NEXT_PUBLIC_URL}/api/v1/face-recognition/detect`;
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //       mode: 'no-cors',
  //       credentials: 'include',
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server responded with status: ${response.status}`);
  //     }
  //     toast.success(`Image successfully sent to Detect API. Response: ${response}`);
      
  //   } catch (error) {
  //     console.error("Error sending image to Detect Image API:", error);
  //     // console.log("Detect Image API response:", response);
  //     // toast.error(`Error processing request: ${error.message}`);
  //   }
  // };

  // const handleCheckIn = async () => {
  //   if (!capturedBlob || !employeeCode) {
  //     toast.error("Please capture an image and enter an employee code.");
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append("image", capturedBlob, "captured_image.png");
  //   formData.append("IsCheckIn", "true"); // Set IsCheckIn to true for Check-In
  //   await apiFaceRequest.Face(formData);
  // };
  
  // const handleCheckOut = async () => {
  //   if (!capturedBlob || !employeeCode) {
  //     toast.error("Please capture an image and enter an employee code.");
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append("image", capturedBlob, "captured_image.png");
  //   formData.append("IsCheckIn", "false");
  //   await apiFaceRequest.Face(formData);
  // };
  
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
        style={{ display: "none" }}
      ></canvas>
      <div className="mt-4 space-x-4">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCapture}
        >
          Capture
        </Button>
        {/* <Button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={sendToDetectImageApi}
        >
          Detect
        </Button>
        <Button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCheckIn}
          >
            Check In
          </Button>
          <Button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleCheckOut}
          >
            Check Out
          </Button> */}
      </div>
    </div>
  );
}
