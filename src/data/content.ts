import { Achievement, Experience, Experiment, Project, SkillCategory, SocialLinks } from '@/types';

export const personalInfo = {
  name: 'Emircan Can',
  monogram: 'EC',
  location: {
    en: 'Malatya, Türkiye',
    tr: 'Malatya, Türkiye',
  },
  university: {
    en: 'İnönü University',
    tr: 'İnönü Üniversitesi',
  },
  department: {
    en: 'Software Engineering (Senior / 4th Year)',
    tr: 'Yazılım Mühendisliği (4. Sınıf / Lisans)',
  },
  roles: {
    en: ['AI Developer', 'Full-Stack Developer', 'Playwright Test Engineer'],
    tr: ['Yapay Zeka Geliştirici', 'Full-Stack Geliştirici', 'Playwright Test Mühendisi'],
  },
  tagline: {
    en: 'I build intelligent systems that solve real-world problems.',
    tr: 'Gerçek dünya problemlerini çözen akıllı sistemler geliştiriyorum.',
  },
  bio: {
    en: 'Fourth-year Software Engineering student at İnönü University. I build software across full-stack web, native mobile, AI/ML, computer vision, and automated end-to-end testing. From autonomous Mars rover telemetry to peer-to-peer disaster communications, I enjoy engineering dependable software that thrives under real constraints.',
    tr: 'İnönü Üniversitesi Yazılım Mühendisliği 4. sınıf öğrencisiyim. Full-stack web, mobil, yapay zeka/makine öğrenmesi, bilgisayarlı görü ve uçtan uca test otomasyonu alanlarında sistemler geliştiriyorum. Otonom Mars keşif aracı telemetrisinden afet durumlarında çalışan P2P mesh ağlarına kadar, gerçek kısıtlar altında çalışan güvenilir yazılımlar üretmeyi seviyorum.',
  },
  status: {
    en: 'Available for Opportunities',
    tr: 'Yeni Fırsatlara Açık',
  },
};

export const socialLinks: SocialLinks = {
  email: 'canemircan38@gmail.com',
  github: 'https://github.com/emir-canswe',
  linkedin: 'https://www.linkedin.com/in/emircan-can-4034662a1/',
  instagram: 'https://instagram.com/emir10_can',
};

export const stats = [
  {
    value: '10+',
    label: {
      en: 'Projects Engineered',
      tr: 'Tamamlanan Proje',
    },
    sub: {
      en: 'Web, Mobile, AI & Systems',
      tr: 'Web, Mobil, YZ & Sistemler',
    },
  },
  {
    value: '2nd',
    label: {
      en: 'Malatya Hackathon',
      tr: 'Malatya Hackathon Derecesi',
    },
    sub: {
      en: 'SENTINEL OS AI Telemetry',
      tr: 'SENTINEL OS Telemetri Sistemi',
    },
  },
  {
    value: '6',
    label: {
      en: 'Programming Languages',
      tr: 'Programlama Dili',
    },
    sub: {
      en: 'Python, Java, Kotlin, Dart, TS, JS',
      tr: 'Python, Java, Kotlin, Dart, TS, JS',
    },
  },
  {
    value: '100%',
    label: {
      en: 'Reliability Mindset',
      tr: 'Güvenilirlik Odaklı',
    },
    sub: {
      en: 'E2E Testing & Robust Architectures',
      tr: 'E2E Test ve Güçlü Mimari',
    },
  },
];

export const experiences: Experience[] = [
  {
    company: 'Codenorm',
    role: {
      en: 'Playwright Test Engineer',
      tr: 'Playwright Test Mühendisi',
    },
    period: {
      en: 'Jul 2025 – Present',
      tr: 'Tem 2025 – Günümüz',
    },
    location: 'Remote',
    type: {
      en: 'Part-Time / Contract',
      tr: 'Yarı Zamanlı / Sözleşmeli',
    },
    highlights: {
      en: [
        'Design, build, and maintain enterprise end-to-end automated test suites using Playwright and TypeScript.',
        'Implement resilient locator strategies, cross-browser regression suites, and automated visual testing.',
        'Integrate automated tests into CI/CD pipelines to catch critical regressions before production releases.',
      ],
      tr: [
        'Playwright ve TypeScript kullanarak kurumsal uçtan uca (E2E) otomatik test senaryoları tasarlıyor ve geliştiriyorum.',
        'Kırılgan olmayan dinamik seçici stratejileri, çoklu tarayıcı regresyon testleri ve görsel doğrulama uyguluyorum.',
        'Canlıya çıkış öncesi kritik hataları yakalamak amacıyla testleri CI/CD süreçlerine entegre ediyorum.',
      ],
    },
    tech: ['Playwright', 'TypeScript', 'Node.js', 'CI/CD', 'Automated Testing', 'Test Architecture'],
  },
  {
    company: 'AIHexa',
    role: {
      en: 'Full-Stack Developer Intern',
      tr: 'Full-Stack Geliştirici Stajyeri',
    },
    period: {
      en: 'Jul 2026 – Aug 2026',
      tr: 'Tem 2026 – Ağu 2026',
    },
    location: 'Hybrid',
    type: {
      en: 'Internship',
      tr: 'Staj',
    },
    highlights: {
      en: [
        'Engineered responsive front-end user interfaces and integrated resilient REST/GraphQL backend services.',
        'Implemented modern state management, real-time data sync, and high-performance database queries.',
        'Collaborated in an agile engineering team delivering production features under sprint deadlines.',
      ],
      tr: [
        'Duyarlı ön yüz arayüzleri geliştirdim ve dayanıklı REST/GraphQL arka uç servisleriyle entegrasyon sağladım.',
        'Modern durum yönetimi, gerçek zamanlı veri senkronizasyonu ve optimize edilmiş veritabanı sorguları kurdum.',
        'Sprint teslim süreleri dahilinde canlı özellikler sunan çevik mühendislik ekibinde aktif rol aldım.',
      ],
    },
    tech: ['React', 'Next.js', 'TypeScript', 'Python / FastAPI', 'PostgreSQL', 'Docker'],
  },
];

export const projects: Project[] = [
  {
    id: 'sentinel-os',
    title: 'SENTINEL OS',
    category: 'AI & Data',
    featured: true,
    award: {
      en: '🏆 Malatya Hackathon — 2nd Place',
      tr: '🏆 Malatya Hackathon — İkincilik Ödülü',
    },
    shortDesc: {
      en: 'Autonomous edge-AI for a Mars rover that decides, on-device, which sensor data is worth sending to Earth under tight bandwidth and a 3–22 minute light delay.',
      tr: 'Bant genişliği kısıtları ve 3–22 dakikalık ışık gecikmesi altında, hangi sensör verisinin Dünya\'ya gönderilmeye değer olduğuna cihaz üzerinde karar veren otonom Mars gezgini edge-AI sistemi.',
    },
    longDesc: {
      en: 'A full-stack telemetry system that fuses three learning paradigms in one decision engine — offline LSTM prediction errors, online learning (River HalfSpaceTrees, learns on every reading), and reinforcement learning (a Q-table that adapts the transmission threshold to battery level) — plus cosine-similarity novelty detection for never-before-seen signatures. It does real lossless binary compression (float64 → delta encoding → zlib DEFLATE, with a decoder to prove it\'s lossless), models a 3-tier space architecture (Rover → Orbiter → Earth cloud with federated feedback), and uses an LLM (Llama 3.3 70B via Groq) kept off the critical path purely for human-readable explanations. Built on NASA\'s real SMAP/MSL anomaly dataset (12 Curiosity channels). Includes a live dashboard with a 3D rover model and a real Mars map.',
      tr: 'Üç farklı öğrenme paradigmasını tek bir karar motorunda birleştiren tam kapsamlı telemetri mimarisi: Çevrimdışı LSTM tahmin hataları, çevrimiçi öğrenme (River HalfSpaceTrees ile her sensör okumasında öğrenir) ve pekiştirmeli öğrenme (Q-table ile iletim eşiğini anlık batarya seviyesine göre dinamik ayarlar) + daha önce hiç görülmemiş sinyaller için kosinüs benzerliği yenilik tespiti. Gerçek kayıpsız ikili sıkıştırma (float64 → delta kodlama → zlib DEFLATE, kayıpsız olduğunu kanıtlayan kod çözücü ile), 3 katmanlı uzay mimarisi (Gezgin → Yörünge Aracı → Federe geri bildirimli Dünya bulutu) modeller ve kritik yolun dışında tutularak yalnızca insan tarafından okunabilir açıklamalar sunan LLM (Groq üzerinde Llama 3.3 70B) kullanır. NASA\'nın gerçek SMAP/MSL anomali veri seti (12 Curiosity kanalı) üzerinde test edilmiş olup 3D gezgin modeli ve gerçek Mars haritası içeren canlı bir gösterge paneline sahiptir.',
    },
    tech: [
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy (async)',
      'WebSocket',
      'React 18',
      'Vite',
      'Three.js',
      'Leaflet',
      'Recharts',
      'Tailwind',
      'Docker',
      'LSTM',
      'River Online Learning',
      'Q-Learning',
    ],
    demoUrl: 'http://37.247.101.197',
    metrics: [
      { label: { en: 'Bandwidth Saved', tr: 'Bant Genişliği Tasarrufu' }, value: '87.4%' },
      { label: { en: 'Light Delay Tolerance', tr: 'Işık Gecikmesi Dayanımı' }, value: '3–22 min' },
      { label: { en: 'NASA MSL Channels', tr: 'NASA MSL Sensör Kanalı' }, value: '12 Channels' },
      { label: { en: 'Decision Latency', tr: 'Karar Gecikmesi' }, value: '< 15 ms' },
    ],
  },
  {
    id: 'acil-afet',
    title: 'Acil Afet',
    category: 'Mobile',
    featured: true,
    award: {
      en: '🎓 İnüfest (İnönü University Festival) — Participant',
      tr: '🎓 İnüfest (İnönü Üniversitesi Festivali) — Katılımcı',
    },
    shortDesc: {
      en: 'An offline emergency-communication app that keeps people connected when the cellular network and power infrastructure collapse.',
      tr: 'Hücresel şebekeler ve internet çöktüğünde insanların iletişimde kalmasını sağlayan çevrimdışı acil durum haberleşme uygulaması.',
    },
    longDesc: {
      en: 'When cellular operators and the internet collapse — for example after an earthquake — people can still message each other directly through a device-to-device mesh network, with no cell tower, Wi-Fi, or cloud required. Messages hop securely across nearby devices until they reach their intended recipients or emergency dispatch nodes. Designed for disaster scenarios where normal infrastructure fails. Presented at İnüfest, İnönü University.',
      tr: 'Hücresel operatörler ve internet altyapısı çöktüğünde — örneğin büyük bir deprem sonrasında — kullanıcılar hiçbir baz istasyonu, Wi-Fi veya internet bulutuna ihtiyaç duymadan cihazdan cihaza (D2D) mesh ağı üzerinden mesajlaşabilir. Mesajlar, hedef kişiye veya kurtarma ekiplerine ulaşana dek çevredeki cihazlar arasında güvenle sıçrayarak iletilir. İnönü Üniversitesi İnüfest etkinliğinde başarıyla sunulmuştur.',
    },
    tech: ['Mesh Networking', 'Offline P2P', 'Mobile', 'Bluetooth LE', 'Wi-Fi Direct', 'Cryptographic Addressing'],
    metrics: [
      { label: { en: 'Infrastructure Dependency', tr: 'Altyapı Bağımlılığı' }, value: '0% (Offline)' },
      { label: { en: 'Routing Protocol', tr: 'Yönlendirme Protokolü' }, value: 'Ad-Hoc Mesh' },
      { label: { en: 'Hop Relaying', tr: 'Cihazlar Arası Atlama' }, value: 'Multi-Hop P2P' },
    ],
  },
  {
    id: 'internmeet',
    title: 'InternMeet',
    category: 'Web',
    shortDesc: {
      en: 'Full-stack internship platform connecting students with verified companies — featuring role-based access, transparent reviews, and application tracking.',
      tr: 'Öğrencileri şirketlerle buluşturan full-stack staj platformu — rol tabanlı erişim (Öğrenci / Şirket / Admin), başvuru takibi ve şeffaf şirket değerlendirmeleri.',
    },
    tech: ['Spring Boot 3', 'Java 17', 'React 19', 'PostgreSQL', 'JWT', 'Docker', 'REST API'],
    metrics: [
      { label: { en: 'Role Architecture', tr: 'Rol Mimarisi' }, value: 'RBAC (3 Roles)' },
      { label: { en: 'Security', tr: 'Güvenlik' }, value: 'Stateless JWT' },
    ],
  },
  {
    id: 'forest-eye',
    title: 'ForestEye',
    category: 'AI & Data',
    shortDesc: {
      en: 'Forest-fire early-warning system that predicts high-risk zones from NASA FIRMS satellite + weather data on a 10 km grid and sends multi-channel alerts.',
      tr: 'NASA FIRMS uydu ve meteoroloji verilerini 10 km grid üzerinde analiz ederek yüksek riskli orman yangını bölgelerini tahmin eden ve çok kanallı acil uyarı gönderen erken uyarı sistemi.',
    },
    tech: ['FastAPI', 'React', 'PostGIS', 'Leaflet', 'Redis', 'Docker', 'NASA FIRMS API'],
    githubUrl: 'https://github.com/emir-canswe/ForestEye-',
    metrics: [
      { label: { en: 'Grid Resolution', tr: 'Grid Çözünürlüğü' }, value: '10 km' },
      { label: { en: 'Alert Dispatch', tr: 'Uyarı Kanalları' }, value: 'SMS / Email / Push' },
    ],
  },
  {
    id: 'elion',
    title: 'ELION',
    category: 'Mobile',
    shortDesc: {
      en: 'Offline-first personal assistant that knows you — voice-command task creation plus an honest, witty AI-style morning briefing and evening review. 100% on-device.',
      tr: 'Kullanıcısını tanıyan çevrimdışı kişisel asistan — sesli komutla görev oluşturma, esprili ve samimi sabah brifingi ve akşam özeti. Tamamen cihaz üzerinde çalışır.',
    },
    tech: ['Kotlin', 'Jetpack Compose', 'Room', 'Hilt', 'MVVM', 'Speech Recognition'],
    githubUrl: 'https://github.com/emir-canswe/elionMobile',
    metrics: [
      { label: { en: 'Privacy', tr: 'Gizlilik' }, value: '100% On-Device' },
      { label: { en: 'Architecture', tr: 'Mimari' }, value: 'Modern MVVM + Hilt' },
    ],
  },
  {
    id: 'deadlock',
    title: 'Deadlock',
    category: 'Mobile',
    shortDesc: {
      en: 'Premium sliding-block puzzle with 500 monotonically-sorted levels, a deterministic Xorshift32 board generator, an optimal BFS solver, and custom synthesized audio.',
      tr: '500 sıralı seviye, deterministik Xorshift32 tahta üreticisi, optimal BFS çözücü algoritması ve 60/120 FPS akıcı ses sentezine sahip sliding-block bulmaca oyunu.',
    },
    tech: ['Flutter', 'Dart', 'BFS Solver', 'Xorshift32', 'Audio Synthesis', 'Mobile Engine'],
    githubUrl: 'https://github.com/emir-canswe/deatlock',
    metrics: [
      { label: { en: 'Levels', tr: 'Seviye Sayısı' }, value: '500 Levels' },
      { label: { en: 'Target FPS', tr: 'Hedef Kare Hızı' }, value: '60 / 120 FPS' },
    ],
  },
  {
    id: 'pixelpop',
    title: 'PixelPop',
    category: 'Mobile',
    shortDesc: {
      en: 'Block-Blast-inspired puzzle with deep strategy: special blocks (bomb, rainbow, ice, gold), power-ups, 4 game modes, 12 achievements, and a coin-based theme shop.',
      tr: 'Strateji odaklı blok bulmaca oyunu: Özel bloklar (bomba, gökkuşağı, buz, altın), güçlendiriciler, 4 farklı oyun modu, 12 başarım ve oyun içi tema mağazası.',
    },
    tech: ['Kotlin', 'Room', 'Android SDK', 'Custom Canvas', 'Game Loop'],
    metrics: [
      { label: { en: 'Game Modes', tr: 'Oyun Modu' }, value: '4 Modes' },
      { label: { en: 'Achievements', tr: 'Kayıtlı Başarım' }, value: '12 Badges' },
    ],
  },
  {
    id: 'phonepad',
    title: 'PhonePad',
    category: 'Mobile',
    shortDesc: {
      en: 'Turns an Android phone into a wireless Bluetooth HID mouse — no drivers, no Wi-Fi, near-zero latency. The phone advertises itself as a real mouse to any OS.',
      tr: 'Android telefonu kablosuz Bluetooth HID fareye dönüştürür — ek sürücü veya Wi-Fi gerekmez, sıfıra yakın gecikme ile her işletim sistemine gerçek fare olarak tanıtılır.',
    },
    tech: ['Kotlin', 'Jetpack Compose', 'Bluetooth HID Profile', 'Android BLE', 'Low Latency'],
    metrics: [
      { label: { en: 'Driver Needed', tr: 'Sürücü İhtiyacı' }, value: 'None (Native HID)' },
      { label: { en: 'Connection', tr: 'Bağlantı Türü' }, value: 'Direct Bluetooth' },
    ],
  },
  {
    id: 'cryptostealth',
    title: 'CryptoStealth',
    category: 'Security',
    shortDesc: {
      en: 'Desktop application fusing cryptography + steganography: AES-256 / RSA-2048 hybrid encryption hidden inside PNG pixels via LSB, with decoy layers and SHA-256 checks.',
      tr: 'Kriptografi ve steganografiyi birleştiren masaüstü güvenlik aracı: LSB ile PNG pikselleri içine gizlenen AES-256 / RSA-2048 hibrit şifreleme, tuzak katmanlar ve SHA-256 bütünlük doğrulaması.',
    },
    tech: ['Python', 'AES-256', 'RSA-2048', 'LSB Steganography', 'Cryptography', 'Pillow / NumPy'],
    metrics: [
      { label: { en: 'Cipher Standard', tr: 'Şifreleme Standardı' }, value: 'AES-256 + RSA-2048' },
      { label: { en: 'Steganography', tr: 'Gizleme Tekniği' }, value: 'Pixel LSB Injection' },
    ],
  },
  {
    id: 'screenbridge',
    title: 'ScreenBridge',
    category: 'Web',
    shortDesc: {
      en: 'Dual-monitor window manager with a computer-vision gesture bridge — drag windows across screens via web UI, or move a colored object in front of your webcam to fling windows.',
      tr: 'Bilgisayarlı görü tabanlı çift monitör pencere yöneticisi — web arayüzünden pencereleri taşıyın veya web kamerasına renkli bir nesne göstererek pencereleri ekranlar arası fırlatın.',
    },
    tech: ['Python', 'FastAPI', 'OpenCV', 'WebSocket', 'Win32 API', 'Computer Vision'],
    githubUrl: 'https://github.com/emir-canswe/ScreenBridge',
    metrics: [
      { label: { en: 'Interaction', tr: 'Etkileşim Türü' }, value: 'CV Gestures + Web' },
      { label: { en: 'OS Integration', tr: 'İşletim Sistemi' }, value: 'Windows Win32 API' },
    ],
  },
];

export const experiments: Experiment[] = [
  {
    id: 'signvoice',
    title: 'SignVoice',
    category: 'Mobile & AI',
    shortDesc: {
      en: 'Gesture-to-speech bridge translating hand motions into synthesized audio in real time.',
      tr: 'El hareketlerini gerçek zamanlı olarak sesli konuşmaya dönüştüren erişilebilirlik prototipi.',
    },
    tech: ['MediaPipe', 'Python', 'Mobile', 'Speech Synth'],
  },
  {
    id: 'opencv-playground',
    title: 'OpenCV Playground',
    category: 'Computer Vision',
    shortDesc: {
      en: 'High-speed face detection, edge contouring, and custom real-time computer vision filtering.',
      tr: 'Yüksek hızlı yüz algılama, kenar kontur tespiti ve gerçek zamanlı görüntü işleme filtreleri.',
    },
    tech: ['OpenCV', 'Python', 'NumPy', 'Video Processing'],
  },
  {
    id: 'r-data-analysis',
    title: 'R Data Analysis',
    category: 'Data Science',
    shortDesc: {
      en: 'Statistical hypothesis modeling, anomaly clustering, and publication-ready ggplot visual graphs.',
      tr: 'İstatistiksel hipotez modelleme, anomali kümeleme ve analitik veri görselleştirmeleri.',
    },
    tech: ['R', 'ggplot2', 'dplyr', 'Statistics'],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    name: {
      en: 'Programming Languages',
      tr: 'Programlama Dilleri',
    },
    skills: [
      { name: 'Python', highlight: true },
      { name: 'Java', highlight: true },
      { name: 'Kotlin', highlight: true },
      { name: 'Dart', highlight: true },
      { name: 'TypeScript', highlight: true },
      { name: 'JavaScript' },
      { name: 'SQL' },
      { name: 'R' },
    ],
  },
  {
    id: 'frameworks',
    name: {
      en: 'Frameworks & Libraries',
      tr: 'Framework & Kütüphaneler',
    },
    skills: [
      { name: 'Playwright', highlight: true },
      { name: 'FastAPI', highlight: true },
      { name: 'Spring Boot', highlight: true },
      { name: 'React / Next.js', highlight: true },
      { name: 'Flutter', highlight: true },
      { name: 'Jetpack Compose', highlight: true },
      { name: 'Tailwind CSS' },
      { name: 'WebSocket' },
    ],
  },
  {
    id: 'tools-db',
    name: {
      en: 'Tools, Systems & Databases',
      tr: 'Araçlar, Sistemler & Veritabanı',
    },
    skills: [
      { name: 'PostgreSQL', highlight: true },
      { name: 'Docker', highlight: true },
      { name: 'Git & GitHub', highlight: true },
      { name: 'Linux / Bash', highlight: true },
      { name: 'Android Studio' },
      { name: 'Redis' },
      { name: 'PostGIS' },
      { name: 'CI/CD Pipelines' },
    ],
  },
  {
    id: 'ml-cv',
    name: {
      en: 'AI, Machine Learning & Vision',
      tr: 'Yapay Zeka, Makine Öğrenmesi & Görü',
    },
    skills: [
      { name: 'OpenCV', highlight: true },
      { name: 'LSTM Networks', highlight: true },
      { name: 'River Online Learning', highlight: true },
      { name: 'Reinforcement Learning (Q-Learning)', highlight: true },
      { name: 'NASA Telemetry Datasets' },
      { name: 'Cosine Novelty Detection' },
      { name: 'Groq / LLaMA Integrations' },
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: 'hackathon-2025',
    title: {
      en: 'Malatya Hackathon — 2nd Place',
      tr: 'Malatya Hackathon — İkincilik Derecesi',
    },
    event: {
      en: 'Malatya Regional Innovation Hackathon',
      tr: 'Malatya Bölgesel İnovasyon Hackathonu',
    },
    award: {
      en: '2nd Place Award Winner',
      tr: '2.lik Ödülü',
    },
    projectRef: 'SENTINEL OS',
    date: '2025',
    icon: 'trophy',
    description: {
      en: 'Engineered and demonstrated SENTINEL OS, an autonomous edge-AI decision engine for Mars rover telemetry fusing LSTM, River online learning, and Q-table battery adaptation on real NASA anomaly data.',
      tr: 'NASA\'nın gerçek anomali verileri üzerinde LSTM, River çevrimiçi öğrenme ve batarya adaptif Q-table pekiştirmeli öğrenmeyi birleştiren otonom Mars gezgini edge-AI telemetri sistemi SENTINEL OS\'u geliştirerek 2.lik ödülüne layık görüldüm.',
    },
  },
  {
    id: 'inufest-showcase',
    title: {
      en: 'İnüfest Project Showcase',
      tr: 'İnüfest Proje Sergisi',
    },
    event: {
      en: 'İnönü University Science & Technology Festival',
      tr: 'İnönü Üniversitesi Bilim ve Teknoloji Festivali',
    },
    award: {
      en: 'Official Project Presenter',
      tr: 'Resmi Proje Sunumu',
    },
    projectRef: 'Acil Afet',
    date: '2024',
    icon: 'graduation-cap',
    description: {
      en: 'Presented "Acil Afet", a peer-to-peer mobile mesh communication solution allowing seamless civilian messaging during disaster-induced infrastructure breakdowns without cell towers or internet.',
      tr: 'Afet durumlarında baz istasyonu veya internet bağlantısı olmaksızın cihazdan cihaza mesh ağıyla haberleşmeyi sağlayan "Acil Afet" mobil projesini İnüfest festivalinde jüri ve katılımcılara sundum.',
    },
  },
];

export const uiText = {
  nav: {
    about: { en: 'About', tr: 'Hakkımda' },
    experience: { en: 'Experience', tr: 'Deneyim' },
    projects: { en: 'Projects', tr: 'Projeler' },
    skills: { en: 'Skills', tr: 'Yetenekler' },
    achievements: { en: 'Achievements', tr: 'Başarılar' },
    contact: { en: 'Contact', tr: 'İletişim' },
    status: { en: 'ONLINE', tr: 'ÇEVRİMİÇİ' },
  },
  hero: {
    badge: { en: 'TELEMETRY STATUS: NOMINAL', tr: 'TELEMETRİ DURUMU: AKTİF' },
    headingPrefix: { en: "Hello, I'm", tr: 'Merhaba, ben' },
    viewProjects: { en: 'View Projects', tr: 'Projeleri İncele' },
    downloadCv: { en: 'Download CV', tr: 'Özgeçmiş İndir' },
    contactMe: { en: 'Get in Touch', tr: 'İletişime Geç' },
    scrollDown: { en: 'SCROLL TO EXPLORE', tr: 'KEŞFETMEK İÇİN KAYDIRIN' },
  },
  about: {
    sectionTag: { en: '01 // TELEMETRY & PROFILE', tr: '01 // PROFİL & BİLGİ' },
    title: { en: 'Engineering Software for the Real World', tr: 'Gerçek Dünya İçin Yazılım Mühendisliği' },
    bioP1: {
      en: "I'm a fourth-year Software Engineering student at İnönü University in Malatya, Türkiye. My technical focus spans the entire development lifecycle: architecting resilient full-stack systems, crafting native mobile applications, implementing edge-AI / machine learning algorithms, and validating software quality through automated end-to-end testing.",
      tr: "İnönü Üniversitesi Yazılım Mühendisliği 4. sınıf öğrencisiyim. Teknik ilgi alanım yazılım geliştirmenin tüm yaşam döngüsünü kapsıyor: Güvenilir full-stack sistemler inşa etmek, yerel mobil uygulamalar geliştirmek, edge-AI ve makine öğrenmesi algoritmaları kurmak ve yazılım kalitesini otomatik E2E testlerle garanti altına almak.",
    },
    bioP2: {
      en: "Whether optimizing telemetry data transmission for simulated Mars rovers under severe bandwidth limits or engineering offline P2P mesh protocols for emergency disaster response, I believe in writing code that is performant, measurable, and reliable.",
      tr: "İster kısıtlı bant genişliğinde Mars keşif araçları için telemetri optimizasyonu yapmak, ister afet durumlarında altyapısız çalışan P2P mesh protokolleri geliştirmek olsun; her zaman yüksek performanslı, ölçülebilir ve dayanıklı kod üretmeye inanıyorum.",
    },
    interestsTitle: { en: 'Technical Focus Areas', tr: 'Temel Odak Alanları' },
    interests: [
      { en: 'Artificial Intelligence & ML', tr: 'Yapay Zeka & ML' },
      { en: 'Computer Vision (OpenCV)', tr: 'Bilgisayarlı Görü (OpenCV)' },
      { en: 'Test Automation (Playwright)', tr: 'Test Otomasyonu (Playwright)' },
      { en: 'Full-Stack Web Systems', tr: 'Full-Stack Web Sistemleri' },
      { en: 'Relational & Spatial Databases', tr: 'İlişkisel & Mekansal Veritabanları' },
      { en: 'Native & Cross-Platform Mobile', tr: 'Yerel & Çoklu Platform Mobil' },
    ],
  },
  experience: {
    sectionTag: { en: '02 // CAREER TIMELINE', tr: '02 // KARİYER ÇİZELGESİ' },
    title: { en: 'Professional Experience', tr: 'Profesyonel Deneyim' },
    subtitle: {
      en: 'Hands-on roles in software quality assurance, full-stack architecture, and production engineering.',
      tr: 'Yazılım kalite güvencesi, full-stack mimari ve canlı sistem mühendisliğinde aktif roller.',
    },
  },
  projects: {
    sectionTag: { en: '03 // MISSION LOG & BUILDS', tr: '03 // PROJE GÜNLÜĞÜ' },
    title: { en: 'Featured Projects & Systems', tr: 'Öne Çıkan Projeler & Sistemler' },
    subtitle: {
      en: 'Explore autonomous AI engines, offline mesh communications, full-stack platforms, and security tools.',
      tr: 'Otonom yapay zeka motorları, çevrimdışı mesh haberleşme, full-stack platformlar ve güvenlik araçları.',
    },
    filters: {
      All: { en: 'All Systems', tr: 'Tümü' },
      Web: { en: 'Web', tr: 'Web' },
      Mobile: { en: 'Mobile', tr: 'Mobil' },
      'AI & Data': { en: 'AI & Data', tr: 'YZ & Veri' },
      Security: { en: 'Security', tr: 'Güvenlik' },
    },
    featuredBadge: { en: 'FLAGSHIP PROJECT', tr: 'AMİRAL PROJE' },
    viewDeepArchitecture: { en: 'System Architecture & Details', tr: 'Sistem Mimarisi & Detaylar' },
    viewDemo: { en: 'Live Dashboard', tr: 'Canlı Panel' },
    viewRepo: { en: 'Source Code', tr: 'Kaynak Kodu' },
    experimentsTitle: { en: 'Laboratory & Micro-Experiments', tr: 'Laboratuvar & Mikro Deneyler' },
    experimentsSubtitle: {
      en: 'Focused explorations in computer vision, accessibility, and statistical analytics.',
      tr: 'Bilgisayarlı görü, erişilebilirlik ve istatistiksel analitik üzerine deneysel çalışmalar.',
    },
  },
  skills: {
    sectionTag: { en: '04 // SYSTEM CAPABILITIES', tr: '04 // SİSTEM YETENEKLERİ' },
    title: { en: 'Technical Arsenal', tr: 'Teknik Yetkinlikler' },
    subtitle: {
      en: 'Languages, frameworks, databases, and machine learning toolkits applied across production systems.',
      tr: 'Projelerimde ve kurumsal çalışmalarda aktif olarak kullandığım diller, çatılar ve araçlar.',
    },
  },
  achievements: {
    sectionTag: { en: '05 // RECOGNITION & AWARDS', tr: '05 // BAŞARILAR & ÖDÜLLER' },
    title: { en: 'Honors & Milestones', tr: 'Dereceler & Etkinlikler' },
    subtitle: {
      en: 'Recognized by engineering juries and academic conferences for innovative problem-solving.',
      tr: 'Yenilikçi problem çözümleriyle mühendislik jürileri ve akademik etkinliklerde elde edilen başarılar.',
    },
  },
  contact: {
    sectionTag: { en: '06 // COMMUNICATION CHANNEL', tr: '06 // İLETİŞİM KANALI' },
    title: { en: "Let's Build Something Impactful", tr: 'Birlikte Yeni Sistemler İnşa Edelim' },
    subtitle: {
      en: 'Open for software engineering roles, internships, AI/ML research collaborations, and hackathons.',
      tr: 'Yazılım mühendisliği pozisyonları, staj imkanları, YZ iş birlikleri ve hackathonlar için açığım.',
    },
    sendEmail: { en: 'Direct Email', tr: 'E-posta Gönder' },
    quickMessageTitle: { en: 'Quick Transmit / Mail Dispatch', tr: 'Hızlı Mesaj Gönderimi' },
    quickMessageDesc: {
      en: 'Type your message below and click Send to open it directly in your preferred email client.',
      tr: 'Mesajınızı aşağıya yazıp Gönder\'e tıklayarak doğrudan e-posta istemciniz üzerinden iletebilirsiniz.',
    },
    yourName: { en: 'Your Name or Organization', tr: 'Adınız veya Kurumunuz' },
    yourSubject: { en: 'Subject', tr: 'Konu' },
    yourMessage: { en: 'Message', tr: 'Mesajınız' },
    sendAction: { en: 'Launch Email Client', tr: 'E-postayı Gönder' },
    copyEmail: { en: 'Copy Email Address', tr: 'E-postayı Kopyala' },
    emailCopied: { en: 'Address Copied to Clipboard!', tr: 'E-posta Adresi Kopyalandı!' },
  },
  footer: {
    systemStatus: { en: 'ALL SYSTEMS OPERATIONAL', tr: 'TÜM SİSTEMLER AKTİF' },
    builtWith: {
      en: 'Engineered with Next.js 14, TypeScript & Tailwind CSS',
      tr: 'Next.js 14, TypeScript ve Tailwind CSS ile geliştirildi',
    },
    designedFor: {
      en: 'Optimized for recruiters, engineering leaders, and juries',
      tr: 'İK liderleri, mühendislik yöneticileri ve jüriler için optimize edildi',
    },
    backToTop: { en: 'BACK TO TOP', tr: 'YUKARI DÖN' },
    rights: { en: 'All rights reserved.', tr: 'Tüm hakları saklıdır.' },
  },
  modal: {
    close: { en: 'Close Window', tr: 'Pencereyi Kapat' },
    overview: { en: 'System Overview', tr: 'Sistem Genel Bakış' },
    deepDive: { en: 'Architectural Deep Dive', tr: 'Derin Mimari İnceleme' },
    keyMetrics: { en: 'Telemetry Metrics', tr: 'Telemetri Metrikleri' },
    technologies: { en: 'Technologies & Frameworks', tr: 'Kullanılan Teknolojiler' },
    visitDemo: { en: 'Launch Live System', tr: 'Canlı Sistemi Aç' },
    visitRepo: { en: 'Inspect Source Code', tr: 'Kaynak Kodunu İncele' },
  },
};
