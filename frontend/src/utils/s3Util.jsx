// import AWS from 'aws-sdk';

// AWS.config.update({
//   region: import.meta.env.VITE_APP_REGION,
//   accessKeyId: import.meta.env.VITE_APP_ACCESS_KEY_ID,
//   secretAccessKey: import.meta.env.VITE_APP_SECRET_ACCESS_KEY_ID
// });

// const s3 = new AWS.S3();

// const uploadToS3 = async (dataUrl) => {
//     const buffer = dataURLToArrayBuffer(dataUrl);
  
//     const params = {
//       Bucket: 'ding-dong', 
//       Key: `share/${Date.now()}.png`, 
//       Body: buffer,
//       ContentType: 'image/png',
//       ACL: 'public-read'  
//     };
  
//     try {
//       const result = await s3.upload(params).promise();
//       return result.Location; // 업로드된 이미지 URL 반환
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return null;
//     }
//   };

//   function dataURLToArrayBuffer(dataURL) {
//     const base64 = dataURL.split(',')[1];
//     const binary = atob(base64);
//     const bytes = new Uint8Array(binary.length);

//     for (let i = 0; i < binary.length; i++) {
//         bytes[i] = binary.charCodeAt(i);
//     }

//     return bytes.buffer;
// }

//   export const handleImageUpload = async (canvas) => {
//     const dataUrl = canvas.toDataURL("image/png");
//     const uploadedImageUrl = await uploadToS3(dataUrl);
//     return uploadedImageUrl; // 업로드된 이미지의 URL을 반환
//   };

  