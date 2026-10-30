document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC GUEST NAME FROM URL (?to=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam) {
        document.getElementById('guest-name').innerText = guestParam;
        document.getElementById('input-name').value = guestParam;
    }

    // 2. OPEN INVITATION & PLAY MUSIC
    const btnOpen = document.getElementById('btn-open');
    const cover = document.getElementById('cover');
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

        // Play Audio
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

    // 3. COUNTDOWN TIMER
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

    // 4. RSVP FORM SUBMISSION
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

// 5. COPY TO CLIPBOARD FUNCTION
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Nomor rekening berhasil disalin!');
    });
}