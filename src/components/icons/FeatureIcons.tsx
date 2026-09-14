import {
  BellSimpleRinging,
  CalendarCheck,
  ChartBar,
  ChatCircleDots,
  CheckCircle,
  ClipboardText,
  Command,
  Flame,
  Kanban,
  MapPin,
  Phone,
} from "@phosphor-icons/react";
import type { ComponentType, ReactElement } from "react";

type IconProps = { size?: number; className?: string; "aria-hidden"?: boolean };

const FEATURE_WEIGHT = "regular" as const;

function buildProps(size: number, props: IconProps) {
  return {
    size,
    weight: FEATURE_WEIGHT,
    ...(props.className !== undefined ? { className: props.className } : {}),
    ...(props["aria-hidden"] !== undefined ? { "aria-hidden": props["aria-hidden"] } : {}),
  };
}

function wrap(
  Icon: ComponentType<{
    size: number;
    weight: typeof FEATURE_WEIGHT;
    className?: string;
    "aria-hidden"?: boolean;
  }>,
) {
  return function FeatureIcon({ size = 28, ...props }: IconProps): ReactElement {
    return <Icon {...buildProps(size, props)} />;
  };
}

/* Map pin — Google Maps lead scraping */
export const MapPinIcon = wrap(MapPin);
/* Phone — call session dialing */
export const PhoneIcon = wrap(Phone);
/* Calendar + check — Google Meet booking */
export const CalendarMeetIcon = wrap(CalendarCheck);
/* Chat bubble w/ dots — WhatsApp message */
export const ChatIcon = wrap(ChatCircleDots);
/* Clipboard table — sheet / smart CSV import */
export const SheetIcon = wrap(ClipboardText);
/* Bell — follow-up queue */
export const BellIcon = wrap(BellSimpleRinging);
/* Kanban columns — pipeline */
export const KanbanIcon = wrap(Kanban);
/* Bar chart — analytics */
export const ChartIcon = wrap(ChartBar);
/* Command (⌘) — command palette */
export const CommandIcon = wrap(Command);
/* Flame — streaks / gamification */
export const FlameIcon = wrap(Flame);
/* Checkmark */
export const CheckIcon = wrap(CheckCircle);

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
