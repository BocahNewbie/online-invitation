document.addEventListener('DOMContentLoaded', () => {
    // 1. TERAPKAN FOTO BACKGROUND PER BAGIAN DARI CONFIG.JS
    if (typeof CONFIG !== 'undefined') {
        const bgMap = {
            'sec-cover': CONFIG.backgrounds.cover,
            'sec-hero': CONFIG.backgrounds.hero,
            'sec-quote': CONFIG.backgrounds.quote,
            'sec-mempelai': CONFIG.backgrounds.mempelai,
            'sec-acara': CONFIG.backgrounds.acara,
            'sec-galeri': CONFIG.backgrounds.galeri,
            'sec-amplop': CONFIG.backgrounds.amplop,
            'sec-rsvp': CONFIG.backgrounds.rsvp
        };

        for (const [id, url] of Object.entries(bgMap)) {
            const el = document.getElementById(id);
            if (el && url) el.style.backgroundImage = `url('${url}')`;
        }

        // Apply Foto & Profil Mempelai
        document.getElementById('img-pria').src = CONFIG.pria.foto;
        document.getElementById('nama-pria').innerText = CONFIG.pria.nama;
        document.getElementById('ortu-pria').innerText = CONFIG.pria.orangTua;
        document.getElementById('text-ig-pria').innerText = CONFIG.pria.instagram;

        document.getElementById('img-wanita').src = CONFIG.wanita.foto;
        document.getElementById('nama-wanita').innerText = CONFIG.wanita.nama;
        document.getElementById('ortu-wanita').innerText = CONFIG.wanita.orangTua;
        document.getElementById('text-ig-wanita').innerText = CONFIG.wanita.instagram;

        // Render Galeri Foto
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid && CONFIG.gallery) {
            galleryGrid.innerHTML = '';
            CONFIG.gallery.forEach(imgUrl => {
                const imgWrap = document.createElement('div');
                imgWrap.className = 'overflow-hidden rounded-2xl border border-slate-800 shadow-lg group';
                imgWrap.innerHTML = `<img src="${imgUrl}" class="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500">`;
                galleryGrid.appendChild(imgWrap);
            });
        }
    }

    // 2. DYNAMIC GUEST NAME FROM URL (?to=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam) {
        document.getElementById('guest-name').innerText = guestParam;
        document.getElementById('input-name').value = guestParam;
    }

    // 3. OPEN INVITATION & PLAY MUSIC
    const btnOpen = document.getElementById('btn-open');
    const cover = document.getElementById('sec-cover');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('wedding-audio');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    let isPlaying = false;

    btnOpen.addEventListener('click', () => {
        cover.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            cover.style.display = 'none';
            mainContent.classList.remove('hidden');
            audioControl.classList.remove('hidden');
        }, 1000);

        audio.play().then(() => {
            isPlaying = true;
            audioIcon.classList.add('spin-slow');
        }).catch(err => console.log("Autoplay blocked:", err));
    });

    audioControl.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audioIcon.classList.remove('spin-slow');
        } else {
            audio.play();
            audioIcon.classList.add('spin-slow');
        }
        isPlaying = !isPlaying;
    });

    // 4. COUNTDOWN TIMER
    const targetDate = new Date('December 12, 2026 08:00:00').getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }
    }, 1000);

    // 5. RSVP FORM SUBMISSION
    const rsvpForm = document.getElementById('rsvp-form');
    const commentsContainer = document.getElementById('comments-container');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('input-name').value;
        const status = document.getElementById('input-status').value;
        const message = document.getElementById('input-message').value;

        const commentEl = document.createElement('div');
        commentEl.className = 'bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-left space-y-1';
        commentEl.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="font-bold text-cyan-300 text-sm">${escapeHtml(name)}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full ${status === 'Hadir' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'}">${status}</span>
            </div>
            <p class="text-xs text-slate-300">${escapeHtml(message)}</p>
        `;

        commentsContainer.prepend(commentEl);
        document.getElementById('input-message').value = '';
        alert('Terima kasih atas ucapan dan konfirmasi Anda!');
    });

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Nomor rekening berhasil disalin!');
    });
}
