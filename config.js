const CONFIG = {
    // 1. TIPE ACARA: Pilih salah satu -> "wedding", "khitanan", "birthday", atau "gathering"
    type: "wedding", 

    // 2. INFORMASI UTAMA ACARA
    event: {
        title: "The Wedding Of", // e.g., "Walimatul Khitan", "Birthday Celebration", "Syukuran & Makan Bersama"
        dateText: "Sabtu, 12 Desember 2026",
        targetCountdown: "December 12, 2026 08:00:00",
        quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
        quoteSource: "Q.S. Ar-Rum: 21",
        mapsUrl: "https://maps.google.com"
    },

    // 3. FOTO BACKGROUND PER SEKSI
    backgrounds: {
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920",
        hero: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1920",
        quote: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1920",
        mempelai: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1920",
        acara: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1920",
        galeri: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1920",
        amplop: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1920",
        rsvp: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1920"
    },

    // 4. DATA PROFIL (Diisi jika type = "wedding")
    wedding: {
        pria: {
            nama: "Mempelai Pria, S.Kom.",
            orangTua: "Putra Pertama dari Bapak Nama Ayah & Ibu Nama Ibu",
            foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500",
            instagram: "@username_pria"
        },
        wanita: {
            nama: "Mempelai Wanita, S.E.",
            orangTua: "Putri Kedua dari Bapak Nama Ayah & Ibu Nama Ibu",
            foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500",
            instagram: "@username_wanita"
        }
    },

    // 5. DATA PROFIL TUNGGAL (Diisi jika type = "khitanan", "birthday", atau "gathering")
    singleProfile: {
        nama: "M. Rizky Ramadhan",
        subtext: "Putra dari Bapak Fajar & Ibu Rina",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500",
        instagram: "@username_profile"
    },

    // 6. RANGKAIAN JADWAL ACARA
    schedules: [
        {
            name: "Akad Nikah / Syukuran",
            time: "08.00 - 10.00 WIB",
            location: "Gedung Graha Sena",
            address: "Jl. Ahmad Yani No. 45, Ciamis"
        },
        {
            name: "Resepsi / Ramah Tamah",
            time: "11.00 WIB - Selesai",
            location: "Gedung Graha Sena",
            address: "Jl. Ahmad Yani No. 45, Ciamis"
        }
    ],

    // 7. GALERI FOTO
    gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800"
    ],

    // 8. AMPLOP DIGITAL
    bankAccounts: [
        { bank: "BCA", number: "1234567890", owner: "Nama Pemilik Rekening" },
        { bank: "MANDIRI", number: "0987654321", owner: "Nama Pemilik Rekening" }
    ]
};
