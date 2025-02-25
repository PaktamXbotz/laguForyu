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

const lyricsContainer = document.getElementById('lyrics');
const audio = document.getElementById('audio');

audio.addEventListener('play', () => {
    let startTime = audio.currentTime;
    let index = 0;

    const displayLyrics = () => {
        if (index < lyrics.length) {
            const { time, text } = lyrics[index];
            if (audio.currentTime >= time + startTime) {
                const words = text.split(' ');
                let wordIndex = 0;

                const displayWord = () => {
                    if (wordIndex < words.length) {
                        lyricsContainer.innerHTML += words[wordIndex] + ' ';
                        wordIndex++;
                        setTimeout(displayWord, 500); // Delay between words
                    } else {
                        index++;
                        lyricsContainer.innerHTML += '<br>'; // New line after each lyric
                        setTimeout(displayLyrics, 1000); // Delay before next lyric
                    }
                };

                displayWord();
            }
            requestAnimationFrame(displayLyrics);
        }
    };

    displayLyrics();
});
