// ============================================================
// MEDIA — interviews, videos, podcasts and appearances
// ------------------------------------------------------------
// Each item: title, type (Video / Podcast / TV / Radio / Print),
// outlet, date, duration, image thumbnail, and `link` (an
// external URL — replace the example URLs with your own).
// ============================================================

export const mediaItems = [
  {
    type: "Podcast",
    title: "The Long Read — Season 3: Power & Progress",
    outlet: "The Long Read",
    date: "2026-06",
    duration: "12 episodes",
    description:
      "My ongoing interview series on the people shaping the systems of the modern world — from data-labour contractors to central bankers.",
    image: "/images/podcast.jpg",
    link: "https://example.com/podcast/the-long-read",
  },
  {
    type: "Video",
    title: "Inside the AI Boom",
    outlet: "The World Desk",
    date: "2026-07",
    duration: "24 min",
    description:
      "A short documentary drawn from my investigation into the human cost of the artificial intelligence boom.",
    image: "/images/studio.jpg",
    link: "https://example.com/watch/inside-the-ai-boom",
  },
  {
    type: "TV",
    title: "The Morning Brief — Panel: Supply Chains",
    outlet: "National Broadcast",
    date: "2026-05",
    duration: "18 min",
    description:
      "A live panel discussion on the reorganisation of global trade, following the publication of 'Broken Chains'.",
    image: "/images/tv-studio.jpg",
    link: "https://example.com/tv/morning-brief",
  },
  {
    type: "Radio",
    title: "World Service Interview: The Housing Divide",
    outlet: "Atlantic Public Radio",
    date: "2026-06",
    duration: "21 min",
    description:
      "A one-on-one interview on the housing crisis, the generational divide, and the reporting behind the numbers.",
    image: "/images/camera.jpg",
    link: "https://example.com/radio/housing-divide",
  },
  {
    type: "Print",
    title: "Guest Column: The Case for the Cinematic Event",
    outlet: "The Continental Review",
    date: "2026-04",
    duration: "3,200 words",
    description:
      "A commissioned essay on why the cinema industry's reinvention matters for how we gather in the digital age.",
    image: "/images/opinion.jpg",
    link: "https://example.com/print/cinematic-event",
  },
  {
    type: "Video",
    title: "Faces of the City — Documentary",
    outlet: "The World Desk",
    date: "2026-02",
    duration: "16 min",
    description:
      "My photo essay on the migrant workforce building the Gulf's new cities — told through the people the stories forget.",
    image: "/images/film.jpg",
    link: "https://example.com/watch/faces-of-the-city",
  },
];

export const mediaTypes = ["All", "Video", "Podcast", "TV", "Radio", "Print"];