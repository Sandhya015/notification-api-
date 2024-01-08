const popup = document.querySelector(".popup");
const wifiIcon = document.querySelector(".icon i");
const popupTitle = document.querySelector(".popup .title");
const popupDesc = document.querySelector(".popup .desc");
const reconnectBtn = document.querySelector(".popup .reconnect");

let isOnline = true;
let intervalId, timer = 10;

const checkConnection = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.ok;
    } catch (error) {
        isOnline = false;
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
};

const handlePopup = (status) => {
    if (status) {
        wifiIcon.className = "uil uil-wifi online"; // Add 'online' class to change color to green
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the network.";
        popup.classList.add("online");
        return setTimeout(() => {
            popup.classList.remove("show", "online");
            wifiIcon.className = "uil uil-wifi"; // Reset the color to the original state
        }, 2000);
    }
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Our network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = "popup show";

    intervalId = setInterval(() => {
        timer--;
        if (timer === 0) checkConnection();
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);
