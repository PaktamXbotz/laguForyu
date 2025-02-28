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

let lyricsContainer, audio;
let isPaused = false;
let currentIndex = 0;
let currentLyric = '';
let isTyping = false;

window.addEventListener('DOMContentLoaded', () => {
    lyricsContainer = document.getElementById('lyrics');
    audio = document.getElementById('audio');

    if (!lyricsContainer || !audio) {
        console.error('Could not find lyrics container or audio element');
        alert('Error: Required elements not found. Please check the HTML structure.');
        return;
    }

    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');

    if (!playButton || !pauseButton || !resetButton) {
        console.error('Could not find one or more control buttons');
        return;
    }

    audio.addEventListener('play', () => {
        console.log('Audio playing...');
        if (audio.readyState >= 2) {
            if (!isPaused) {
                currentIndex = 0;
                lyricsContainer.innerHTML = '';
            }
            displayLyrics();
        } else {
            console.error('Audio not ready to play. Please wait until it is fully loaded.');
        }
    });

    audio.addEventListener('pause', () => {
        isPaused = true;
        lyricsContainer.innerHTML = lyricsContainer.innerHTML;
    });

    audio.addEventListener('ended', () => {
        resetLyrics();
    });

    playButton.addEventListener('click', () => {
        console.log('Play button clicked');
        if (audio.readyState >= 2) {
            typeWriter("nijxm@aloneHost $ play music\n", () => {
                audio.play();
                displayLyrics();
            });
        } else {
            console.error('Audio not ready to play. Please wait until it is fully loaded.');
        }
    });

    pauseButton.addEventListener('click', () => {
        audio.pause();
    });

   resetButton.addEventListener('click', () => {
    // Clear the lyrics and ASCII art
    lyricsContainer.innerHTML = 'Click play to start the music!';
    // Reset other necessary states
    currentIndex = 0;
    currentLyric = '';
    isPaused = false;
    audio.currentTime = 0; // Optionally reset the audio to the start
});

const typingSpeed = 85;

const typeWriter = (text, callback) => {
    let i = 0;
    const newParagraph = document.createElement('p');
    lyricsContainer.appendChild(newParagraph);
    isTyping = true;

    const displayNextChar = () => {
        if (i < text.length) {
            newParagraph.innerHTML += text.charAt(i);
            i++;
            setTimeout(displayNextChar, typingSpeed);
        } else {
            isTyping = false;
            callback();
        }
    };
    displayNextChar();
};

const scrollToBottom = () => {
    lyricsContainer.scrollTop = lyricsContainer.scrollHeight;
};

const resetLyrics = () => {
    currentIndex = 0;
    currentLyric = '';
    isPaused = false;
};

const displayLyrics = () => {
    scrollToBottom();
    console.log('Current Index:', currentIndex);

    if (currentIndex < lyrics.length && !isTyping) {
        const { time, text } = lyrics[currentIndex];
        console.log('Checking time:', audio.currentTime, 'against', time);
        if (audio.currentTime >= time && !isPaused) {
            console.log('Displaying lyric:', text);
            if (currentLyric !== text) {
                currentLyric = text;
                typeWriter(text, () => {
                    currentIndex++;
                    displayLyrics();
                });
            } else {
                currentIndex++;
                displayLyrics();
            }
        } else {
            requestAnimationFrame(displayLyrics);
        }
    } else if (currentIndex >= lyrics.length) {
        displayAsciiArt();
    }
};

const displayAsciiArt = () => {
    const asciiArt = `
      🌷🌷🌷🌷
     🌷🌷🌷🌷🌷
    🌷🌷🌷🌷🌷🌷
   🌷🌷🌷🌷🌷🌷🌷
  🌷🌷🌷🌷🌷🌷🌷🌷
 🌷🌷🌷🌷🌷🌷🌷🌷🌷
🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷
    `;
    typeWriter(asciiArt.replace(/\n/g, '<br>'), () => {
        lyricsContainer.style.color = '#ffcc00';
    });
};

window.onload = () => {
    if (lyricsContainer && audio) {
        lyricsContainer.innerHTML = '<b>Click laa button playy tu!</b>';
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
    console.log('Play button clicked');
    if (audio.readyState >= 2) {
        typeWriter("nijxm@aloneHost $ play music\n", () => {
            audio.play();
            displayLyrics();
        });
    } else {
        console.error('Audio not ready to play. Please wait until it is fully loaded.');
    }
});
