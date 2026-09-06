export interface AdminSection {
  key: string;
  editorHref: string;
  editorLabel: string;
  livePage: string;
  liveHref: string;
  description: string;
}

// Single source of truth for the admin dashboard cards, the sidebar nav,
// and the "Editing: X Page -> Y Section" banner on every editor page.
export const ADMIN_SECTIONS: AdminSection[] = [
  {
    key: "home",
    editorHref: "/admin/home",
    editorLabel: "Hero banner",
    livePage: "Home Page",
    liveHref: "/",
    description:
      "The big heading, featured workshop date/time, and Book a seat button visitors see first on the homepage.",
  },
  {
    key: "workshops",
    editorHref: "/admin/workshops",
    editorLabel: "Workshop list",
    livePage: "Workshops Page",
    liveHref: "/workshops",
    description:
      "Every workshop you run — title, category, description and photo. The first 3 also show on the homepage.",
  },
  {
    key: "schedule",
    editorHref: "/admin/schedule",
    editorLabel: "Upcoming sessions",
    livePage: "Schedule Page",
    liveHref: "/schedule",
    description:
      "Dated sessions with time, location, price, seats and booking status.",
  },
  {
    key: "stories",
    editorHref: "/admin/stories",
    editorLabel: "Blog posts",
    livePage: "Stories Page",
    liveHref: "/stories",
    description: "Journal-style posts with a title, date, excerpt and photo.",
  },
  {
    key: "about",
    editorHref: "/admin/about",
    editorLabel: "Story & pillars",
    livePage: "About Page",
    liveHref: "/about",
    description:
      "Your founding story, one photo, and the three pillars you stand for.",
  },
  {
    key: "settings",
    editorHref: "/admin/settings",
    editorLabel: "Nav, footer & booking",
    livePage: "Site-wide",
    liveHref: "/",
    description:
      "Logo text, footer tagline, contact email, address, and the WhatsApp/Instagram link every Book a seat button uses.",
  },
];
