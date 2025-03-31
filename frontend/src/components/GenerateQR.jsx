import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";

const GenerateQR = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

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

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="pattern flex h-fit w-full max-w-sm flex-col items-center gap-4 rounded-md border border-zinc-200 p-4 shadow-md">
        <div className="flex w-full flex-col gap-2 rounded-md border border-zinc-200 bg-white p-6 shadow-xs">
          <QRCodeSVG
            value={student?.id || "Loading..."}
            size={200}
            className="h-full w-full rounded-md bg-white p-10"
          />
          <h1 className="text-center text-xl font-medium">
            Student Credential
          </h1>
          {student ? (
            <div className="flex w-full gap-4 bg-white">
              <div>
                <h1>Email:</h1>
                <h1>Phone:</h1>
                <h1>Username:</h1>
              </div>
              <div>
                <h1>{student?.email}</h1>
                <h1>{student?.phone}</h1>
                <h1>{student?.regNo}</h1>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>

      <button className="cursor-pointer rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-100">
        Download
      </button>
    </div>
  );
};

export default GenerateQR;
