/**
 * The only source of claims on the site. Facts come from Rahul_Resume_2k26.pdf
 * (Oct 2026) and from public store / site listings checked on 2026-10-20.
 * No phone number or e-mail appears anywhere on the page: contact is the form.
 */

export const AS_OF = 'Oct 2026'

export const PERSON = {
  name: 'Rahul Rajput',
  initials: 'RR',
  role: 'Software Engineer',
  focus: 'Full-Stack & Mobile',
  location: 'Mohali, Punjab, India',
  locationShort: 'Mohali, India',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST',
  linkedin: 'https://www.linkedin.com/in/rahul-rajput-828a71216/',
  github: 'https://github.com/RahulRajput025',
  resume: 'Rahul-Rajput-Resume.pdf',
  portrait: { large: 'rahul-1122.webp', small: 'rahul-720.webp', alt: 'Rahul Rajput' },
} as const

export const HERO = {
  kicker: 'Software Engineer · Full-Stack & Mobile',
  title: 'Rahul Rajput',
  line: 'Web and mobile products, built end to end and *shipped.*',
  lead: 'Three-plus years leading React, React Native and Node.js products that are live today — on the web, Google Play and the App Store.',
  stats: [
    { value: 3, suffix: '+', label: 'years shipping' },
    { value: 4, suffix: '', label: 'live platforms' },
    { value: 9, suffix: '', label: 'app-store listings' },
  ] as { value: number; suffix: string; label: string }[],
  chips: ['React', 'React Native', 'Node.js', 'TypeScript'],
  badge: 'Technical Lead · 2024 – 2026',
} as const

export type Surface = 'Web' | 'Android' | 'iOS' | 'Backend'
export type Visual =
  | { kind: 'shots'; id: string }
  | { kind: 'dashboard' }
  | { kind: 'migration' }
  | { kind: 'chat' }
  | { kind: 'sites' }
  | { kind: 'angular' }

export type Project = {
  id: string
  name: string
  what: string
  points: string[]
  surfaces: Surface[]
  stack: string[]
  links: { label: string; href: string; kind: 'site' | 'play' | 'appstore' | 'github' }[]
  visual: Visual
  note?: string
}

export type Employer = {
  id: string
  numeral: string
  company: string
  url?: string
  role: string
  period: string
  place: string
  summary: string
  owned: string[]
  projects: Project[]
}

/** Everything shipped, presented inside the employer it was built for. */
export const EMPLOYERS: Employer[] = [
  {
    id: 'vedicvaibhav',
    numeral: '01',
    company: 'Vedic Vaibhav Dot Com Pvt Ltd',
    url: 'https://vedicvaibhav.com',
    role: 'Software Engineer · Technical Lead',
    period: 'Aug 2024 – Sep 2026',
    place: 'India',
    summary:
      'Led engineering for the company’s consumer platforms and their Android and iOS apps, and for ChildcarePro, its flagship B2B product — owning architecture, delivery, code reviews and releases end to end, while running proposals, pricing and go-to-market with the founders.',
    owned: ['Technical leadership', 'Architecture', 'React / React Native / Node.js', 'Releases on both stores', 'Business & sales ops'],
    projects: [
      {
        id: 'vedicvaibhav',
        name: 'Vedic Vaibhav',
        what: 'Flagship platform for online puja, chadhava and prasad booking from temples across India.',
        points: ['Owned the React web app, the React Native apps and the Node.js APIs end to end', 'Published and maintained on Google Play and the App Store', 'Razorpay payments, bookings and order flows'],
        surfaces: ['Web', 'Android', 'iOS'],
        stack: ['React', 'React Native', 'Node.js', 'MongoDB', 'Razorpay'],
        links: [
          { label: 'vedicvaibhav.com', href: 'https://vedicvaibhav.com', kind: 'site' },
          { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.rahulrajput025.client', kind: 'play' },
          { label: 'App Store', href: 'https://apps.apple.com/in/app/vedicvaibhav/id6765667844', kind: 'appstore' },
        ],
        visual: { kind: 'shots', id: 'vedicvaibhav' },
      },
      {
        id: 'astrovaibhav',
        name: 'Astro Vaibhav',
        what: 'Astrologer consultations by chat and call, billed by the minute.',
        points: ['Real-time chat and voice on Node.js and WebSockets', 'Per-minute billing, wallet flows and Razorpay', 'AI astrology chat and automated Kundali reports with Node.js and Python'],
        surfaces: ['Web', 'Android'],
        stack: ['Node.js', 'WebSockets', 'React Native', 'Python', 'Razorpay'],
        links: [
          { label: 'astrovaibhav.com', href: 'https://astrovaibhav.com', kind: 'site' },
          { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.rahulrajput025.astro', kind: 'play' },
        ],
        visual: { kind: 'shots', id: 'astrovaibhav' },
      },
      {
        id: 'childcarepro',
        name: 'ChildcarePro',
        what: 'Childcare management platform for Australian Long Day Care, OSHC and Family Day Care providers.',
        points: ['Multi-service dashboard: enrolments, attendance and sign-in, bookings', 'Educator and staff management, parent communication, billing', 'Compliance reporting for Australia’s Child Care Subsidy (CCS) environment'],
        surfaces: ['Web'],
        stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        links: [],
        visual: { kind: 'dashboard' },
        note: 'Private B2B platform',
      },
      {
        id: 'panditji',
        name: 'Pandit Ji At Request',
        what: 'On-demand pandit booking for puja, havan and ceremonies.',
        points: ['Booking, scheduling and payments in one flow', 'A pandit-side app for bookings, calls and navigation', 'Shipped on the web, Android and iOS'],
        surfaces: ['Web', 'Android', 'iOS'],
        stack: ['React', 'React Native', 'Node.js', 'Razorpay'],
        links: [
          { label: 'panditjiatrequest.com', href: 'https://panditjiatrequest.com', kind: 'site' },
          { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.panditJiAtReqapp', kind: 'play' },
          { label: 'App Store', href: 'https://apps.apple.com/in/app/pandit-ji-at-request/id6762001802', kind: 'appstore' },
        ],
        visual: { kind: 'shots', id: 'panditji' },
      },
      {
        id: 'vedicshop',
        name: 'Vedic Shop',
        what: 'Spiritual products e-commerce with its own Android and iOS apps.',
        points: ['Catalogue, cart and order management', 'Shared accounts, wallet and payment infrastructure', 'Released on Google Play and the App Store'],
        surfaces: ['Web', 'Android', 'iOS'],
        stack: ['React Native', 'Node.js', 'MongoDB'],
        links: [
          { label: 'vedicshop.store', href: 'https://vedicshop.store', kind: 'site' },
          { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.nirmanyu.NewVedicShop', kind: 'play' },
          { label: 'App Store', href: 'https://apps.apple.com/in/app/vedic-shop/id6766175387', kind: 'appstore' },
        ],
        visual: { kind: 'shots', id: 'vedicshop' },
      },
    ],
  },
  {
    id: 'mind2web',
    numeral: '02',
    company: 'Mind2Web LLP',
    url: 'https://mind2web.io',
    role: 'Associate Software Developer',
    period: 'Aug 2023 – May 2024',
    place: 'Mohali',
    summary:
      'Built new features and led a full backend migration for Service Points, a large Netherlands-based drop-shipping platform, and engineered a scalable real-time chat system on Node.js and Redis.',
    owned: ['Feature development', 'PHP → Node.js migration', 'MySQL → MongoDB migration', 'Real-time systems'],
    projects: [
      {
        id: 'servicepoints',
        name: 'Service Points',
        what: 'Large Netherlands-based drop-shipping platform, served as a client.',
        points: ['New features across CodeIgniter/PHP, React and Node.js, improving efficiency and user experience', 'Migrated the backend from PHP to Node.js', 'Migrated the database from MySQL to MongoDB for scalability and performance'],
        surfaces: ['Web'],
        stack: ['Node.js', 'React', 'CodeIgniter', 'MongoDB', 'MySQL'],
        links: [{ label: 'servicepoints.nl', href: 'https://www.servicepoints.nl', kind: 'site' }],
        visual: { kind: 'migration' },
        note: 'Client platform',
      },
      {
        id: 'chat',
        name: 'Real-time chat platform',
        what: 'Horizontally scalable messaging built on Node.js with Redis Pub/Sub.',
        points: ['Pub/Sub fan-out so chat scales across server instances', 'AI chatbot response optimisation'],
        surfaces: ['Backend'],
        stack: ['Node.js', 'Redis', 'Pub/Sub', 'WebSockets'],
        links: [],
        visual: { kind: 'chat' },
      },
    ],
  },
  {
    id: 'impavid',
    numeral: '03',
    company: 'Impavid Technologies',
    url: 'https://impavid.in',
    role: 'Web Developer Intern',
    period: 'Feb – Jun 2023',
    place: 'Bangalore',
    summary: 'Delivered four live institutional and corporate websites and built two Angular applications in a five-month internship.',
    owned: ['Front-end build', 'PHP / MySQL', 'Angular'],
    projects: [
      {
        id: 'sites',
        name: 'Four live websites',
        what: 'Atria University · RLJIT · Ghousia Group of Technologies · Magsol Industry.',
        points: ['Institutional and corporate sites built with HTML, CSS, Bootstrap, JavaScript, PHP and MySQL', 'Delivered live for real clients during the internship'],
        surfaces: ['Web'],
        stack: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'PHP', 'MySQL'],
        links: [
          { label: 'rljit.in', href: 'https://rljit.in', kind: 'site' },
          { label: 'atriauniversity.edu.in', href: 'https://www.atriauniversity.edu.in', kind: 'site' },
          { label: 'Magsol on GitHub', href: 'https://github.com/RahulRajput025/Php_Magsol_Industry_Website', kind: 'github' },
        ],
        visual: { kind: 'sites' },
      },
      {
        id: 'angular',
        name: 'Angular applications',
        what: 'A blog on Angular + Firebase and a CRUD app on Angular, Node.js and MongoDB.',
        points: ['Angular + Firebase blog application', 'Angular, Node.js and MongoDB CRUD application'],
        surfaces: ['Web'],
        stack: ['Angular', 'Firebase', 'Node.js', 'MongoDB'],
        links: [
          { label: 'Blog on GitHub', href: 'https://github.com/RahulRajput025/Angular-Blog-Website', kind: 'github' },
          { label: 'CRUD on GitHub', href: 'https://github.com/RahulRajput025/Angular_Crud_App_small', kind: 'github' },
        ],
        visual: { kind: 'angular' },
      },
    ],
  },
]

export const SIDE_PROJECTS = [
  {
    id: 'heart',
    name: 'Heart Disease Predictor',
    what: 'Predicts heart-disease risk from medical parameters — Python models (scikit-learn, joblib) served through Django.',
    stack: ['Python', 'scikit-learn', 'Django'],
    href: 'https://github.com/RahulRajput025/Heart-disease-predictor',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce web application',
    what: 'Payment gateway, cart, wishlist, user profiles, orders and e-mail notifications.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    href: 'https://github.com/RahulRajput025/ecommerce_updated-2k24-',
  },
] as const

export const EDUCATION = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'I.K. Gujral Punjab Technical University, Mohali Campus-1',
  period: '2019 – 2023',
  cgpa: 8.03,
} as const

export type Area = { id: string; icon: 'web' | 'mobile' | 'server' | 'spark'; title: string; text: string; chips: string[] }
export const EXPERTISE: Area[] = [
  { id: 'web', icon: 'web', title: 'Web applications', text: 'Dashboards, booking flows and storefronts in React and TypeScript.', chips: ['React', 'TypeScript', 'Redux', 'Angular', 'Responsive UI'] },
  { id: 'mobile', icon: 'mobile', title: 'Mobile apps', text: 'React Native apps published and maintained on Google Play and the App Store.', chips: ['React Native', 'Google Play Console', 'App Store Connect'] },
  { id: 'backend', icon: 'server', title: 'Backend & real-time', text: 'REST APIs, WebSocket chat and calls, migrations and the data layer behind them.', chips: ['Node.js', 'Express', 'WebSockets', 'Redis Pub/Sub', 'MongoDB', 'PostgreSQL', 'MySQL'] },
  { id: 'ai', icon: 'spark', title: 'Payments & AI', text: 'Razorpay checkout, wallets and per-minute billing; LLM chat, automated reports and ML deployment.', chips: ['Razorpay', 'LLM integration', 'Python', 'Django', 'scikit-learn'] },
]
export const TOOLS = ['AWS', 'cPanel', 'Git / GitHub', 'Postman', 'Figma']

export const CONTACT = {
  heading: 'Let’s build *something.*',
  lead: 'A product to ship, an app to publish, a backend to move — tell me what you need and I’ll reply by e-mail.',
  /**
   * FormSubmit AJAX endpoint. The first message triggers a one-time activation
   * e-mail to the inbox; after activation, FormSubmit also offers a random alias
   * (https://formsubmit.co/ajax/<alias>) that can replace the address here.
   */
  endpoint: 'https://formsubmit.co/ajax/rahulrajput02525@gmail.com',
  subject: 'New enquiry from the portfolio',
  needs: ['Web application', 'Mobile app', 'Backend & APIs', 'Something else'],
  success: 'Sent. I’ll reply by e-mail.',
  error: 'That didn’t go through. Please try again, or write to me on LinkedIn.',
} as const

export const FOOTER = {
  line: 'Have a product in mind? *Let’s talk.*',
  note: 'Every message reaches me directly; I reply by e-mail.',
} as const

export const NAV = [
  { id: 'work', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'contact', label: 'Contact' },
] as const
