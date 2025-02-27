const lyrics = [
    { time: 5, text: "Yes, I look happy, happy all the time" },
    { time: 8, text: "But you don't see me, see me when I cry" },
    { time: 13, text: "I can't find an open door" },
    { time: 15, text: "When I try, it breaks me more" },
    { time: 18, text: "Should I quit and should I go" },
    { time: 21, text: "Should I leave this all behind?" },
    { time: 22, text: "Same things happen all the time" },
    { time: 24, text: "Can't get out off my mind" },
    { time: 27, text: "Doing things I shouldn't do" },
    { time: 29, text: "If you ask me, I have no clue" },
    { time: 30, text: "Yes, I look happy, happy all the time" },
    { time: 34, text: "But you don't see me, see me when I cry" },
    { time: 39, text: "'Cause I'm a master, master of pretending" },
    { time: 43, text: "Lately never ending" },
    { time: 47, text: "When does this all make any sense to me?" },
    { time: 50, text: "God, I know you can set me free" },
    { time: 55, text: "And please open a door and again restore this broken piece of me" },
    { time: 65, text: "A better treasure chest that was made for more" },
    { time: 68, text: "And there is purpose behind closed doors" },
    { time: 73, text: "A better treasure chest, that was made for more" },
    { time: 78, text: "And there is purpose behind closed doors" },
    { time: 82, text: "Am I the one who is insane, for not feeling like the same?" },
    { time: 86, text: "All I want is to be heard, in a world that's full of hurt" },
    { time: 90, text: "Waking up, searching for a sign, yes, I fall but I still climb" },
    { time: 94, text: "No, you don't need me to teach, just cause the dream is far to reach" },
    { time: 103, text: "Take this fear and take that doubt" },
    { time: 104, text: "Throw'em away before I drown" },
    { time: 110, text: "Before I drown" },
    { time: 116, text: "Yes, I look happy, happy all the time" },
    { time: 120, text: "But you don't see me, see me when I cry" },
    { time: 125, text: "'Cause I'm a master, master of pretending" },
    { time: 128, text: "Lately never ending" },
    { time: 133, text: "When does this all make any sense to me?" },
    { time: 136, text: "God, I know you can set me free" },
    { time: 141, text: "And please open a door and again restore this broken piece of me" },
    { time: 150, text: "A better treasure chest that was made for more" },
    { time: 155, text: "And there is purpose behind closed doors" },
    { time: 159, text: "A better treasure chest that was made for more" },
    { time: 164, text: "And there is purpose behind closed doors" },
    { time: 167, text: "When does this all make any sense to me?" },
    { time: 170, text: "God, I know you can set me free" },
    { time: 175, text: "And please open a door and again restore this broken piece of me" },
];

// Initialize elements after DOM is fully loaded
let lyricsContainer, audio;

window.addEventListener('DOMContentLoaded', () => {
    lyricsContainer = document.getElementById('lyrics');
    audio = document.getElementById('audio');
    
    if (!lyricsContainer || !audio) {
        console.error('Could not find lyrics container or audio element');
        return;
    }

    // Initialize audio event listeners
    audio.addEventListener('play', () => {
        if (audio.currentTime === 0) {
            currentIndex = 0;
            lyricsContainer.innerHTML = '';
        }
        console.log('Audio started playing');
        displayLyrics(); // Start displaying lyrics immediately
    });

    // Provide user-friendly message to start playback
    lyricsContainer.innerHTML = 'Click play to start the music!';


    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        lyricsContainer.innerHTML = 'Error: Unable to load audio. Please check the file.';
    });

    audio.addEventListener('canplaythrough', () => {
        console.log('Audio is ready to play');
        // You can enable the play button or perform other UI updates here
    });
});

let currentIndex = 0; // Track the current index of the lyrics

const typingSpeed = 50; // Adjustable typing speed in milliseconds
const typeWriter = (text, i, callback) => {
    if (i < text.length) {
    lyricsContainer.innerHTML += text.charAt(i); // Use original character without modification


        i++;
        setTimeout(() => typeWriter(text, i, callback), typingSpeed);
    } else {
        callback();
    }
};

const scrollToBottom = () => {
    lyricsContainer.scrollTop = lyricsContainer.scrollHeight; // Scroll to the bottom
};

const displayLyrics = () => {
    scrollToBottom(); // Call scroll function to ensure lyrics are visible
    // Ensure autoscroll
    scrollToBottom(); // Call scroll function to ensure lyrics are visible



    try {
        if (!audio || !lyricsContainer) {
            console.error('Audio or lyrics container not initialized');
            return;
        }

        console.log(`Current Time: ${audio.currentTime}, Current Index: ${currentIndex}`);

        if (currentIndex < lyrics.length) {
            const { time, text } = lyrics[currentIndex];
            if (audio.currentTime >= time - 0.5) {
                // Only clear if it's the first lyric
                if (currentIndex === 0) {
                    lyricsContainer.innerHTML = '';
                }
                typeWriter(text + '\n\n', 0, () => {
                    currentIndex++;
                    // Immediately check for next lyric
                    if (currentIndex < lyrics.length && audio.currentTime >= lyrics[currentIndex].time - 0.5) {
                        displayLyrics();
                    } else {
                        setTimeout(displayLyrics, 100); // Minimal delay
                    }
                });
            } else {
                requestAnimationFrame(displayLyrics);
            }
        } else {
            displayAsciiArt();
        }
    } catch (error) {
        console.error('Error displaying lyrics:', error);
        lyricsContainer.innerHTML = 'Error: Unable to display lyrics. Please refresh the page.';
    }
};

const displayAsciiArt = () => {
    const asciiArt = `
        🎵  🎶
       MUSIC ENDED
        🎵  🎶
    `;
    typeWriter(asciiArt, 0, () => {
        lyricsContainer.style.color = '#ffcc00'; // Change color for end message
    });
};

const simulateTerminalInput = () => {
    const playButton = document.getElementById('playButton'); 
    // Ensure user interaction to start audio

    const pauseButton = document.getElementById('pauseButton');
    
    if (!playButton || !pauseButton) {
        throw new Error('Play/Pause buttons not found');
    }

    playButton.addEventListener('click', () => {
        typeWriter("nijxm@aloneHost $ play music\n", 0, () => {
            console.log('Play button clicked');
            // Ensure audio is ready before playing
            if (audio.readyState >= 2) {
                audio.play();
                currentIndex = 0; // Reset index when audio plays
                displayLyrics(); // Start displaying lyrics immediately
            } else {
                console.error('Audio not ready to play. Please wait until it is fully loaded.');
            }
        });
    });
};

// Start the terminal simulation when the page loads
window.onload = () => {
    // Ensure elements are initialized before starting
    if (lyricsContainer && audio) {
        // Add loading state
        lyricsContainer.innerHTML = 'Loading...';
        simulateTerminalInput(); // Start displaying lyrics immediately
    } else {
        console.error('Failed to initialize application');
        lyricsContainer.innerHTML = 'Error: Failed to initialize application. Please refresh the page.';
    }
};
