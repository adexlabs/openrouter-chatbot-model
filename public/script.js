const input =
document.getElementById("message");

input.addEventListener(
    "keypress",
    function(e){
        if(e.key==="Enter"){
            sendMessage();
        }
    }
);

<<<<<<< HEAD
async function sendMessage(){
=======
  const message =
    input.value.trim();
>>>>>>> 182a0de03453139f202269e5c03f4fff0f03bf44

    const msg =
    input.value.trim();

    if(!msg) return;

<<<<<<< HEAD
    const chat =
    document.getElementById("chat");
=======
  chatBox.innerHTML +=
    `<p><b>You:</b> ${message}</p>`;
>>>>>>> 182a0de03453139f202269e5c03f4fff0f03bf44

    chat.innerHTML += `
        <div class="user-message">
            <span>${msg}</span>
        </div>
    `;

<<<<<<< HEAD
    input.value="";
=======
  const loadingId =
    "loading-" + Date.now();
>>>>>>> 182a0de03453139f202269e5c03f4fff0f03bf44

    try{

<<<<<<< HEAD
        const response =
        await fetch("/api/chat",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:msg
            })
        });

        const data =
        await response.json();

        chat.innerHTML += `
            <div class="bot-message">
                <span>${data.reply}</span>
            </div>
        `;

    }catch(error){

        chat.innerHTML += `
            <div class="bot-message">
                <span>Server Error</span>
            </div>
        `;
    }

    chat.scrollTop =
    chat.scrollHeight;
}
=======
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
>>>>>>> 182a0de03453139f202269e5c03f4fff0f03bf44
