const scenes = [
    { title: "How She Is?", text: "A question that lingers in my heart every day...", background: "linear-gradient(135deg, #ff9a9e, #fad0c4)" },
    { title: "Beautiful", text: "Her smile lights up the darkest of my days, a beauty beyond words.", background: "linear-gradient(135deg, #a18cd1, #fbc2eb)" },
    { title: "Kind", text: "Her heart is a haven, always giving, always caring.", background: "linear-gradient(135deg, #84fab0, #8fd3f4)" },
    { title: "Rare", text: "Like a star in daylight, she’s one of a kind, impossible to find.", background: "linear-gradient(135deg, #667eea, #764ba2)" },
    { title: "Talented", text: "Every move, every word, a masterpiece of grace and skill.", background: "linear-gradient(135deg, #ffecd2, #fcb69f)" },
    { title: "Amazing", text: "She turns the ordinary into magic, leaving me in awe.", background: "linear-gradient(135deg, #ff9a9e, #fecfef)" },
    { title: "Trustworthy", text: "With her, my secrets are safe, my soul at peace.", background: "linear-gradient(135deg, #d4fc79, #96e6a1)" },
    { title: "Forever", text: "And so I know, she’s the one I’ll cherish eternally.", background: "linear-gradient(135deg, #ee9ca7, #ffdde1)" }
];

let currentScene = 0;
const sceneDiv = document.getElementById('scene');
const birdSongs = [
    document.getElementById('bird-song1'),
    document.getElementById('bird-song2'),
];
const natureAmbience = document.getElementById('nature-ambience');
const fireflySound = document.getElementById('firefly-sound');
const muteToggle = document.getElementById('mute-toggle');

let isMuted = false;

// Start ambient sound
natureAmbience.volume = 0.3; // Very low volume for subtlety

natureAmbience.play().catch(error => console.log("Autoplay prevented:", error));

// Function to toggle mute state
function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        natureAmbience.pause();
        fireflySound.pause();
        birdSongs.forEach(song => song.pause());
        muteToggle.textContent = 'Unmute';
    } else {
        natureAmbience.play();
        fireflySound.play();
        birdSongs.forEach(song => song.play());
        muteToggle.textContent = 'Mute';
    }
}

// Toggle mute/unmute on button click
muteToggle.addEventListener('click', toggleMute);

// Toggle mute/unmute on "m" key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'm' || event.key === 'M') { // Case-insensitive
        toggleMute();
    }
});


function displayScene() {
    if (currentScene < scenes.length) {
        sceneDiv.innerHTML = `
            <div class="title">${scenes[currentScene].title}</div>
            <div class="text">${scenes[currentScene].text}</div>
            <p class="click-to-continue">Click to continue</p>
        `;
        document.body.style.background = scenes[currentScene].background;
        currentScene++;
    } else {
        currentScene = 1;
        displayScene(); // Loop back to start
    }
}


// Initial display
displayScene();

// Add click event to progress
document.body.addEventListener('click', displayScene);

// Add floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = Math.random() * 20 + 10; // Random size between 10px and 30px
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.left = Math.random() * 100 + 'vw';
    const hue = Math.random() * 60 + 340; // Pink-to-red hues
    heart.style.background = `hsl(${hue}, 100%, 50%)`;
    heart.style.setProperty('--heart-color', `hsl(${hue}, 100%, 50%)`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);

    // Interactive click effect
    heart.addEventListener('click', () => {
        heart.style.transition = 'transform 0.5s, opacity 0.5s';
        heart.style.transform = 'scale(2)';
        heart.style.opacity = '0';
        setTimeout(() => heart.remove(), 500);
    });
}

// Add fireflies with sound variations
function createFirefly() {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    const size = 3 + Math.random() * 4; // Size between 3px and 7px
    firefly.style.width = size + 'px';
    firefly.style.height = size + 'px';
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    firefly.style.left = startX + 'px';
    firefly.style.top = startY + 'px';

    // Randomize movement points
    firefly.style.setProperty('--wander-x1', `${(Math.random() - 0.5) * 100}px`);
    firefly.style.setProperty('--wander-y1', `${(Math.random() - 0.5) * 100}px`);
    firefly.style.setProperty('--wander-x2', `${(Math.random() - 0.5) * 150}px`);
    firefly.style.setProperty('--wander-y2', `${(Math.random() - 0.5) * 150}px`);
    firefly.style.setProperty('--wander-x3', `${(Math.random() - 0.5) * 100}px`);
    firefly.style.setProperty('--wander-y3', `${(Math.random() - 0.5) * 100}px`);
    firefly.style.setProperty('--wander-x4', `${(Math.random() - 0.5) * 120}px`);
    firefly.style.setProperty('--wander-y4', `${(Math.random() - 0.5) * 120}px`);

    // Randomize speeds
    const flickerSpeed = 1 + Math.random() * 1; // 1s to 2s
    const wanderSpeed = 5 + Math.random() * 5; // 5s to 10s
    firefly.style.setProperty('--flicker-speed', `${flickerSpeed}s`);
    firefly.style.setProperty('--wander-speed', `${wanderSpeed}s`);

    // Randomize hue
    const hue = 60 + Math.random() * 60; // Yellow to green (60-120)
    firefly.style.setProperty('--firefly-hue', hue);

    document.body.appendChild(firefly);
    setTimeout(() => firefly.remove(), wanderSpeed * 1000); // Remove after wander completes

    // Play random firefly sound effect
    const randomSound = fireflySounds[Math.floor(Math.random() * fireflySounds.length)];
    const audio = randomSound.cloneNode(true); // Clone to allow overlapping playback
    audio.volume = 0.1 + Math.random() * 0.2; // Volume between 0.1 and 0.3
    audio.playbackRate = 0.8 + Math.random() * 0.4; // Speed between 0.8x and 1.2x
    audio.play();
    setTimeout(() => {
        audio.volume = 0; // Fade out
        setTimeout(() => audio.remove(), 500); // Remove audio element after fade
    }, wanderSpeed * 1000 - 500); // Start fade 500ms before removal
}

// Add butterflies
function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    const size = 20 + Math.random() * 20; // Size between 20px and 40px
    butterfly.style.width = size + 'px';
    butterfly.style.height = size + 'px';
    const startY = Math.random() * window.innerHeight;
    butterfly.style.top = startY + 'px';
    const duration = 6 + Math.random() * 4; // Duration between 6s and 10s
    butterfly.style.animation = `fly ${duration}s linear forwards`;
    document.body.appendChild(butterfly);
    setTimeout(() => butterfly.remove(), duration * 1000); // Remove after animation
}

// Start creating elements
setInterval(createHeart, 500); // Create a heart every 0.5 seconds
setInterval(createFirefly, 1000); // Create a firefly every second
setInterval(createButterfly, 2000); // Create a butterfly every 2 seconds