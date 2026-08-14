// ============================================================
// SITE CONFIGURATION — The Parakuo Ledger
// ------------------------------------------------------------
// This is the ONE file you edit to personalise the website:
// name, publication, biography, photo, social links, etc.
// ============================================================

export const site = {
  // Personal name (used in bylines, About page, author boxes)
  name: "Jesse Parakuo",
  firstName: "Jesse",

  // Publication / brand name (used in navbar, footer, browser tab)
  publication: "The Parakuo Ledger",

  role: "Investigative Journalist & Author",

  // Short one-liner used in the hero, footer and meta descriptions
  tagline:
    "Investigative journalist covering power, people, and the systems that connect them.",

  // Hero headline
  heroHeadline: "Reporting on power, people, and the systems that connect them.",

  // Short bio used on the homepage "About" teaser
  bioShort:
    "Jesse is an award-winning investigative journalist with more than a decade of experience across politics, business and technology. His reporting has shaped policy debates in three countries and his work has been published by leading outlets worldwide.",

  // Full biography used on the About page (array = paragraphs)
  bioLong: [
    "Jesse Parakuo is an award-winning investigative journalist with more than a decade of experience covering politics, business and technology. His reporting has shaped policy debates in three countries, exposed systemic failures in public institutions, and been translated into eleven languages.",
    "He began his career as a local reporter in 2014 before joining the national desk, where he built a reputation for patient, evidence-led investigation. His series on supply-chain fragility was cited in parliamentary hearings, and his reporting on the AI boom remains a reference point in technology policy circles.",
    "Today Jesse splits his time between long-form investigations, original interviews, and multimedia storytelling. He believes the best journalism is built on trust: with sources, with readers, and with the communities whose stories deserve to be told carefully.",
  ],

  // File name of the professional portrait (place your own in /public/images)
  portrait: "images/portrait.jpg",
  portraitCaption: "Jesse Parakuo, photographed in London, 2026",

  // Contact details
  email: "jesse@theparakuoleger.com",
  location: "London, United Kingdom",
  responseNote: "I read every message and aim to reply within two working days.",

  // Social media — add/remove entries freely; icons supported:
  // X, Facebook, Instagram, LinkedIn, YouTube, WhatsApp, RSS, Mail
  socials: [
    { platform: "X", handle: "@JesseParakuo", url: "https://x.com/jesseparakuo" },
    { platform: "LinkedIn", handle: "Jesse Parakuo", url: "https://www.linkedin.com/in/jesseparakuo" },
    { platform: "Instagram", handle: "@jesseparakuo.reports", url: "https://www.instagram.com/jesseparakuo.reports" },
    { platform: "YouTube", handle: "The Parakuo Ledger", url: "https://www.youtube.com/@theparakuoleger" },
    { platform: "Facebook", handle: "The Parakuo Ledger", url: "https://www.facebook.com/theparakuoleger" },
  ],

  // Education shown on the About page
  education: [
    {
      degree: "Master of Arts, Journalism & Society",
      school: "City, University of London",
      period: "2012 – 2013",
    },
    {
      degree: "Bachelor of Arts, Politics & Modern History",
      school: "University of Manchester",
      period: "2008 – 2011",
    },
  ],

  // Professional experience shown on the About page
  experience: [
    {
      role: "Independent Investigative Journalist",
      org: "Freelance & Commissioned Work",
      period: "2022 – Present",
      points: [
        "Long-form investigations and features for national and international publications",
        "Original interview series with leaders across technology, energy and government",
        "Multimedia storytelling: documentary video, photography and podcast production",
      ],
    },
    {
      role: "Senior Correspondent, Business & Technology",
      org: "The National Chronicle",
      period: "2018 – 2022",
      points: [
        "Led a coverage team of six across technology, energy and global trade",
        "Broken the supply-chain investigation cited in parliamentary hearings",
        "Twice nominated for Business Journalist of the Year",
      ],
    },
    {
      role: "Reporter, Politics Desk",
      org: "The Morning Standard",
      period: "2014 – 2018",
      points: [
        "Covered local and national government, courts and public services",
        "Won regional reporting awards for housing and public spending investigations",
      ],
    },
  ],

  // Areas of specialisation (shown as tags)
  specialisations: [
    "Investigative Reporting",
    "Politics & Policy",
    "Business & Finance",
    "Technology & AI",
    "Energy & Climate",
    "Human Rights",
    "Data Journalism",
    "Long-form Features",
    "Interviewing",
    "Photojournalism",
  ],

  // Awards & achievements
  awards: [
    { year: "2025", title: "International Press Freedom Award", org: "World Editors' Forum" },
    { year: "2024", title: "Business Journalist of the Year", org: "National Press Awards" },
    { year: "2023", title: "Investigation of the Year", org: "European Journalism Centre" },
    { year: "2021", title: "Excellence in Data Journalism", org: "The Digital News Report" },
    { year: "2017", title: "Regional Reporter of the Year", org: "Press Guild Awards" },
  ],

  // Media organisations worked with (About page)
  organisations: [
    "The National Chronicle",
    "The Morning Standard",
    "The Continental Review",
    "Meridian Business Weekly",
    "Atlantic Public Radio",
    "The World Desk",
  ],

  // Locations / availability (Contact page)
  availability:
    "Available for commissions, speaking engagements and collaborations. Based in London, working worldwide.",
};

export const categories = [
  "Politics",
  "Business",
  "Technology",
  "Culture",
  "Society",
  "International",
  "Opinion",
];