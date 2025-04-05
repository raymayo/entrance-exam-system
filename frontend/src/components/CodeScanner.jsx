import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner"; // Correct the import

const CodeScanner = () => {
  const [qrCode, setQRCode] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQRCode(data.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <h1>Scan QR Code</h1>
      <Scanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment" // Use the back camera
      />
      {qrCode && <p>QR Code Data: {qrCode}</p>}
    </div>
  );
};

export default CodeScanner;
