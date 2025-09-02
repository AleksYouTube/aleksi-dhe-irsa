document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector(".input-field");
    /*const pageContent = document.querySelector(".page-content");*/
    const audio = document.getElementById("bg-audio");

    let correctPIN = null;

    // Load the correct PIN from the text file
    fetch("pin.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch PIN file.");
            }
            return response.text();
        })
        .then(text => {
            correctPIN = text.trim();
        })
        .catch(error => {
            console.error("Error fetching PIN:", error);
        });

    // Listen for input changes
    inputField.addEventListener("input", () => {
        if (!correctPIN) return;

        const userInput = inputField.value;

        if (userInput === correctPIN) {
            window.location.href = "pages/home.html";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-audio');

    const enableAudio = () => {
        audio.play()
            .then(() => console.log("Audio started"))
            .catch(err => console.error("Audio play failed:", err));

        // Only run once
        document.removeEventListener('click', enableAudio);
    };

    document.addEventListener('click', enableAudio);
});