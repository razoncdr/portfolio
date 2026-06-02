/**
 * Inline SVG icons — no icon-library dependency (keeps the MVP lean).
 * Add new glyphs here and reference them by key from content/profile.ts.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false as const,
  ...props,
});

export function MailIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.34 9.34 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.83v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.66c0-1.35-.02-3.08-1.96-3.08-1.96 0-2.26 1.46-2.26 2.98V21H9V9Z" />
    </svg>
  );
}

export function CodeforcesIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v9a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 2 18V9a1.5 1.5 0 0 1 1.5-1.5h1Zm15 0A1.5 1.5 0 0 1 21 9v9a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 17 18V9a1.5 1.5 0 0 1 1.5-1.5h1Zm-7.5-3A1.5 1.5 0 0 1 13.5 6v12a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9.5 18V6A1.5 1.5 0 0 1 11 4.5h1Z" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg
      {...base(props)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export const icons = {
  mail: MailIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  codeforces: CodeforcesIcon,
} as const;

export type IconKey = keyof typeof icons;
