export function encodeImageFileAsBase64(blob) {
  return new Promise((resolve, reject) => {
    // Create new fileReader
    const reader = new FileReader();
    // Add onload event
    reader.onloadend = () => {
      // Resolve with base64 encoded result
      resolve(reader.result);
    };
    // Add onerror event
    reader.onerror = () => {
      // Reject with error
      reject(reader.error);
    };
    // Pass file to fileReader
    reader.readAsDataURL(blob);
  });
}
