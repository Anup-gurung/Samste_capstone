import { Project, StudentCreator, ProjectCategory } from '@/types/project';

export const INITIAL_CREATORS: StudentCreator[] = [
  {
    id: 'creator-1',
    name: 'Sarah Chen',
    role: 'Lead Mobile Architect',
    department: 'Computer Science & Engineering',
    year: 'Class of 2026',
    bio: 'Passionate about mobile micro-economies and peer-to-peer marketplaces that reduce collegiate waste and living costs.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    featuredProjectSlug: 'namzoed-mobile-marketplace',
  },
  {
    id: 'creator-2',
    name: 'Marcus Vance',
    role: 'Full-Stack & Cloud Engineer',
    department: 'Software Engineering',
    year: 'Class of 2025',
    bio: 'Focused on building energy intelligence dashboards and IoT telemetry streaming tools for campus decarbonization.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    featuredProjectSlug: 'ecotrack-sustainability-monitor',
  },
  {
    id: 'creator-3',
    name: 'Elena Rostova',
    role: 'Computer Vision Researcher',
    department: 'Artificial Intelligence & Robotics',
    year: 'Class of 2026',
    bio: 'Researching edge-inference neural networks and non-invasive biometric authentication systems for smart campuses.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    featuredProjectSlug: 'smart-attendance-biometric',
  },
  {
    id: 'creator-4',
    name: 'David K. Osei',
    role: 'AgTech & Spatial ML Specialist',
    department: 'Agricultural Informatics',
    year: 'Class of 2025',
    bio: 'Building drone-to-cloud computer vision pipelines to help smallholder farms detect blights weeks before visible necrosis.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    featuredProjectSlug: 'agrivision-ai-crop-health',
  },
  {
    id: 'creator-5',
    name: 'Amina Nour',
    role: 'Healthcare UX & Systems Engineer',
    department: 'Biomedical Informatics',
    year: 'Class of 2026',
    bio: 'Advocating for accessible clinical triage interfaces and rural health clinic connectivity across emerging regions.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    featuredProjectSlug: 'medconnect-telehealth-platform',
  },
  {
    id: 'creator-6',
    name: 'Lucas Ferreira',
    role: 'Distributed Systems & Web3 Developer',
    department: 'Information Systems',
    year: 'Class of 2025',
    bio: 'Investigating privacy-preserving zero-knowledge credentials for student study groups and campus club governance.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    featuredProjectSlug: 'campusconnect-decentralized-hub',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'namzoed-mobile-marketplace',
    title: 'NamZoed Mobile Marketplace',
    tagline: 'Hyperlocal student-to-student peer commerce platform',
    shortDescription: 'A streamlined mobile marketplace connecting campus buyers and sellers for textbooks, electronics, and dorm furniture with in-person campus verification.',
    fullDescription: 'NamZoed is a specialized mobile marketplace designed to overcome the high commission fees, scam hazards, and logistics delays of conventional e-commerce for university students. Engineered with Flutter and Firebase, it introduces verified student email verification, geo-fenced campus pick-up lockers, real-time peer messaging, and escrow payment processing.',
    category: 'Mobile Applications',
    status: 'Live Demo',
    coverImage: '/images/namzoed.jpg',
    gallery: [
      '/images/namzoed.jpg',
      '/images/hero-showcase.jpg',
    ],
    technologies: ['Flutter', 'Firebase', 'Node.js', 'Google Maps API', 'Stripe Connect'],
    student: INITIAL_CREATORS[0],
    academicYear: '2025-2026',
    semester: 'Senior Capstone',
    featured: true,
    demoUrl: 'https://example.com/demo/namzoed',
    repoUrl: 'https://github.com/example/namzoed-mobile',
    problem: 'University students spend hundreds of dollars each semester on textbooks and dorm supplies, while graduating seniors abandon functional furniture and equipment. Commercial platforms like eBay and Facebook Marketplace lack campus physical safety checks and incur heavy platform cuts.',
    solution: 'NamZoed provides a dedicated, credentialed student exchange where all buyers and sellers are authenticated via university SSO. Users can list items in under 30 seconds with automated image categorization, schedule safe daylight meetups at designated campus hubs, or utilize secure locker codes.',
    keyFeatures: [
      'Single Sign-On (SSO) university credential validation',
      'Instant item cataloging with on-device computer vision pricing estimation',
      'Geofenced safe-zone meetup mapping with campus security coordination',
      'End-to-end encrypted peer messaging and order tracking',
      'Zero seller listing fees for academic textbooks and course materials',
    ],
    challenges: [
      'Managing reliable real-time push notifications across intermittent campus Wi-Fi networks',
      'Designing an intuitive listing UX that takes fewer than 4 taps from camera capture to live publish',
      'Ensuring strict data protection for student schedule times during meetup coordination',
    ],
    learningOutcomes: [
      'Mastery of cross-platform state management using Bloc architecture',
      'Integration of complex geospatial radius queries in Cloud Firestore',
      'User interview testing across 120 student beta testers in dormitories',
    ],
    viewsCount: 1420,
    likesCount: 238,
    createdAt: '2026-02-14',
  },
  {
    id: 'proj-2',
    slug: 'ecotrack-sustainability-monitor',
    title: 'EcoTrack Carbon Monitor',
    tagline: 'Real-time campus energy telemetry and carbon offset platform',
    shortDescription: 'An interactive environmental impact dashboard monitoring building energy consumption, HVAC load, and solar generation across university facilities.',
    fullDescription: 'EcoTrack bridges the gap between campus facilities management and student awareness. By aggregating real-time Modbus telemetry from over 40 academic buildings and dormitory meters, EcoTrack converts raw kilowatt-hour data into relatable greenhouse gas metrics and actionable conservation challenges.',
    category: 'Web Development',
    status: 'Live Demo',
    coverImage: '/images/ecotrack.jpg',
    gallery: [
      '/images/ecotrack.jpg',
      '/images/hero-showcase.jpg',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'D3.js', 'PostgreSQL', 'TimescaleDB'],
    student: INITIAL_CREATORS[1],
    academicYear: '2025-2026',
    semester: 'Fall Semester',
    featured: true,
    demoUrl: 'https://example.com/demo/ecotrack',
    repoUrl: 'https://github.com/example/ecotrack-dashboard',
    problem: 'Universities set ambitious net-zero targets, but students and staff have zero visibility into their daily building energy footprint, causing unnecessary peak-load electricity waste during off-hours.',
    solution: 'EcoTrack provides an open-access, responsive dashboard showcasing campus-wide power draws, solar canopy production, and dormitory leaderboard competitions that gamify energy savings.',
    keyFeatures: [
      'Sub-minute ingestion pipeline handling 5,000 telemetry datapoints per minute',
      'Interactive time-series visualizations with dynamic weather and occupancy overlays',
      'Dormitory eco-challenges with automated weekly leaderboard scorecards',
      'Exportable CSV and PDF sustainability reports for university administration',
      'Predictive peak-load warning system alerting facilities engineers to anomaly surges',
    ],
    challenges: [
      'Handling high-frequency time-series aggregation without UI stuttering',
      'Normalizing varied legacy telemetry formats from four different meter vendors',
      'Creating accessible color palettes for dense multiple-metric area charts',
    ],
    learningOutcomes: [
      'Implementation of TimescaleDB continuous aggregates and retention policies',
      'Advanced SVG data rendering techniques with D3 and Canvas',
      'Collaboration with university sustainability officers and facilities engineers',
    ],
    viewsCount: 2190,
    likesCount: 412,
    createdAt: '2026-01-20',
  },
  {
    id: 'proj-3',
    slug: 'smart-attendance-biometric',
    title: 'Smart Attendance System',
    tagline: 'Computer vision biometric campus access & lecture roll-call',
    shortDescription: 'An edge-AI facial recognition attendance system that automates lecture roll-call with 99.4% accuracy, eliminating manual attendance sheets.',
    fullDescription: 'Traditional roll-call and paper sign-in sheets in 300-person lecture halls consume 10-15 minutes of instructional time and are prone to proxy attendance. Smart Attendance uses dual-camera edge sensors with lightweight facial recognition embeddings to take passive, non-disruptive attendance as students enter the auditorium.',
    category: 'Artificial Intelligence',
    status: 'Prototype',
    coverImage: '/images/smart-attendance.jpg',
    gallery: [
      '/images/smart-attendance.jpg',
      '/images/hero-showcase.jpg',
    ],
    technologies: ['Python', 'PyTorch', 'OpenCV', 'React', 'FastAPI', 'Docker', 'SQLite'],
    student: INITIAL_CREATORS[2],
    academicYear: '2025-2026',
    semester: 'Spring Capstone',
    featured: true,
    demoUrl: 'https://example.com/demo/smart-attendance',
    repoUrl: 'https://github.com/example/smart-attendance-vision',
    problem: 'Large undergraduate courses lose up to 15% of class time managing roll-calls, while manual paper rosters allow proxy signing and cause severe administrative burden at semester end.',
    solution: 'A privacy-first optical recognition pipeline that converts incoming camera frames into mathematical face vectors without saving raw photographic images, matching against enrolled course rosters in 200 milliseconds.',
    keyFeatures: [
      'Sub-200ms latency multi-face tracking in ambient lecture hall lighting',
      'Anti-spoofing liveness detection rejecting printed photos and phone screen displays',
      'Instant lecture synchronization with Canvas and Blackboard LMS gradebooks',
      'Faculty dashboard with attendance trends, late arrivals, and absence alerts',
      'Strict local-memory encryption complying with educational privacy regulations',
    ],
    challenges: [
      'Preventing false rejections in varying dim projector lighting environments',
      'Optimizing inference pipelines to run smoothly on edge Nvidia Jetson modules',
      'Designing transparent student privacy opt-out workflows',
    ],
    learningOutcomes: [
      'Deep learning model quantization and TensorRT hardware optimization',
      'Designing fault-tolerant REST APIs under concurrent batch load',
      'Conducting ethical AI impact assessments and student privacy surveys',
    ],
    viewsCount: 1850,
    likesCount: 305,
    createdAt: '2026-03-01',
  },
  {
    id: 'proj-4',
    slug: 'agrivision-ai-crop-health',
    title: 'AgriVision AI',
    tagline: 'Autonomous crop health telemetry & drone multispectral analysis',
    shortDescription: 'A precision agriculture platform combining drone NDVI imagery and soil sensors to pinpoint irrigation stress and crop blights early.',
    fullDescription: 'AgriVision bridges satellite data, autonomous drone flyovers, and in-ground moisture probes to provide farmers with centimeter-resolution crop vigor maps. Built by students in agricultural informatics, it democratizes precision agriculture tools that were previously only accessible to massive corporate agro-industrial combines.',
    category: 'Machine Learning',
    status: 'Live Demo',
    coverImage: '/images/agrivision.jpg',
    gallery: [
      '/images/agrivision.jpg',
      '/images/hero-showcase.jpg',
    ],
    technologies: ['PyTorch', 'Next.js', 'Tailwind CSS', 'Mapbox GL', 'GDAL', 'FastAPI'],
    student: INITIAL_CREATORS[3],
    academicYear: '2025-2026',
    semester: 'Senior Research',
    featured: true,
    demoUrl: 'https://example.com/demo/agrivision',
    repoUrl: 'https://github.com/example/agrivision-ai',
    problem: 'Early crop diseases and irrigation failures cost smallholder farmers up to 30% of their seasonal yield because physical field walking is slow and satellite images have low resolution.',
    solution: 'AgriVision parses high-resolution multispectral drone orthomosaics into normalized difference vegetation index (NDVI) layers, running semantic segmentation models to detect fungal blights weeks before visible leaf necrosis.',
    keyFeatures: [
      'Centimeter-accuracy NDVI and NDRE spectral map rendering in the browser',
      'Automated blight cluster detection with bounding polygon GPS coordinates',
      'Soil sensor telemetry correlation plotting moisture vs. canopy transpiration',
      'Offline-capable field technician PWA with GPS navigation to infected clusters',
      'Localized weather forecast integration with optimal spraying window recommendations',
    ],
    challenges: [
      'Tiling 2GB orthomosaic TIFF files into web-friendly vector and raster tiles',
      'Calibrating camera reflectance across cloudy and sunny flight days',
      'Creating a clear UI for farmers with limited technological experience',
    ],
    learningOutcomes: [
      'Geospatial data processing using GDAL and Rasterio in Python',
      'Custom convolutional neural network fine-tuning on aerial plant pathology datasets',
      'Field testing with local co-op growers across 400 acres of soybean farms',
    ],
    viewsCount: 2310,
    likesCount: 388,
    createdAt: '2026-01-11',
  },
  {
    id: 'proj-5',
    slug: 'medconnect-telehealth-platform',
    title: 'MedConnect Triage',
    tagline: 'Accessible clinical appointment and remote diagnostic workflow',
    shortDescription: 'A digital healthcare access platform connecting university health centers and rural clinics with asynchronous symptom intake and specialist triage.',
    fullDescription: 'MedConnect streamlines the patient intake lifecycle for university clinics and community healthcare centers. It features a conversational symptom triage questionnaire, secure WebRTC video consultations, automated prescription routing, and multi-language translation support.',
    category: 'Web Development',
    status: 'Prototype',
    coverImage: '/images/hero-showcase.jpg',
    gallery: [
      '/images/hero-showcase.jpg',
      '/images/ecotrack.jpg',
    ],
    technologies: ['React', 'WebRTC', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'FHIR API'],
    student: INITIAL_CREATORS[4],
    academicYear: '2025-2026',
    semester: 'Junior Capstone',
    featured: false,
    demoUrl: 'https://example.com/demo/medconnect',
    repoUrl: 'https://github.com/example/medconnect-app',
    problem: 'Students and rural patients face week-long wait times for primary care consultations, while clinics lack modern asynchronous triage tools to prioritize urgent clinical conditions.',
    solution: 'MedConnect provides an intuitive, HIPAA-aligned workflow where patients submit guided symptom checklists and photos before their appointment, enabling providers to review vital cues ahead of time.',
    keyFeatures: [
      'Guided symptom tree intake supporting 12 common student health categories',
      'WebRTC peer-to-peer encrypted high-definition video consulting',
      'Automated FHIR health record data synchronization',
      'Prescription refill requests with local pharmacy fulfillment routing',
      'Multi-language interface with Spanish, Mandarin, and Arabic support',
    ],
    challenges: [
      'Guaranteeing high reliability WebRTC connection fallback behind campus NAT firewalls',
      'Adhering strictly to clinical privacy standards and end-to-end data encryption',
    ],
    learningOutcomes: [
      'In-depth understanding of FHIR (Fast Healthcare Interoperability Resources)',
      'Designing accessible, high-contrast healthcare UX for diverse age groups',
    ],
    viewsCount: 940,
    likesCount: 165,
    createdAt: '2026-02-28',
  },
  {
    id: 'proj-6',
    slug: 'campusconnect-decentralized-hub',
    title: 'CampusConnect Protocol',
    tagline: 'Decentralized collaboration, project guilds & student governance',
    shortDescription: 'A student community platform facilitating multidisciplinary project teaming, hackathon squad formation, and student governance polls.',
    fullDescription: 'CampusConnect helps engineering, design, and business students find co-founders and squad members for competitions, hackathons, and research projects. Featuring skill matching algorithms and verifiable credential attestations, it turns universities into agile project accelerators.',
    category: 'Research and Innovation',
    status: 'Live Demo',
    coverImage: '/images/hero-showcase.jpg',
    gallery: [
      '/images/hero-showcase.jpg',
      '/images/namzoed.jpg',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Prisma', 'PostgreSQL'],
    student: INITIAL_CREATORS[5],
    academicYear: '2025-2026',
    semester: 'Senior Capstone',
    featured: false,
    demoUrl: 'https://example.com/demo/campusconnect',
    repoUrl: 'https://github.com/example/campusconnect-hub',
    problem: 'Students struggle to find teammates across different academic departments, leading to engineering projects without designers and business ventures without technical builders.',
    solution: 'A cross-departmental hub where students post project problem statements, declare required talent roles, and browse verified student portfolios filtered by skills, availability, and interests.',
    keyFeatures: [
      'Skill compatibility matchmaking algorithm linking designers, developers, and researchers',
      'Project milestone kanban board with synchronized team calendar',
      'Verified academic skill badges endorsed by course professors',
      'Live hackathon team builder lobby with instant chat rooms',
      'Anonymous student government proposal voting with sybil resistance',
    ],
    challenges: [
      'Balancing user profile discovery without compromising student contact privacy',
      'Designing fair algorithmic matching that promotes interdisciplinary teams',
    ],
    learningOutcomes: [
      'Building scalable GraphQL schemas and real-time subscription hubs',
      'Managing user engagement loops across collegiate semester schedules',
    ],
    viewsCount: 1620,
    likesCount: 279,
    createdAt: '2026-03-05',
  },
];

export const CATEGORIES: ProjectCategory[] = [
  'Web Development',
  'Mobile Applications',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'UI/UX Design',
  'IoT and Hardware',
  'Research and Innovation',
];

export const ALL_TECHNOLOGIES = [
  'All Technologies',
  'Next.js',
  'React',
  'TypeScript',
  'Python',
  'Flutter',
  'PyTorch',
  'Tailwind CSS',
  'Firebase',
  'PostgreSQL',
  'OpenCV',
  'Node.js',
  'D3.js',
  'FastAPI',
  'Docker',
];

// LocalStorage key for user-submitted demo projects
const STORAGE_KEY = 'projectspace_user_projects';

export function getAllProjects(): Project[] {
  if (typeof window === 'undefined') {
    return INITIAL_PROJECTS;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return INITIAL_PROJECTS;
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Merge with initial, avoiding duplicates by id
      const initialIds = new Set(INITIAL_PROJECTS.map(p => p.id));
      const customOnes = parsed.filter(p => !initialIds.has(p.id));
      return [...customOnes, ...INITIAL_PROJECTS];
    }
  } catch {
    // fallback
  }
  return INITIAL_PROJECTS;
}

export function getFeaturedProjects(): Project[] {
  const all = getAllProjects();
  return all.filter(p => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const all = getAllProjects();
  return all.find(p => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, category: ProjectCategory, limit = 3): Project[] {
  const all = getAllProjects();
  return all
    .filter(p => p.slug !== currentSlug && p.category === category)
    .slice(0, limit)
    .concat(
      all.filter(p => p.slug !== currentSlug && p.category !== category)
    )
    .slice(0, limit);
}

export function saveNewProject(projectData: Omit<Project, 'id' | 'slug' | 'viewsCount' | 'likesCount' | 'createdAt'>): Project {
  const id = 'proj-user-' + Date.now();
  const slug = projectData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000);

  const newProject: Project = {
    ...projectData,
    id,
    slug,
    viewsCount: 1,
    likesCount: 0,
    createdAt: new Date().toISOString().split('T')[0],
  };

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const existing: Project[] = stored ? JSON.parse(stored) : [];
      existing.unshift(newProject);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // ignore storage quota
    }
  }

  return newProject;
}
