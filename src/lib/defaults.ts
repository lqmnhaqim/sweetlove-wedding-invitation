import type { InvitationContent } from "./types";

const lt = (en: string, ms: string) => ({ en, ms });

export const defaultContent: InvitationContent = {
  couple: {
    bride: "Sweet",
    groom: "Love",
    brideFullName: lt("Sweet Binti Anonymous", "Sweet Binti Anonymous"),
    groomFullName: lt("Love Bin Anonymous", "Love Bin Anonymous"),
    monogram: "S&L",
    weddingDate: "2026-11-22",
    rsvpDeadline: "2026-10-22",
    tagline: lt("The Wedding Of", "Walimatul Urus"),
    heroImageUrl: "",
  },
  reception: {
    brideParents: lt(
      "Mr. Anonymous & Mrs. Anonymous",
      "Encik Anonymous & Puan Anonymous",
    ),
    groomParents: lt(
      "Mr. Anonymous & Mrs. Anonymous",
      "Encik Anonymous & Puan Anonymous",
    ),
    greeting: lt(
      "With joy and gratitude, we warmly invite Mr/Mrs/Encik/Puan/Dato'/Datin and family to celebrate the wedding of our beloved children with us.",
      "Dengan penuh kesyukuran dan kegembiraan, kami ingin menjemput Tuan/Puan/Encik/Dato'/Datin sekeluarga untuk meraikan majlis perkahwinan anakanda kesayangan kami.",
    ),
  },
  story: [
    {
      id: "story-1",
      year: "2020",
      title: lt("How We Met", "Bagaimana Kami Bertemu"),
      body: lt(
        "A quiet evening, a shared smile, and a conversation that lasted hours. Neither of us knew it then, but our story had just begun.",
        "Suatu petang yang tenang, satu senyuman, dan perbualan yang berlarutan. Tiada siapa yang menyangka, kisah kami baru sahaja bermula.",
      ),
    },
    {
      id: "story-2",
      year: "2021",
      title: lt("First Adventure", "Pengembaraan Pertama"),
      body: lt(
        "Long drives, midnight coffees, and a hundred small adventures. The world felt brighter with someone to share it.",
        "Perjalanan jauh, kopi tengah malam, dan seratus pengembaraan kecil. Dunia terasa lebih cerah apabila ada seseorang untuk berkongsi.",
      ),
    },
    {
      id: "story-3",
      year: "2023",
      title: lt("Building a Home", "Membina Sebuah Rumah"),
      body: lt(
        "Two suitcases, one apartment, and a thousand new routines. We learned that home isn't a place — it's a person.",
        "Dua beg pakaian, sebuah rumah, dan seribu rutin baru. Kami belajar bahawa rumah bukan sekadar tempat — tetapi seseorang.",
      ),
    },
    {
      id: "story-4",
      year: "2025",
      title: lt("The Proposal", "Pertunangan"),
      body: lt(
        "Under a sky full of stars, with hands trembling and hearts full, the question was asked. The answer came easily.",
        "Di bawah langit berbintang, dengan tangan menggigil dan hati yang penuh, soalan itu diajukan. Jawapannya datang dengan mudah.",
      ),
    },
  ],
  program: [
    {
      id: "p-1",
      time: "16:30",
      title: lt("Guest Arrival", "Ketibaan Tetamu"),
      description: lt("Welcome and reception", "Sambutan dan penerimaan"),
    },
    {
      id: "p-2",
      time: "17:00",
      title: lt("Ceremony", "Majlis Akad"),
      description: lt("Exchange of vows", "Ijab dan kabul"),
    },
    {
      id: "p-3",
      time: "18:00",
      title: lt("Cocktail", "Majlis Minum Petang"),
      description: lt("Aperitifs and conversation", "Hidangan ringan dan sesi mesra"),
    },
    {
      id: "p-4",
      time: "20:00",
      title: lt("Dinner", "Jamuan Makan Malam"),
      description: lt("Wedding banquet", "Jamuan perkahwinan"),
    },
    {
      id: "p-5",
      time: "22:30",
      title: lt("First Dance", "Persembahan Pengantin"),
      description: lt("An unforgettable moment", "Detik yang tak dilupakan"),
    },
    {
      id: "p-6",
      time: "23:00",
      title: lt("Party", "Majlis Meriah"),
      description: lt("Let's celebrate together", "Jom raikan bersama"),
    },
    {
      id: "p-7",
      time: "02:30",
      title: lt("Farewell", "Perpisahan"),
      description: lt("Until we meet again", "Sehingga kita bertemu kembali"),
    },
  ],
  gift: {
    intro: lt(
      "Your presence is the greatest gift of all. If you wish to celebrate with something more, please feel free to choose what suits you best.",
      "Kehadiran anda adalah hadiah yang paling bermakna. Jika anda ingin meraikan lagi dengan sesuatu yang istimewa, silalah pilih cara yang paling sesuai.",
    ),
    contributionLabel: lt("Contribution", "Sumbangan"),
    contributionDescription: lt(
      "If you prefer, the gift can be in the form of a cash contribution.",
      "Jika lebih sesuai, hadiah boleh diberikan dalam bentuk sumbangan tunai.",
    ),
    bankNote: lt(
      "If it suits you better, you can also send a bank transfer:",
      "Jika lebih mudah, anda juga boleh membuat pindahan bank:",
    ),
    iban: "FR76 0000 0000 0000 0000 0000 000",
  },
  ceremony: {
    title: lt("Wedding Ceremony", "Majlis Perkahwinan"),
    time: "16:00",
    name: lt("Mairie du 19ème Arrondissement", "Mairie du 19ème Arrondissement"),
    addressLine1: lt("5–7 Place Armand Carrel", "5–7 Place Armand Carrel"),
    addressLine2: lt("75019 Paris, France", "75019 Paris, Perancis"),
    description: lt(
      "Join us as we exchange our vows in an intimate ceremony surrounded by family and friends.",
      "Sertailah kami dalam majlis yang intim, dikelilingi oleh keluarga dan sahabat handai.",
    ),
    mapUrl: "https://maps.google.com/?q=Mairie+du+19eme+Paris",
    calendarUrl: "#",
  },
  dressCode: {
    title: lt("Formal — Black Tie Optional", "Formal — Black Tie (pilihan)"),
    description: lt(
      "We kindly invite our guests to dress elegantly for the occasion.",
      "Kami menjemput para tetamu berpakaian elegan untuk majlis ini.",
    ),
  },
  attire: {
    title: lt("Attire Guide", "Panduan Pakaian"),
    description: lt(
      "Dress Code: Formal / Traditional / Batik (linen, jersey toilette, and slippers are not allowed).",
      "Kod Pakaian: Formal / Tradisional / Batik (linen, jersi toilette, dan selipar tidak dibenarkan).",
    ),
    colorsToAvoidLabel: lt("Colours to Avoid", "Warna Untuk Dielakkan"),
    colorsToAvoid: [
      { id: "c-1", name: lt("Forest Green", "Hijau Hutan"), hex: "#2f4a1e" },
      { id: "c-2", name: lt("Beige / Tan", "Krim / Kuning Air"), hex: "#c2a888" },
      { id: "c-3", name: lt("Sage Green", "Hijau Sage"), hex: "#a3b682" },
    ],
    note: lt(
      "We've reserved certain colours for the bride, groom, and both families. To keep things special, we'd truly appreciate if you could avoid these shades on our big day. Thank you for your understanding lovelies!",
      "Kami telah mengkhaskan warna-warna tertentu untuk pengantin dan kedua-dua keluarga. Untuk menjaga keistimewaan majlis, kami amat menghargai jika anda dapat mengelakkan warna-warna ini pada hari kami. Terima kasih atas kerjasama anda!",
    ),
  },
  travel: {
    hotels: [
      {
        id: "h-1",
        name: lt("Grand Hotel", "Grand Hotel"),
        rating: lt("5 Star", "5 Bintang"),
        distance: lt("5 minutes from venue", "5 minit dari lokasi majlis"),
        note: lt("Special rate for wedding guests", "Kadar istimewa untuk tetamu majlis"),
      },
      {
        id: "h-2",
        name: lt("Boutique Inn", "Boutique Inn"),
        rating: lt("4 Star", "4 Bintang"),
        distance: lt("10 minutes from venue", "10 minit dari lokasi majlis"),
        note: lt("Charming and intimate", "Mesra dan selesa"),
      },
      {
        id: "h-3",
        name: lt("City Center Hotel", "City Center Hotel"),
        rating: lt("4 Star", "4 Bintang"),
        distance: lt("15 minutes from venue", "15 minit dari lokasi majlis"),
        note: lt("Great for exploring the city", "Sesuai untuk meneroka bandar"),
      },
    ],
    byAir: lt(
      "The nearest airport is approximately 30 minutes from the venue. We recommend booking your flight early.",
      "Lapangan terbang terdekat kira-kira 30 minit dari lokasi majlis. Kami mengesyorkan tempahan penerbangan lebih awal.",
    ),
    byCar: lt(
      "Complimentary parking will be available at the venue. GPS coordinates will be shared closer to the date.",
      "Tempat letak kereta percuma disediakan di lokasi majlis. Koordinat GPS akan dikongsi hampir dengan tarikh majlis.",
    ),
    thingsToDo: [
      lt("Historic Old Town", "Bandar Lama Bersejarah"),
      lt("Beautiful Beaches", "Pantai Yang Indah"),
      lt("Local Markets", "Pasar Tempatan"),
      lt("Fine Dining", "Santapan Eksklusif"),
    ],
    contactEmail: "wedding@example.com",
    contactPhone: "+1 (234) 567-890",
  },
  adminPin: "1234",
};
