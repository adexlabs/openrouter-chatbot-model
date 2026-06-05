async function sendMessage() {

  const input =
    document.getElementById("message");

  const message =
    input.value.trim();

  if (!message) return;

  const chatBox =
    document.getElementById("chat-box");

  chatBox.innerHTML +=
    `<p><b>You:</b> ${message}</p>`;

  input.value = "";

  const loadingId =
    "loading-" + Date.now();

  chatBox.innerHTML += `
    <p id="${loadingId}">
      <b>Bot:</b>
      <span class="spinner"></span>
    </p>
  `;

  try {

    const response =
      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          message
        })
      });

    const data =
      await response.json();

    document.getElementById(
      loadingId
    ).innerHTML =
      `<b>Bot:</b> ${data.reply || data.error
      }`;

  } catch (error) {

    document.getElementById(
      loadingId
    ).innerHTML =
      "<b>Bot:</b> Error";

  }

  chatBox.scrollTop =
    chatBox.scrollHeight;
}

document
  .getElementById("message")
  .addEventListener(
    "keypress",
    function (event) {

      if (event.key === "Enter") {
        sendMessage();
      }

    }
  );