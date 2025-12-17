const fileInput = document.getElementById("fileInput");
const sendButton = document.getElementById("validateButton");

const trackInput = document.getElementById("title");
const timeInput = document.getElementById("price");

// ✅ Your real Vercel function endpoint:
const BACKEND_URL = "https://drive-upload-backend-ten.vercel.app/api/upload";

sendButton.addEventListener("click", async () => {
  if (!fileInput || !sendButton || !trackInput || !timeInput) {
    alert("Missing form elements in HTML (check IDs).");
    return;
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    alert("Please select a file");
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  // IMPORTANT: backend expects the field name "file"
  formData.append("file", file);
  formData.append("track", trackInput.value || "");
  formData.append("time", timeInput.value || "");

  sendButton.disabled = true;
  const oldText = sendButton.textContent;
  sendButton.textContent = "Uploading...";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(errorText || `Upload failed (${response.status})`);
    }

    const result = await response.json().catch(() => ({}));
    alert("Upload successful!");
    console.log("Upload result:", result);
  } catch (err) {
    console.error(err);
    alert(`Upload failed: ${err?.message ?? err}`);
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = oldText || "Send";
  }
});
