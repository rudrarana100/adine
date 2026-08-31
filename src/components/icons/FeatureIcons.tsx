import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/* Map pin — Google Maps lead scraping */
export function MapPinIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M14 24s8-6.2 8-12a8 8 0 10-16 0c0 5.8 8 12 8 12z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/* Phone — call session dialing */
export function PhoneIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <rect x="6" y="2" width="16" height="24" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="22.5" r="1.4" fill="currentColor" />
      <path d="M10.5 9h7M12 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* Calendar + video — Google Meet booking */
export function CalendarMeetIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="17" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 10h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="18.5" cy="16" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M21 14l3-2v8l-3-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Chat bubble — WhatsApp message */
export function ChatIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M14 3.5C8.2 3.5 3.5 7.6 3.5 12.7c0 2.3 1 4.3 2.6 5.8L5 22.5l4.3-1.2c1.4.6 3 .9 4.7.9 5.8 0 10.5-4.1 10.5-9.2S19.8 3.5 14 3.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 11.5c.4-.8.9-1 1.2-1 .3 0 .5.1.7.6l.3.9c.1.3 0 .7-.2.9l-.2.2c.5 1.2 1.3 1.9 2.1 2.5l.4-.3c.2-.2.6-.3.9-.1l.6.4c.4.3.5.6.4.8l-.2.4c-.4.6-.9.8-1.5.7-.9-.1-1.9-.6-2.7-1.3a7 7 0 01-1.8-2.6c-.2-.5-.2-.9 0-1l.3-.4z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Sheet / CSV — smart import */
export function SheetIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M6 3.5h11l5 5v16H6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M17 3.5v5h5M9 14.5h10M9 18h10M9 21.5h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Bell / clock — follow-up queue */
export function BellIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M10 21.5a3 3 0 006 0M6.5 18c0-4.4 3.4-7.9 7.5-7.9s7.5 3.5 7.5 7.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M14 5V3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14" cy="2.5" r="1" fill="currentColor" />
    </svg>
  );
}

/* Kanban columns — pipeline */
export function KanbanIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <rect x="4" y="5" width="6" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="11" y="5" width="6" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="18" y="5" width="6" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

/* Bar chart — analytics */
export function ChartIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path d="M5 24V6M5 24h19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="9" y="13" width="3.4" height="8" rx="1.4" fill="currentColor" />
      <rect x="14.3" y="9" width="3.4" height="12" rx="1.4" fill="currentColor" />
      <rect x="19.6" y="15" width="3.4" height="6" rx="1.4" fill="currentColor" />
    </svg>
  );
}

/* Command (⌘) — command palette */
export function CommandIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M18 8a3 3 0 100 4H8a3 3 0 103 3V8a3 3 0 113-3 3 3 0 11-3 3h10a3 3 0 11-1-2.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Flame — streaks / gamification */
export function FlameIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M14 25c4.4 0 7.5-3 7.5-7.2 0-3.4-2-5.9-3.9-8-.7-.8-1.3-1.6-1.8-2.4-.9-1.5-1-3.9-.9-6.4-2.3 1-3.5 2.9-3.5 5.4 0 1.8.7 3-1 4.4-1.6 1.3-3 2.9-3 5.4C7.4 21.6 9.9 25 14 25z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14 25c1.8 0 3-1.4 3-3.2 0-1.6-1-2.6-1.9-3.7-.6-.8-1-1.5-1.3-2.5-.4 1.3-1.1 2.4-2 3.2"
        fill="currentColor"
      />
    </svg>
  );
}

/* Checkmark */
export function CheckIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M14 3.5a10.5 10.5 0 110 21 10.5 10.5 0 010-21z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 14.5l3.4 3.4 7-7.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const FEATURE_ICONS = {
  map: MapPinIcon,
  phone: PhoneIcon,
  meet: CalendarMeetIcon,
  chat: ChatIcon,
  sheet: SheetIcon,
  bell: BellIcon,
  kanban: KanbanIcon,
  chart: ChartIcon,
  command: CommandIcon,
  flame: FlameIcon,
  check: CheckIcon,
} as const;

export type FeatureIconName = keyof typeof FEATURE_ICONS;
