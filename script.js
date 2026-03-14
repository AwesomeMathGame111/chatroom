const username = "User" + Math.floor(Math.random()*1000);
const chatBox = document.getElementById("chat-box");

const ws = new WebSocket("wss://relay.websocket.events");

ws.onmessage = (event) => {
    addMessage(event.data);
};

function sendMessage(){
    const input = document.getElementById("message");
    const text = input.value.trim();

    if(text !== ""){
        const msg = username + ": " + text;
        ws.send(msg);
        input.value = "";
    }
}

function addMessage(text){
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("message").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});
