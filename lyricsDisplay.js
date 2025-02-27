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
    lyricsContainer = document.getElementById('lyrics') || null;
    audio = document.getElementById('audio') || null;

    if (!lyricsContainer || !audio) {
        console.error('Could not find lyrics container or audio element');
        alert('Error: Required elements not found. Please check the HTML structure.');
        return;
    }

    console.log('Elements initialized:', { lyricsContainer, audio });

    // Initialize audio event listeners
    audio.addEventListener('play', () => {
        console.log('Play event triggered'); // Debugging log
        if (audio.readyState >= 2) { // Ensure audio is ready to play
            currentIndex = 0; // Reset index when audio plays
            lyricsContainer.innerHTML = ''; // Clear lyrics container
            console.log('Audio started playing'); // Debugging log
            displayLyrics(); // Start displaying lyrics immediately
        } else {
            console.error('Audio not ready to play. Please wait until it is fully loaded.');
        }
    });

    audio.addEventListener('pause', () => {
        console.log('Audio paused'); // Debugging log
    });

    audio.addEventListener('ended', () => {
        console.log('Audio ended'); // Debugging log
        lyricsContainer.innerHTML = 'Music has ended.'; // Notify user
    });

    // Provide user-friendly message to start playback
    lyricsContainer.innerHTML = 'Click play to start the music!';

    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        alert('Error: Unable to load audio. Please check the console for more details.'); // Alert user
        lyricsContainer.innerHTML = 'Error: Unable to load audio. Please check the file.'; // Notify user
    });

    audio.addEventListener('canplaythrough', () => {
        console.log('Audio is ready to play');
    });

    // Reset button functionality
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            console.log('Reset button clicked');
            resetLyrics();
        });
    } else {
        console.warn('Reset button not found'); // Log a warning if the reset button is not found
    }
});

let currentIndex = 0; // Track the current index of the lyrics

const typingSpeed = 100; // Adjustable typing speed in milliseconds

const typeWriter = (text, callback) => {
    console.log('Typing text:', text); // Debugging log
    lyricsContainer.innerHTML = ''; // Clear previous text before typing
    let i = 0; // Reset index for typing

    const displayNextChar = () => {
        if (i < text.length) {
            // Prevent duplicate characters
            if (text.charAt(i) !== ' ') {
                lyricsContainer.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(displayNextChar, typingSpeed); // Slow down typing speed
        } else {
            callback();
        }
    };
    displayNextChar(); // Start displaying characters
};


const scrollToBottom = () => {
    lyricsContainer.scrollTop = lyricsContainer.scrollHeight; // Scroll to the bottom
};

const resetLyrics = () => {
    currentIndex = 0; // Reset the current index
    lyricsContainer.innerHTML = ''; // Clear the displayed lyrics
    console.log('Lyrics reset'); // Debugging log
};

const displayLyrics = () => {
    scrollToBottom(); // Call scroll function to ensure lyrics are visible

    if (currentIndex < lyrics.length) {
        const { time, text } = lyrics[currentIndex];
        if (audio.currentTime >= time - 0.5) {
            typeWriter(text, () => {
                currentIndex++;
                displayLyrics(); // Immediately check for next lyric
            });
        } else {
            requestAnimationFrame(displayLyrics);
        }
    } else {
        displayAsciiArt();
    }
};

const displayAsciiArt = () => {
    const asciiArt = `
        🎵  🎶
       MUSIC ENDED
        🎵  🎶
    `;
    typeWriter(asciiArt, () => {
        lyricsContainer.style.color = '#ffcc00'; // Change color for end message
    });
};

// Start the terminal simulation when the page loads
window.onload = () => {
    if (lyricsContainer && audio) {
        lyricsContainer.innerHTML = 'Loading...<br>nijxm@aloneHost<br>$ Play music';
        simulateTerminalInput(); // Start displaying lyrics immediately
    } else {
        console.error('Lyrics container or audio element not found on page load.');
    }
};

const simulateTerminalInput = () => {
    const playButton = document.getElementById('playButton');
    if (!playButton) {
        throw new Error('Play button not found');
    }

    playButton.addEventListener('click', () => {
        typeWriter("nijxm@aloneHost $ play music\n", () => {
            console.log('Play button clicked');
            if (audio.readyState >= 2) {
                audio.play();
                displayLyrics(); // Start displaying lyrics immediately
            } else {
                console.error('Audio not ready to play. Please wait until it is fully loaded.');
            }
        });
    });
};
