// Inline SVG icon set. Each icon accepts standard <svg> props (className, etc.)
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

const Icons = {
  Menu: (p) => (
    <svg {...stroke} {...p}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  ),
  Close: (p) => (
    <svg {...stroke} {...p}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg {...stroke} {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ArrowLeft: (p) => (
    <svg {...stroke} {...p}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Search: (p) => (
    <svg {...stroke} {...p}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Mail: (p) => (
    <svg {...stroke} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  ),
  MapPin: (p) => (
    <svg {...stroke} {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Send: (p) => (
    <svg {...stroke} {...p}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Check: (p) => (
    <svg {...stroke} {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Clock: (p) => (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  ),
  Copy: (p) => (
    <svg {...stroke} {...p}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Play: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5.14v13.72c0 .84.91 1.36 1.64.94l10.36-6.86a1.1 1.1 0 0 0 0-1.88L9.64 4.2A1.1 1.1 0 0 0 8 5.14Z" />
    </svg>
  ),
  Quote: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M7.17 6A5 5 0 0 0 3 11c0 2.2 1.4 3.8 3 4.6L5 19c-.2.6.2 1.2.8 1.2.2 0 .4 0 .6-.2l3.9-2.2A7 7 0 0 0 13 11a5 5 0 0 0-5-5h-.83Zm11 0A5 5 0 0 0 14 11c0 2.2 1.4 3.8 3 4.6L16 19c-.2.6.2 1.2.8 1.2.2 0 .4 0 .6-.2l3.9-2.2A7 7 0 0 0 24 11a5 5 0 0 0-5-5h-.83Z" />
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.3 3.7H5.4L17.8 20Z" />
    </svg>
  ),
  Facebook: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  Instagram: (p) => (
    <svg {...stroke} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  LinkedIn: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3-1.9 0-2.2 1.4-2.2 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1ZM7 20.4H3.6V9H7v11.4Z" />
    </svg>
  ),
  YouTube: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M23.5 7.2a3 3 0 0 0-2.1-2.2C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.5A3 3 0 0 0 .5 7.2 32 32 0 0 0 0 12a32 32 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.2c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.2A32 32 0 0 0 24 12a32 32 0 0 0-.5-4.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  ),
  WhatsApp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 21.5h0a9.3 9.3 0 0 1-4.8-1.3l-.3-.2-3.6.9.9-3.5-.2-.4a9.3 9.3 0 0 1-1.5-5.2A9.5 9.5 0 1 1 12 21.5Zm7.8-17.3A11.4 11.4 0 0 0 12 2 11.6 11.6 0 0 0 2.4 17.5L1 23l5.6-1.4A11.6 11.6 0 1 0 19.8 4.2Z" />
    </svg>
  ),
  TikTok: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M19.6 7.2a5.6 5.6 0 0 1-3.9-1.6 5.6 5.6 0 0 1-1.6-3.6h-3.4v12.9a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V8.6a6.3 6.3 0 0 0-.9-.1 6.4 6.4 0 1 0 6.4 6.4V8.9a8.9 8.9 0 0 0 5.4 1.7V7.2Z" />
    </svg>
  ),
};

export default Icons;