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

async function sendMessage(){

    const msg =
    input.value.trim();

    if(!msg) return;

    const chat =
    document.getElementById("chat");

    chat.innerHTML += `
        <div class="user-message">
            <span>${msg}</span>
        </div>
    `;

    input.value="";

    try{

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