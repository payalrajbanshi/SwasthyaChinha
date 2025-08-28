// import React, { useState } from "react";
// import QRCode from "react-qr-code";

// export default function QRCodeDisplay({ qrData }) {
//   const [showFull, setShowFull] = useState(false);

//   return (
//     <>
//       <div onClick={() => setShowFull(true)} className="cursor-pointer">
//         <QRCode value={qrData} size={100} />
//       </div>

//       {showFull && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg relative">
//             <button 
//               className="absolute top-2 right-2 text-xl" 
//               onClick={() => setShowFull(false)}
//             >×</button>
//             <QRCode value={qrData} size={300} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import React from "react";
import QRCode from "qrcode.react";

export default function QRCodeDisplay({ value }) {
  if (!value) return null;
  return <QRCode value={value} size={128} />;
}
