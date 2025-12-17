// Get the file input element using DOM-API
const fileInput = document.querySelector('#fileInput');
// Define the listener function
const listener = (event) => {
  // Get the list of selected files from the change event
  const selectedInput = event.target;
  const selectedFiles = selectedInput.files;
  // Check if there are any selected files
  if (!selectedFiles || selectedFiles.length === 0) return;
  // Check if there is only one selected file
  if (selectedFiles.length === 1) {
    // Get a URL to the selected file
    const localUrl = URL.createObjectURL(selectedFiles[0]);
    // Get img-element using DOM-API
    const imageHTMLElement = document.querySelector('#imagePreview');
    // Cast to HTMLImageElement
    const imageElement = imageHTMLElement;
    // Check if imageElement is null
    if (!imageElement) return;
    // Set the src property of the img element to the variable `localUrl`
    imageElement.src = localUrl;
    // Remove the hidden class to display the image
    imageElement.classList.remove('hidden');
  }
};
// Ensure the file input element exists
if (fileInput) {
  // Add an event listener for the change event
  fileInput.addEventListener('change', listener);
}
