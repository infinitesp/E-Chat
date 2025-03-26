const socket = io();

let inputText = document.getElementById("inputText");
let search = document.getElementById("search");
let messageContainer = document.getElementById("message");
let clearChatButton = document.getElementById("clearChat"); // Reference to the "Clear Chat" button

// Check if there are stored messages in localStorage and display them
window.onload = function () {
    let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    storedMessages.forEach(msg => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("Display");
        newDiv.innerText = msg;
        messageContainer.appendChild(newDiv);
    });
};

search.addEventListener("click", () => {
    let textinput = inputText.value.trim();
    if (textinput === "") {
        alert("Type something to send");
        return;
    }

    // Send the message to the server
    socket.emit('sendMessage', textinput);

    // Save the message to localStorage only after sending
    let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    storedMessages.push(textinput);
    localStorage.setItem("messages", JSON.stringify(storedMessages));

    inputText.value = "";
});

// Only append the message when it is received (don't save to localStorage again)
socket.on('receiveMessage', (message) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("Display");
    newDiv.innerText = message;
    messageContainer.appendChild(newDiv);
});

// Event listener for the "Clear Chat" button
clearChatButton.addEventListener("click", () => {
    // Clear the UI (message container)
    messageContainer.innerHTML = "";

    // Clear the stored messages in localStorage
    localStorage.removeItem("messages");
});
