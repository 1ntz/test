"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeImageFileAsBase64 = encodeImageFileAsBase64;
function encodeImageFileAsBase64(blob) {
    return new Promise(function (resolve, reject) {
        // Create new fileReader
        var reader = new FileReader();
        // Add onload event
        reader.onloadend = function () {
            // Resolve with base64 encoded result
            resolve(reader.result);
        };
        // Add onerror event
        reader.onerror = function () {
            // Reject with error
            reject(reader.error);
        };
        // Pass file to fileReader
        reader.readAsDataURL(blob);
    });
}
