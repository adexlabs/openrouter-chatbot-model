const input =
    document.getElementById("message");

const chat =
    document.getElementById("chat");

input.addEventListener(
    "keypress",
    function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    }
);

async function sendMessage() {

    const msg =
        input.value.trim();

    if (!msg) return;

    chat.innerHTML += `
    <div class="user-message">
      <span>${msg}</span>
    </div>
  `;

    input.value = "";

    chat.scrollTop =
        chat.scrollHeight;

    const loadingId =
        "loading-" + Date.now();

    chat.innerHTML += `
    <div
      class="bot-message"
      id="${loadingId}"
    >
      <span class="spinner"></span>
    </div>
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
                    message: msg
                })
            });

        const data =
            await response.json();

        const loader =
            document.getElementById(
                loadingId
            );

        if (loader) {
            loader.remove();
        }

        chat.innerHTML += `
      <div class="bot-message">
        <span>${data.reply}</span>
      </div>
    `;

    } catch (error) {

        const loader =
            document.getElementById(
                loadingId
            );

        if (loader) {
            loader.remove();
        }

        chat.innerHTML += `
      <div class="bot-message">
        <span>Server Error</span>
      </div>
    `;
    }

    chat.scrollTop =
        chat.scrollHeight;
}