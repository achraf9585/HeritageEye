type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  media?: string;
};
export const favicons: Array<Favicons> = [
  {
    media: "(prefers-color-scheme: light)",
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/light-apple-touch-icon.png",
  },
  {
    media: "(prefers-color-scheme: light)",
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/favicon/android-chrome-192x192.png",
  },
  {
    media: "(prefers-color-scheme: light)",
    rel: "icon",
    type: "image/png",
    sizes: "256x256",
    href: "/favicon/light-android-chrome-256x256.png",
  },
  {
    media: "(prefers-color-scheme: light)",
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/light-favicon-16x16.png",
  },
  {
    media: "(prefers-color-scheme: light)",
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/light-favicon-32x32.png",
  },

  {
    media: "(prefers-color-scheme: dark)",
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-touch-icon.png",
  },
  {
    media: "(prefers-color-scheme: dark)",
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/favicon/android-chrome-192x192.png",
  },
  {
    media: "(prefers-color-scheme: dark)",
    rel: "icon",
    type: "image/png",
    sizes: "256x256",
    href: "/favicon/android-chrome-256x256.png",
  },
  {
    media: "(prefers-color-scheme: dark)",
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png",
  },
  {
    media: "(prefers-color-scheme: dark)",
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png",
  },
  {
    rel: "manifest",
    href: "/favicon/site.webmanifest",
  },
];
