import {
  BellSimpleRinging,
  CalendarCheck,
  ChartBar,
  ChatCircleDots,
  CheckCircle,
  Command,
  Flame,
  Kanban,
  MapPin,
  Phone,
  TableSimple,
} from "@phosphor-icons/react";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/* Map pin — Google Maps lead scraping */
export function MapPinIcon({ size = 28, ...props }: IconProps) {
  return <MapPin size={size} weight="regular" {...props} />;
}

/* Phone — call session dialing */
export function PhoneIcon({ size = 28, ...props }: IconProps) {
  return <Phone size={size} weight="regular" {...props} />;
}

/* Calendar + check — Google Meet booking */
export function CalendarMeetIcon({ size = 28, ...props }: IconProps) {
  return <CalendarCheck size={size} weight="regular" {...props} />;
}

/* Chat bubble w/ dots — WhatsApp message */
export function ChatIcon({ size = 28, ...props }: IconProps) {
  return <ChatCircleDots size={size} weight="regular" {...props} />;
}

/* Table — sheet / smart CSV import */
export function SheetIcon({ size = 28, ...props }: IconProps) {
  return <TableSimple size={size} weight="regular" {...props} />;
}

/* Bell — follow-up queue */
export function BellIcon({ size = 28, ...props }: IconProps) {
  return <BellSimpleRinging size={size} weight="regular" {...props} />;
}

/* Kanban columns — pipeline */
export function KanbanIcon({ size = 28, ...props }: IconProps) {
  return <Kanban size={size} weight="regular" {...props} />;
}

/* Bar chart — analytics */
export function ChartIcon({ size = 28, ...props }: IconProps) {
  return <ChartBar size={size} weight="regular" {...props} />;
}

/* Command (⌘) — command palette */
export function CommandIcon({ size = 28, ...props }: IconProps) {
  return <Command size={size} weight="regular" {...props} />;
}

/* Flame — streaks / gamification */
export function FlameIcon({ size = 28, ...props }: IconProps) {
  return <Flame size={size} weight="regular" {...props} />;
}

/* Checkmark */
export function CheckIcon({ size = 28, ...props }: IconProps) {
  return <CheckCircle size={size} weight="regular" {...props} />;
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
