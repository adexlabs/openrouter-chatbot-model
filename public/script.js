async function sendMessage() {

  const input =
    document.getElementById("message");

  const message = input.value.trim();

  if (!message) return;

  const chatBox =
    document.getElementById("chat-box");

  // User message
  chatBox.innerHTML +=
    `<p><b>You:</b> ${message}</p>`;

  input.value = "";

  // Spinner message
  const loadingId =
    "loading-" + Date.now();

  chatBox.innerHTML += `
    <p id="${loadingId}">
      <b>Bot:</b>
      <span class="spinner"></span>
    </p>
  `;

  chatBox.scrollTop =
    chatBox.scrollHeight;

  try {

    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message
      })
    });

    const data = await response.json();

    // Replace spinner with AI reply
    document.getElementById(
      loadingId
    ).innerHTML =
      `<b>Bot:</b> ${data.reply}`;

  } catch(error) {

    document.getElementById(
      loadingId
    ).innerHTML =
      `<b>Bot:</b> Error`;

  }

  chatBox.scrollTop =
    chatBox.scrollHeight;
}

// Enter key send
document
  .getElementById("message")
  .addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
      sendMessage();
    }

});