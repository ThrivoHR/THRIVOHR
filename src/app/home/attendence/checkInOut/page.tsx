"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import apiFaceRequest from "@/apiRequest/face";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import LoadingAnimate from "@/components/Loading";
import Image from "next/image";
import none from "/public/nothing-here-.jpg";
import { Eye, EyeOff } from "lucide-react";
import { FaceSchemaType } from "@/schemaValidation/face.schema";

export default function FaceManagement() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [face, setFace] = useState<FaceSchemaType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

  useEffect(() => {
    if (showTable) {
      const fetch = async () => {
        setLoading(true);
        try {
          const data = await apiFaceRequest.getList(pageSize, page);
          setFace(data.payload.value.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setFace([]);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [page, pageSize, showTable]);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    canvasRef.current.width = 640;
    canvasRef.current.height = 480;

    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        setCapturedBlob(blob);
        toast.success("Image captured successfully!");
      }
    }, "image/png");
  };

  const handleCheckIn = async () => {
    if (!capturedBlob) {
      toast.error("No image captured. Please ensure the camera is accessible.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", capturedBlob, "captured_image.png");
    formData.append("IsCheckIn", "true");
  
    try {
      const response = await apiFaceRequest.Face(formData);
      if (response.status == 200)
      toast.success(`${response.payload.value || ''}`);
    } 
    catch (error) {
      console.error("Error during check-in:", error);
      toast.error(`Check-in failed`);
    }
  };
  
  const handleCheckOut = async () => {
    if (!capturedBlob) {
      toast.error("No image captured. Please ensure the camera is accessible.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", capturedBlob, "captured_image.png");
    formData.append("IsCheckIn", "false");
  
    try {
      const response = await apiFaceRequest.Face(formData);
      if (response.status == 200) {
        toast.success(`${response.payload.value || ''}`);
      }
    } catch (error) {
      console.error("Error during check-out:", error);
      toast.error(`Check-out failed`);
    }
  };
  

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  return (
    <div >
      <h1 className="text-xl font-semibold mb-4">Check-in/Check-out</h1>
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
          onClick={captureImage}
        >
          Capture
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
        </Button>
      </div>

      <div className="flex items-center py-3 space-x-2 mt-6">
        <Button variant="secondary" onClick={() => setShowTable(prev => !prev)}>
          {showTable ? (
            <div className="flex items-center">
              <EyeOff size={20} /> &nbsp; Hide Table
            </div>
          ) : (
            <div className="flex items-center">
              <Eye size={20} /> &nbsp; Show Table
            </div>
          )}
        </Button>
      </div>

      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
              {face && face.length > 0 ? (
                <>
                  <DataTable
                    columns={columns()}
                    data={face}
                  />
                  <div className="flex justify-between items-center p-4">
                    <div>
                      <select
                        value={pageSize}
                        onChange={(e) => handleChangePageSize(Number(e.target.value))}
                        className="px-4 py-2 border rounded-lg"
                      >
                        <option value={5}>5 rows</option>
                        <option value={10}>10 rows</option>
                      </select>
                    </div>

                    <div>
                      <button
                        onClick={() => handleChangePage(Math.max(page - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-2 border rounded-lg text-sm"
                      >
                        Previous
                      </button>
                      <span className="mx-4">Page {page}</span>
                      <button
                        onClick={() => handleChangePage(page + 1)}
                        className="px-4 py-2 border rounded-lg text-sm"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>No career history found.</div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <Image src={none} alt="nothing" width={400} height={300} />
          <p>Nothing here, start by pressing Show Table button above</p>
        </div>
      )}
    </div>
  );
}
