// Media content
const letters = [
    { label: "From Maddie", type: "pdf", src: "letters/FromMaddie.pdf" },
    { label: "From Rosie", type: "pdf", src: "letters/FromRosie.pdf" },
    { label: "From Emmory", type: "pdf", src: "letters/FromEmmory.pdf" },
    { label: "From Mom", type: "pdf", src: "letters/FromMom.pdf" },
];

const videos = [
    { label: "\"Audra the Explorer\" from Dad", src: "videos/DadVideo1.mp4" },
    { label: "\"Audra's Anthem\" from Dad", src: "videos/DadVideo2.mp4" },
];

const bgMusic = document.getElementById('bgMusic');
const playPauseButton = document.getElementById('playPauseButton');
let isMusicPlaying = false;

// Silly goose button functionality
document.addEventListener('DOMContentLoaded', function() {
    const sillyButton = document.getElementById('sillyButton');
    const mainContent = document.getElementById('mainContent');
    
    sillyButton.addEventListener('click', function() {
        mainContent.classList.remove('content-hidden');
        setTimeout(() => {
            mainContent.classList.add('content-visible');
        }, 10);
        
        // Play music
        bgMusic.play().catch(error => {
            console.log("Audio autoplay was prevented:", error);
        });
        playPauseButton.textContent = 'Pause Audio';
        isMusicPlaying = true;
        
        // Hide the silly button
        sillyButton.style.display = 'none';
    });
});

// Function to handle background music
playPauseButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        playPauseButton.textContent = 'Click to Play Audio!';
    } else {
        bgMusic.play().catch(error => {
            console.log("Audio autoplay was prevented:", error);
        });
        playPauseButton.textContent = 'Pause Audio';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Helper function -- toggleable items
function createToggleableItem(container, label, content, type, src) {
    const item = document.createElement("div");
    item.className = "item";

    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", () => openModal(content, type, src));

    item.appendChild(button);
    container.appendChild(item);
}

// Store the original scroll position
let scrollPosition = 0;

// Modal functions (pop-ups)
function openModal(content, type, src) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    
    // Store current scroll position
    scrollPosition = window.pageYOffset;
    
    if (type === "pdf") {
        modalBody.innerHTML = `<iframe src="${src}" title="PDF Viewer"></iframe>`;
    } else if (type === "video") {
        modalBody.innerHTML = ` 
            <video controls autoplay>
                <source src="${src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        bgMusic.pause();
    }
    
    modal.style.display = "flex";
    
    // Add a class to the body instead of setting overflow directly
    document.body.classList.add('modal-open');
}

function closeModal() {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = "";
    modal.style.display = "none";
    
    // Remove the class from body
    document.body.classList.remove('modal-open');
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);

    bgMusic.play();
    playPauseButton.textContent = 'Pause Audio';
}

// Event listeners for modal
document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.className === "modal-overlay") {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.getElementById("modal").style.display === "flex") {
        closeModal();
    }
});

// Render content
const lettersContainer = document.getElementById("letters-container");
letters.forEach((letter) => {
    let content;
    if (letter.type === "pdf") {
        content = `<iframe src="${letter.src}" height="300"></iframe>`;
    }
    createToggleableItem(lettersContainer, letter.label, content, letter.type, letter.src);
});

const videosContainer = document.getElementById("videos-container");
videos.forEach((video) => {
    const content = `<video controls>
                        <source src="${video.src}" type="video/mp4">
                        Your browser does not support the video tag.
                     </video>`;
    createToggleableItem(videosContainer, video.label, content, "video", video.src);
});
