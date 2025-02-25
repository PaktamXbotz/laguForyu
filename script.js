const lyrics = [
    { time: 5, text: "Yes," },
    { time: 5.5, text: "I" },
    { time: 6, text: "look" },
    { time: 6.5, text: "happy," },
    { time: 7, text: "happy" },
    { time: 7.5, text: "all" },
    { time: 8, text: "the" },
    { time: 8.5, text: "time" },
    { time: 8.5, text: "But" },
    { time: 9, text: "you" },
    { time: 9.5, text: "don't" },
    { time: 10, text: "see" },
    { time: 10.5, text: "me," },
    { time: 11, text: "see" },
    { time: 11.5, text: "me" },
    { time: 12, text: "when" },
    { time: 12.5, text: "I" },
    { time: 13, text: "cry." },
    { time: 13.5, text: "I" },
    { time: 14, text: "can't" },
    { time: 15, text: "find" },
    { time: 16, text: "an" },
    { time: 17, text: "open" },
    { time: 18, text: "door." },
    // Continue for all lyrics...
];

const lyricsContainer = document.getElementById('lyrics');
const audio = document.getElementById('audio');
let currentIndex = 0; // Track the current index of the lyrics

const displayLyrics = () => {
    if (currentIndex < lyrics.length) {
        const { time, text } = lyrics[currentIndex];
        if (audio.currentTime >= time) {
            lyricsContainer.innerHTML += text + ' '; // Display the lyric
            currentIndex++; // Move to the next lyric
            setTimeout(displayLyrics, 500); // Delay before displaying the next lyric
        } else {
            requestAnimationFrame(displayLyrics); // Continue checking the time
        }
    }
};

audio.addEventListener('play', () => {
    currentIndex = 0; // Reset index when audio plays
    displayLyrics(); // Start displaying lyrics
});
