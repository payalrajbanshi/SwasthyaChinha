import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ onScan }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250, facingMode: "environment" }, // back camera
      false
    );

    scanner.render(
      (decodedText) => {
        if (decodedText) onScan(decodedText);
      },
      (errorMessage) => console.warn(errorMessage)
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScan]);

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>
      <div id="reader" style={{ width: "100%" }}></div>
      <p className="text-sm text-gray-500 mt-2">
        Point your camera at the prescription QR code
      </p>
    </div>
  );
}

