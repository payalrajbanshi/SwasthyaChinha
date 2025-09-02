// import { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" }, // back camera
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText);
//       },
//       (errorMessage) => console.warn(errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>
//       <div id="reader" style={{ width: "100%" }}></div>
//       <p className="text-sm text-gray-500 mt-2">
//         Point your camera at the prescription QR code
//       </p>
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" }, // back camera
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText);
//       },
//       (errorMessage) => console.warn(errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   // ✅ Handle image upload from desktop
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const html5Qr = new Html5Qrcode("reader-temp"); // temp container
//     try {
//       const result = await html5Qr.scanFile(file, true);
//       onScan(result);
//     } catch (err) {
//       console.error("Failed to scan file", err);
//       alert("Could not scan the uploaded image.");
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>

//       {/* Camera Scanner */}
//       <div id="reader" style={{ width: "100%" }}></div>

//       {/* Desktop Upload */}
//       <div className="mt-3">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileUpload}
//           className="border p-2 rounded"
//         />
//         <div id="reader-temp" style={{ display: "none" }}></div>
//       </div>

//       <p className="text-sm text-gray-500 mt-2">
//         Point your camera at the prescription QR code, <br />
//         or upload a QR image from your computer.
//       </p>
//     </div>
//   );
// }
// import { useEffect } from "react";
// import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText);
//       },
//       (errorMessage) => console.warn(errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   // ✅ handle uploaded image
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const html5Qr = new Html5Qrcode("reader-temp"); // temp div for file scanning
//     try {
//       const result = await html5Qr.scanFile(file, true); // pass File object directly
//       onScan(result);
//     } catch (err) {
//       console.error("Failed to scan file", err);
//       alert("Could not scan the uploaded image. Try a clearer screenshot.");
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>
//       <div id="reader" style={{ width: "100%" }}></div>

//       {/* ✅ File upload option */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//       />

//       {/* hidden div for scanning images */}
//       <div id="reader-temp" style={{ display: "none" }}></div>

//       <p className="text-sm text-gray-500 mt-2">
//         Point your camera at the prescription QR code <br /> 
//         or upload a screenshot from your device.
//       </p>
//     </div>
//   );
// }


// import { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import jsQR from "jsqr";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText);
//       },
//       (errorMessage) => console.warn(errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   // ✅ File upload with jsQR
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target.result;

//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0, img.width, img.height);

//         const imageData = ctx.getImageData(0, 0, img.width, img.height);
//         const code = jsQR(imageData.data, img.width, img.height);

//         if (code) {
//           onScan(code.data); // ✅ decoded QR text
//         } else {
//           alert("No QR code found in this image. Try another screenshot.");
//         }
//       };
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>
//       <div id="reader" style={{ width: "100%" }}></div>

//       {/* ✅ File upload option */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//       />

//       <p className="text-sm text-gray-500 mt-2">
//         Point your camera at the prescription QR code <br />
//         or upload a screenshot from your device.
//       </p>
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import jsQR from "jsqr";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText.trim());
//       },
//       (errorMessage) => console.warn(errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   // File upload for QR images
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target.result;

//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0, img.width, img.height);

//         const imageData = ctx.getImageData(0, 0, img.width, img.height);
//         const code = jsQR(imageData.data, img.width, img.height);

//         if (code) {
//           onScan(code.data.trim()); // Trim whitespace
//         } else {
//           alert("No QR code found. Make sure the image is clear.");
//         }
//       };
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>
//       <div id="reader" style={{ width: "100%" }}></div>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//       />

//       <p className="text-sm text-gray-500 mt-2">
//         Point your camera at the prescription QR code <br />
//         or upload a screenshot/image of the QR code.
//       </p>
//     </div>
//   );
// }
// import { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import QrScanner from "qr-scanner";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     // 🔹 Live camera scanner
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText.trim()); // auto-fetch
//       },
//       (errorMessage) => console.warn(errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   // 🔹 File upload QR scan
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     try {
//       const result = await QrScanner.scanImage(file, {
//         returnDetailedScanResult: true,
//       });

//       if (result?.data) {
//         onScan(result.data.trim()); // auto-fetch
//       } else {
//         alert("No QR code detected. Try a clearer image.");
//       }
//     } catch (err) {
//       console.error("QR scan failed:", err);
//       alert("Could not read QR code. Please upload a clearer image.");
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>

//       {/* Camera scanner */}
//       <div id="reader" style={{ width: "100%" }}></div>

//       {/* File Upload */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//       />

//       <p className="text-sm text-gray-500 mt-2">
//         📷 Use camera to scan OR upload a screenshot/photo of the QR code.
//       </p>
//     </div>
//   );
// }
// import { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import QrScanner from "qr-scanner";
// import jsQR from "jsqr";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     // 🔹 Live camera scanner
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText.trim()); // auto-fetch
//       },
//       (errorMessage) => console.warn(errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   // 🔹 File upload with fallback
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // --- 1️⃣ Try qr-scanner ---
//     try {
//       const result = await QrScanner.scanImage(file, {
//         returnDetailedScanResult: true,
//       });

//       if (result?.data) {
//         onScan(result.data.trim()); // success
//         return;
//       }
//     } catch (err) {
//       console.warn("qr-scanner failed:", err.message);
//     }

//     // --- 2️⃣ Fallback to jsQR ---
//     const img = new Image();
//     img.src = URL.createObjectURL(file);

//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       const imageData = ctx.getImageData(0, 0, img.width, img.height);
//       const code = jsQR(imageData.data, img.width, img.height);

//       if (code) {
//         onScan(code.data.trim());
//       } else {
//         alert("❌ No QR code detected. Please upload a clearer image.");
//       }
//     };
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>

//       {/* Camera scanner */}
//       <div id="reader" style={{ width: "100%" }}></div>

//       {/* File Upload */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//       />

//       <p className="text-sm text-gray-500 mt-2">
//         📷 Use camera to scan OR upload a screenshot/photo of the QR code.
//       </p>
//     </div>
//   );
// }
// import { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import QrScanner from "qr-scanner";
// import jsQR from "jsqr";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     // --- Live camera scanner ---
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText.trim());
//       },
//       (errorMessage) => console.warn(errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   // --- Preprocess image: resize + threshold ---
//   const preprocessImage = (img) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     // scale up small images
//     const scale = 2; // double size
//     canvas.width = img.width * scale;
//     canvas.height = img.height * scale;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//     // convert to black & white for better contrast
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;
//     for (let i = 0; i < data.length; i += 4) {
//       const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
//       const val = avg > 128 ? 255 : 0; // threshold
//       data[i] = data[i + 1] = data[i + 2] = val;
//     }
//     ctx.putImageData(imageData, 0, 0);

//     return canvas;
//   };

//   // --- File upload handler ---
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // --- Try qr-scanner first ---
//     try {
//       const result = await QrScanner.scanImage(file, {
//         returnDetailedScanResult: true,
//       });
//       if (result?.data) {
//         onScan(result.data.trim());
//         return;
//       }
//     } catch (err) {
//       console.warn("qr-scanner failed, falling back to jsQR:", err.message);
//     }

//     // --- Fallback to jsQR with preprocessing ---
//     const img = new Image();
//     img.src = URL.createObjectURL(file);

//     img.onload = () => {
//       const canvas = preprocessImage(img);
//       const ctx = canvas.getContext("2d");
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//       const code = jsQR(imageData.data, canvas.width, canvas.height);
//       if (code) {
//         onScan(code.data.trim());
//       } else {
//         alert(
//           "❌ No QR code detected. Please upload a clearer/bigger image or use camera scanning."
//         );
//       }
//     };
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>

//       {/* Camera scanner */}
//       <div id="reader" style={{ width: "100%" }}></div>

//       {/* File upload */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//       />

//       <p className="text-sm text-gray-500 mt-2">
//         📷 Use camera to scan OR upload a screenshot/photo of the QR code.
//       </p>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import QrScanner from "qr-scanner";
// import jsQR from "jsqr";

// export default function QRScanner({ onScan }) {
//   const [scanning, setScanning] = useState(false);
//   const [cameraAvailable, setCameraAvailable] = useState(false);

//   // --- Check if camera is available ---
//   useEffect(() => {
//     async function checkCamera() {
//       try {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(d => d.kind === "videoinput");
//         setCameraAvailable(videoDevices.length > 0);
//       } catch (err) {
//         console.warn("Camera check failed:", err.message);
//       }
//     }
//     checkCamera();
//   }, []);

//   // --- Camera scanner (only if available) ---
//   useEffect(() => {
//     if (!cameraAvailable) return;

//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText.trim());
//       },
//       (errorMessage) => console.warn("Camera scan error:", errorMessage)
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [cameraAvailable, onScan]);

//   // --- Preprocess image: resize + threshold ---
//   const preprocessImage = (img) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     const scale = 2; // scale up small images
//     canvas.width = img.width * scale;
//     canvas.height = img.height * scale;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//     // convert to black & white for better contrast
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;
//     for (let i = 0; i < data.length; i += 4) {
//       const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
//       const val = avg > 128 ? 255 : 0;
//       data[i] = data[i + 1] = data[i + 2] = val;
//     }
//     ctx.putImageData(imageData, 0, 0);

//     return canvas;
//   };

//   // --- File upload handler with fallback ---
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setScanning(true);

//     // 1️⃣ Try qr-scanner first
//     try {
//       const result = await QrScanner.scanImage(file, {
//         returnDetailedScanResult: true,
//       });
//       if (result?.data) {
//         onScan(result.data.trim());
//         setScanning(false);
//         return;
//       }
//     } catch (err) {
//       console.warn("qr-scanner failed, falling back to jsQR:", err.message);
//     }

//     // 2️⃣ Fallback to jsQR
//     const img = new Image();
//     img.src = URL.createObjectURL(file);

//     img.onload = () => {
//       const canvas = preprocessImage(img);
//       const ctx = canvas.getContext("2d");
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//       const code = jsQR(imageData.data, canvas.width, canvas.height);
//       if (code) {
//         onScan(code.data.trim());
//       } else {
//         alert(
//           "❌ No QR code detected. Please upload a clearer/bigger image or use camera scanning."
//         );
//       }
//       setScanning(false);
//     };
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>

//       {/* Camera scanner */}
//       {cameraAvailable ? (
//         <div id="reader" style={{ width: "100%" }}></div>
//       ) : (
//         <p className="text-sm text-gray-500 mb-2">
//           No camera detected. Use file upload below.
//         </p>
//       )}

//       {/* File upload */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//         disabled={scanning}
//       />

//       {scanning && <p className="text-blue-500 mt-2">Scanning image...</p>}

//       <p className="text-sm text-gray-500 mt-2">
//         📷 Use camera to scan OR upload a screenshot/photo of the QR code.
//       </p>
//     </div>
//   );
// }
// import { useState } from "react";
// import QrScanner from "qr-scanner";
// import jsQR from "jsqr";

// export default function QRScanner({ onScan }) {
//   const [scanning, setScanning] = useState(false);

//   // --- Preprocess image: resize + threshold ---
//   const preprocessImage = (img) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     const scale = 2; // scale up small images
//     canvas.width = img.width * scale;
//     canvas.height = img.height * scale;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//     // convert to black & white for better contrast
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;
//     for (let i = 0; i < data.length; i += 4) {
//       const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
//       const val = avg > 128 ? 255 : 0;
//       data[i] = data[i + 1] = data[i + 2] = val;
//     }
//     ctx.putImageData(imageData, 0, 0);

//     return canvas;
//   };

//   // --- File upload handler with fallback ---
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setScanning(true);

//     // 1️⃣ Try qr-scanner first
//     try {
//       const result = await QrScanner.scanImage(file, {
//         returnDetailedScanResult: true,
//       });
//       if (result?.data) {
//         onScan(result.data.trim());
//         setScanning(false);
//         return;
//       }
//     } catch (err) {
//       console.warn("qr-scanner failed, falling back to jsQR:", err.message);
//     }

//     // 2️⃣ Fallback to jsQR
//     const img = new Image();
//     img.src = URL.createObjectURL(file);

//     img.onload = () => {
//       const canvas = preprocessImage(img);
//       const ctx = canvas.getContext("2d");
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//       const code = jsQR(imageData.data, canvas.width, canvas.height);
//       if (code) {
//         onScan(code.data.trim());
//       } else {
//         alert(
//           "❌ No QR code detected. Please upload a clearer/bigger image."
//         );
//       }
//       setScanning(false);
//     };
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>

//       {/* File upload */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//         disabled={scanning}
//       />

//       {scanning && <p className="text-blue-500 mt-2">Scanning image...</p>}

//       <p className="text-sm text-gray-500 mt-2">
//         Upload a screenshot or photo of the prescription QR code to scan.
//       </p>
//     </div>
//   );
// }
// import { useState } from "react";
// import { BrowserQRCodeReader } from "@zxing/library";

// export default function QRScanner({ onScan }) {
//   const [scanning, setScanning] = useState(false);

//   // --- File upload handler ---
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setScanning(true);

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const img = new Image();
//       img.src = e.target.result;

//       img.onload = async () => {
//         try {
//           const codeReader = new BrowserQRCodeReader();

//           // decode from the image element
//           const result = await codeReader.decodeFromImageElement(img);

//           if (result?.text) {
//             onScan(result.text.trim());
//           } else {
//             alert("❌ No QR code detected. Try a clearer image.");
//           }
//         } catch (err) {
//           console.error("ZXing decode failed:", err.message);
//           alert(
//             "❌ Failed to decode QR. Make sure the image is clear and not too small."
//           );
//         } finally {
//           setScanning(false);
//         }
//       };
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//         disabled={scanning}
//       />

//       {scanning && <p className="text-blue-500 mt-2">Scanning image...</p>}

//       <p className="text-sm text-gray-500 mt-2">
//         Upload a screenshot or high-resolution image of the prescription QR
//         code.
//       </p>
//     </div>
//   );
// }
// import { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import jsQR from "jsqr";

// export default function QRScanner({ onScan }) {
//   useEffect(() => {
//     // Initialize camera scanner
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250, facingMode: "environment" },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         if (decodedText) onScan(decodedText.trim());
//       },
//       (errorMessage) => {
//         console.warn("Camera scan error:", errorMessage);
//       }
//     );

//     return () => {
//       scanner.clear().catch(console.error);
//     };
//   }, [onScan]);

//   // File upload for QR image
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target.result;

//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0, img.width, img.height);

//         const imageData = ctx.getImageData(0, 0, img.width, img.height);
//         const code = jsQR(imageData.data, img.width, img.height);

//         if (code) {
//           onScan(code.data.trim()); // auto-fetch prescription
//         } else {
//           alert("No QR code detected. Make sure the image is clear.");
//         }
//       };
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>
//       <div id="reader" style={{ width: "100%" }}></div>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="mt-3"
//       />

//       <p className="text-sm text-gray-500 mt-2">
//         Point your camera at the prescription QR code <br />
//         or upload a screenshot/image of the QR code.
//       </p>
//     </div>
//   );
// }
import { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

export default function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize scanner
    qrScannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        if (result) onScan(result); // Return scanned QR data
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScannerRef.current.start();

    return () => {
      qrScannerRef.current?.stop();
    };
  }, [onScan]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => {
        onScan(result.data); // Return scanned QR from file
      })
      .catch(() => {
        alert("Failed to detect QR. Make sure the image is clear.");
      });
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">Scan Prescription QR</h2>
      <video ref={videoRef} style={{ width: "100%" }} />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mt-3"
      />
      <p className="text-sm text-gray-500 mt-2">
        Use your camera or upload a screenshot/image of the QR code.
      </p>
    </div>
  );
}
