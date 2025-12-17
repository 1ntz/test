const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const sendButton = document.getElementById("validateButton") as HTMLButtonElement;

const trackInput = document.getElementById("title") as HTMLInputElement;
const timeInput = document.getElementById("price") as HTMLInputElement;

const BACKEND_URL = "https://your-backend.example/upload";

sendButton.addEventListener("click", async () => {
  if (!fileInput.files || fileInput.files.length === 0) {
    alert("Please select a file");
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("track", trackInput.value);
  formData.append("time", timeInput.value);

  sendButton.disabled = true;
  sendButton.textContent = "Uploading...";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const result = await response.json();
    alert("Upload successful!");

    console.log("Backend response:", result);
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Send";
  }
});
