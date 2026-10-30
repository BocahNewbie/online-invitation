document.addEventListener('DOMContentLoaded', () => {
    if (typeof CONFIG !== 'undefined') {
        // Terapan Background Foto
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

        // Teks Tampilan Utama
        document.getElementById('cover-title-tag').innerText = CONFIG.event.title;
        document.getElementById('hero-tag').innerText = CONFIG.event.title;
        document.getElementById('hero-date').innerText = CONFIG.event.dateText;
        document.getElementById('quote-text').innerText = `"${CONFIG.event.quote}"`;
        document.getElementById('quote-source').innerText = `— ${CONFIG.event.quoteSource}`;
        document.getElementById('btn-maps').href = CONFIG.event.mapsUrl;

        // Render Judul Cover & Profil Berdasarkan Tipe Acara
        const coverHeading = document.getElementById('cover-heading');
        const heroHeading = document.getElementById('hero-heading');
        const profileContainer = document.getElementById('profile-container');

        if (CONFIG.type === 'wedding') {
            const p = CONFIG.wedding.pria;
            const w = CONFIG.wedding.wanita;
            coverHeading.innerHTML = `${p.nama.split(',')[0]} <br>& <br>${w.nama.split(',')[0]}`;
            heroHeading.innerHTML = `${p.nama.split(',')[0]} <br>& <br>${w.nama.split(',')[0]}`;

            profileContainer.innerHTML = `
                <div class="text-center space-y-3 mb-8">
                    <h2 class="font-serif text-3xl sm:text-5xl font-bold text-cyan-300">Pasangan Mempelai</h2>
                </div>
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-md text-center space-y-4 border-cyan-500/30">
                        <img src="${p.foto}" class="w-36 h-36 rounded-full mx-auto object-cover border-2 border-cyan-400">
                        <h3 class="font-serif text-2xl font-bold text-slate-100">${p.nama}</h3>
                        <p class="text-xs text-slate-400">${p.orangTua}</p>
                        <a href="#" class="inline-flex items-center space-x-2 text-xs text-cyan-400"><i class="fa-brands fa-instagram"></i><span>${p.instagram}</span></a>
                    </div>
                    <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-md text-center space-y-4 border-purple-500/30">
                        <img src="${w.foto}" class="w-36 h-36 rounded-full mx-auto object-cover border-2 border-purple-400">
                        <h3 class="font-serif text-2xl font-bold text-slate-100">${w.nama}</h3>
                        <p class="text-xs text-slate-400">${w.orangTua}</p>
                        <a href="#" class="inline-flex items-center space-x-2 text-xs text-purple-400"><i class="fa-brands fa-instagram"></i><span>${w.instagram}</span></a>
                    </div>
                </div>
            `;
        } else {
            const s = CONFIG.singleProfile;
            coverHeading.innerText = s.nama;
            heroHeading.innerText = s.nama;

            profileContainer.innerHTML = `
                <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-md text-center space-y-4 max-w-md mx-auto border-cyan-500/30">
                    <img src="${s.foto}" class="w-36 h-36 rounded-full mx-auto object-cover border-2 border-cyan-400 shadow-xl">
                    <h3 class="font-serif text-2xl font-bold text-slate-100">${s.nama}</h3>
                    <p class="text-xs text-slate-400">${s.subtext}</p>
                    <a href="#" class="inline-flex items-center space-x-2 text-xs text-cyan-400"><i class="fa-brands fa-instagram"></i><span>${s.instagram}</span></a>
                </div>
            `;
        }

        // Render Jadwal Acara
        const schedContainer = document.getElementById('schedule-container');
        if (schedContainer && CONFIG.schedules) {
            schedContainer.innerHTML = '';
            CONFIG.schedules.forEach(item => {
                const card = document.createElement('div');
                card.className = 'bg-slate-900/70 border border-slate-800 p-8 rounded-2xl backdrop-blur-md text-center space-y-3';
                card.innerHTML = `
                    <h3 class="font-serif text-2xl font-bold text-cyan-300">${item.name}</h3>
                    <p class="text-slate-300 text-sm font-semibold">${item.time}</p>
                    <p class="text-xs text-slate-400">${item.location}<br>${item.address}</p>
                `;
                schedContainer.appendChild(card);
            });
        }

        // Render Galeri
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid && CONFIG.gallery) {
            galleryGrid.innerHTML = '';
            CONFIG.gallery.forEach(url => {
                const wrap = document.createElement('div');
                wrap.className = 'overflow-hidden rounded-2xl border border-slate-800 shadow-lg group';
                wrap.innerHTML = `<img src="${url}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">`;
                galleryGrid.appendChild(wrap);
            });
        }

        // Render Bank/Amplop
        const bankContainer = document.getElementById('bank-container');
        if (bankContainer && CONFIG.bankAccounts) {
            bankContainer.innerHTML = '';
            CONFIG.bankAccounts.forEach((acc, idx) => {
                const el = document.createElement('div');
                el.className = 'bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-md space-y-3';
                el.innerHTML = `
                    <span class="text-xs font-bold text-cyan-400 uppercase tracking-widest">${acc.bank}</span>
                    <p id="bank-num-${idx}" class="text-2xl font-mono font-bold text-slate-100">${acc.number}</p>
                    <p class="text-xs text-slate-400">a.n. ${acc.owner}</p>
                    <button onclick="copyAccNumber('bank-num-${idx}')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700">
                        <i class="fa-solid fa-copy mr-1.5"></i> Salin Nomor Rekening
                    </button>
                `;
                bankContainer.appendChild(el);
            });
        }
    }

    // Nama Tamu Dinamis dari URL (?to=Nama+Tamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam) {
        document.getElementById('guest-name').innerText = guestParam;
        document.getElementById('input-name').value = guestParam;
    }

    // Buka Undangan
    document.getElementById('btn-open').addEventListener('click', () => {
        const cover = document.getElementById('sec-cover');
        cover.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            cover.style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
        }, 1000);
    });

    // Hitung Mundur (Countdown)
    const targetDate = new Date(CONFIG.event.targetCountdown).getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        if (diff > 0) {
            document.getElementById('days').innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById('hours').innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById('minutes').innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById('seconds').innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
        }
    }, 1000);

    document.addEventListener('DOMContentLoaded', () => {
    // ... kode integrasi config, countdown, dll tetap sama ...

    const rsvpForm = document.getElementById('rsvp-form');
    const commentsContainer = document.getElementById('comments-container');

    // 1. FUNGSI UNTUK MENGAMBIL & MENAMPILKAN SEMUA UCAPAN DARI GOOGLE SHEETS
    function fetchComments() {
        if (!CONFIG.scriptUrl || CONFIG.scriptUrl.includes("PASTE_URL")) {
            commentsContainer.innerHTML = '<p class="text-xs text-slate-500 text-center">Belum ada ucapan tersimpan.</p>';
            return;
        }

        commentsContainer.innerHTML = '<p class="text-xs text-cyan-400 text-center">Memuat ucapan...</p>';

        fetch(CONFIG.scriptUrl)
            .then(res => res.json())
            .then(data => {
                commentsContainer.innerHTML = '';
                if (data.length === 0) {
                    commentsContainer.innerHTML = '<p class="text-xs text-slate-500 text-center">Belum ada ucapan. Jadilah yang pertama memberikan ucapan!</p>';
                    return;
                }

                data.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-left space-y-1';
                    el.innerHTML = `
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-cyan-300 text-sm">${escapeHtml(item.name)}</span>
                            <span class="text-[10px] px-2 py-0.5 rounded-full ${item.status === 'Hadir' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'}">${item.status}</span>
                        </div>
                        <p class="text-xs text-slate-300">${escapeHtml(item.message)}</p>
                        <span class="text-[9px] text-slate-500 block pt-1">${item.date || ''}</span>
                    `;
                    commentsContainer.appendChild(el);
                });
            })
            .catch(err => {
                console.error("Gagal memuat ucapan:", err);
                commentsContainer.innerHTML = '<p class="text-xs text-red-400 text-center">Gagal memuat ucapan.</p>';
            });
    }

    // Panggil fungsi saat halaman selesai dimuat
    fetchComments();

    // 2. FUNGSI KIRIM UCAPAN BARU KE GOOGLE SHEETS
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const name = document.getElementById('input-name').value;
        const status = document.getElementById('input-status').value;
        const msg = document.getElementById('input-message').value;

        if (!CONFIG.scriptUrl || CONFIG.scriptUrl.includes("PASTE_URL")) {
            alert("URL Database Google Script belum dipasang di config.js!");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerText = "Mengirim...";

        const payload = {
            name: name,
            status: status,
            message: msg
        };

        fetch(CONFIG.scriptUrl, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            alert('Terima kasih! Ucapan Anda telah tersimpan.');
            document.getElementById('input-message').value = '';
            submitBtn.disabled = false;
            submitBtn.innerText = "Kirim Ucapan";
            
            // Refresh daftar ucapan agar ucapan baru langsung muncul
            fetchComments();
        })
        .catch(err => {
            console.error("Gagal mengirim ucapan:", err);
            alert('Terjadi kesalahan saat menyimpan ucapan. Silakan coba lagi.');
            submitBtn.disabled = false;
            submitBtn.innerText = "Kirim Ucapan";
        });
    });

    function escapeHtml(text) {
        return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace/>/g, "&gt;") : '';
    }
});

function copyAccNumber(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Nomor rekening berhasil disalin!');
    });
}
