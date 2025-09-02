using QRCoder;
using System;
// using System.Drawing;
// using System.IO;
// using System.Drawing.Imaging;
public class QRService
{
    public string GenerateQRCode(string data)
    {
        // using var qrGenerator = new QRCodeGenerator();
        // using var qrCodeData = qrGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
        // using var qrCode = new QRCode(qrCodeData);
        // using var bitmap = qrCode.GetGraphic(20);

        // using var ms = new MemoryStream();
        // bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
        // using var qrGenerator = new QRCoder.QRCodeGenerator();
        // var qrCodeData = qrGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
        // var pngQrCode = new PngByteQRCode(qrCodeData);
        // byte[] qrCodeBytes = pngQrCode.GetGraphic(20);
        // return Convert.ToBase64String(qrCodeBytes);
            using var qrGenerator = new QRCoder.QRCodeGenerator();
    var qrCodeData = qrGenerator.CreateQrCode(data, QRCoder.QRCodeGenerator.ECCLevel.M);
    using var qrCode = new QRCoder.PngByteQRCode(qrCodeData);
    return Convert.ToBase64String(qrCode.GetGraphic(20));
    }
}
