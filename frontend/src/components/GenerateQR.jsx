import React, { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

const GenerateQR = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const qrRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/register/${id}`,
        );
        if (!response.ok) throw new Error("Failed to fetch student data");

        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDownload = () => {
    if (!qrRef.current) return;

    toPng(qrRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `student_qr_${student?.regNo || "unknown"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div
        ref={qrRef}
        className="pattern flex h-fit w-full max-w-sm flex-col items-center gap-4 rounded-md bg-white p-4 shadow-md"
      >
        <div className="flex w-full flex-col gap-2 rounded-md bg-white p-6 shadow-xs">
          <QRCodeSVG
            value={student?.id || "Loading..."}
            className="h-full w-full rounded-md bg-white px-8 pt-8"
          />
          <h1 className="mt-4 text-center text-xl font-medium">
            Student Credential
          </h1>
          {student ? (
            <div className="flex w-full flex-col items-center justify-center gap-4 bg-white p-2 text-center">
              <h1 className="flex w-full flex-col text-xs font-medium text-zinc-500">
                Username
                <span className="text-base font-normal text-zinc-950">
                  {student.regNo}
                </span>
              </h1>
              <h1 className="flex w-full flex-col text-xs font-medium text-zinc-500">
                Password
                <span className="text-base font-normal text-zinc-950">
                  {student.password}
                </span>
              </h1>
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 cursor-pointer rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-100 hover:bg-zinc-700"
      >
        Download as PNG
      </button>
    </div>
  );
};

export default GenerateQR;
