import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  ChartBarLineIcon,
  Home01Icon,
  LanguageSquareIcon,
  Leaf01Icon,
  Notification03Icon,
  SecurityCheckIcon,
  ShoppingCart01Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

/** Hugeicons, the same icon set as the phone app, so the brand looks the same everywhere. */
const ICONS = {
  cart: ShoppingCart01Icon,
  calendar: Calendar03Icon,
  bell: Notification03Icon,
  language: LanguageSquareIcon,
  leaf: Leaf01Icon,
  shield: SecurityCheckIcon,
  home: Home01Icon,
  chart: ChartBarLineIcon,
  check: Tick02Icon,
  arrow: ArrowUpRight01Icon,
  arrowDown: ArrowDown01Icon,
}

export type IconName = keyof typeof ICONS

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return <HugeiconsIcon className="icon" icon={ICONS[name]} size={size} strokeWidth={1.5} color="currentColor" aria-hidden="true" />
}

/** The arrow that ends a link or button label ("Explore our dairy"), sized to the text around it. */
export function ArrowIcon({ size = 16 }: { size?: number }) {
  return <Icon name="arrow" size={size} />
}

/** The leaf-and-dot border from the logo's base, used as a quiet break between sections. */
export function Ornament() {
  return <div className="ornament" aria-hidden="true"><span /></div>
}
