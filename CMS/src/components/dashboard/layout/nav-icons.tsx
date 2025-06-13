import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Article as ArticleIcon } from '@phosphor-icons/react/dist/ssr/Article';
import { Book as BookIcon } from '@phosphor-icons/react/dist/ssr/Book';
import { BookBookmark } from '@phosphor-icons/react/dist/ssr/BookBookmark';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { Shield as ShieldIcon } from '@phosphor-icons/react/dist/ssr/Shield';
import { ShieldPlus as ShieldPlusIcon } from '@phosphor-icons/react/dist/ssr/ShieldPlus';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
  shield: ShieldIcon,
  article: ArticleIcon,
  booking: BookIcon,
  category: BookBookmark,
  shieldPlus: ShieldPlusIcon,
} as Record<string, Icon>;
