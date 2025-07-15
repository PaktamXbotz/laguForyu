document.addEventListener('DOMContentLoaded', () => {
    const mainTitle = document.getElementById('main-title');
    const countdownElement = document.getElementById('countdown');
    const specialMessage = document.getElementById('special-message');
    const backgroundTextContainer = document.getElementById('background-text-container');
    const myAudio = document.getElementById('myAudio');
    const playMusicButton = document.getElementById('play-music-button');

    // --- KONFIGURASI PENTING - SILA UBAH INI! ---

    // 1. Target Tarikh Istimewa (Hari Lahir/Anniversary/Tarikh Penting)
    // Format: new Date(Tahun, Bulan-1, Hari, Jam, Minit, Saat)
    // INGAT: Bulan bermula dari 0 (0=Januari, 1=Februari, ... 11=Disember)
    // Contoh: 15 Julai 2025, jam 8:00 malam -> new Date(2025, 6, 15, 20, 0, 0).getTime()
    const targetDate = new Date('July 15, 2025 20:00:00').getTime();

    // 2. Nama Partner Awak
    const partnerName = "Awak"; // GANTI dengan nama partner awak

    // 3. Mesej Luahan Hati Awak (Ini akan muncul selepas countdown tamat)
    const confessionText = "Ini adalah luahan hati saya, khas untuk awak. <br> Awak telah mencuri hati saya sejak dulu lagi. <br> Adakah awak sudi menerima cinta saya? ❤️";

    // 4. Teks Bergerak di Latar Belakang (Boleh tambah banyak lagi!)
    const backgroundMovingTexts = ["Selamat Hari Jadi", "Cinta Hati Saya", "I Love You", "Jom Couple"];

    // --- END KONFIGURASI ---


    // Inisialisasi library Konfeti
    const jsConfetti = new JSConfetti();

    // Fungsi untuk mengemas kini Countdown
    function updateCountdown() {
        const now = new Date().getTime(); // Waktu sekarang
        const distance = targetDate - now; // Jarak masa ke tarikh target

        // Jika tarikh target telah berlalu
        if (distance < 0) {
            countdownElement.innerHTML = "Saatnya Telah Tiba!";
            mainTitle.innerHTML = `Untuk Kekasih Hati Saya, ${partnerName}!`;
            specialMessage.innerHTML = confessionText; // Tunjukkan mesej luahan hati
            specialMessage.classList.remove('hidden'); // Paparkan mesej
            playMusicButton.classList.remove('hidden'); // Paparkan butang muzik
            clearInterval(countdownInterval); // Hentikan countdown
            // triggerConfetti(); // Boleh aktifkan konfeti apabila countdown tamat, atau biarkan selepas butang muzik ditekan
            return;
        }

        // Kira hari, jam, minit, saat
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Tinggal ${days} Hari, ${hours} Jam, ${minutes} Minit, ${seconds} Saat lagi...`;
    }

    // Update countdown setiap 1 saat
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Panggil sekali untuk elak delay pada permulaan


    // Fungsi Muzik
    playMusicButton.addEventListener('click', () => {
        myAudio.play()
            .then(() => {
                console.log("Muzik sedang dimainkan.");
                playMusicButton.style.display = 'none'; // Sembunyikan butang selepas main
                triggerConfetti(); // Aktifkan konfeti apabila muzik dimainkan
            })
            .catch(error => {
                console.error("Gagal memainkan muzik:", error);
                alert("Sila benarkan autoplay untuk muzik (jika pelayar sekat) atau cuba lagi.");
            });
    });

    // Cuba mainkan muzik secara automatik apabila halaman dimuatkan (mungkin disekat oleh pelayar)
    myAudio.play().catch(() => {
        console.log("Autoplay muzik disekat oleh pelayar. Butang 'Mainkan Muzik Saya!' akan muncul.");
    });


    // Fungsi untuk Hasilkan Teks Berjalan di Latar Belakang
    function createBackgroundText() {
        const textContent = backgroundMovingTexts[Math.floor(Math.random() * backgroundMovingTexts.length)];
        const span = document.createElement('span');
        span.innerText = textContent;

        // Posisi rawak
        span.style.left = `${Math.random() * 100}vw`; // Dari mana-mana tempat di lebar skrin
        span.style.top = `${Math.random() * 100}vh`; // Dari mana-mana tempat di tinggi skrin
        
        // Tempoh animasi rawak untuk pelbagai kelajuan
        span.style.animationDuration = `${Math.random() * 10 + 15}s`;
        
        // Saiz fon rawak
        span.style.fontSize = `${Math.random() * 3 + 2}em`; // Antara 2em hingga 5em

        backgroundTextContainer.appendChild(span);

        // Buang elemen selepas animasi tamat untuk elak terlalu banyak elemen terkumpul
        span.addEventListener('animationiteration', () => {
            span.remove();
            // Buat yang baru setiap kali satu elemen selesai animasi
            createBackgroundText(); 
        });
    }

    // Hasilkan beberapa teks permulaan
    for(let i=0; i<10; i++) {
        createBackgroundText();
    }
    // Hasilkan teks baru secara berterusan (jika animationiteration tak berfungsi di semua pelayar)
    // setInterval(createBackgroundText, 1000);


    // Fungsi Konfeti (gunakan library js-confetti)
    function triggerConfetti() {
        jsConfetti.addConfetti({
            confettiRadius: 5,
            confettiNumber: 500,
            confettiColors: [
                '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7', // Warna-warna pink/merah
                '#88d8b0', '#ffc425', '#ff4d6d', '#fff0f3', '#fcf6bd', '#a9d6e5' // Warna tambahan
            ],
        });
    }

});
