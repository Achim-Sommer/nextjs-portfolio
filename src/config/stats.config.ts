import { 
  FaYoutube, 
  FaVideo, 
  FaCommentAlt, 
  FaInstagram, 
  FaGlobeEurope, 
  FaDiscord, 
  FaClock, 
  FaUsers 
} from "react-icons/fa";
import { IconType } from "react-icons";

export interface Stat {
  value: number;
  label: string;
  icon: IconType;
  gradient: string;
  accentColor: string;
}

export const ANIMATION_DURATION = 2000;
export const ANIMATION_DELAY = 100;

export const stats: Stat[] = [
  {
    value: 8444,
    label: "YouTube Abonnenten",
    icon: FaUsers,
    gradient: "from-rose-500 via-rose-400 to-rose-500",
    accentColor: "bg-rose-500/10"
  },
  {
    value: 3500000,
    label: "YouTube Views",
    icon: FaYoutube,
    gradient: "from-sky-500 via-sky-400 to-sky-500",
    accentColor: "bg-sky-500/10"
  },
  {
    value: 420,
    label: "Videos",
    icon: FaVideo,
    gradient: "from-violet-500 via-violet-400 to-violet-500",
    accentColor: "bg-violet-500/10"
  },
  {
    value: 88000,
    label: "YouTube Kommentare",
    icon: FaCommentAlt,
    gradient: "from-emerald-500 via-emerald-400 to-emerald-500",
    accentColor: "bg-emerald-500/10"
  },
  {
    value: 198500,
    label: "Watch Time (Stunden)",
    icon: FaClock,
    gradient: "from-amber-500 via-amber-400 to-amber-500",
    accentColor: "bg-amber-500/10"
  },
  {
    value: 1850,
    label: "Instagram Follower",
    icon: FaInstagram,
    gradient: "from-fuchsia-500 via-fuchsia-400 to-fuchsia-500",
    accentColor: "bg-fuchsia-500/10"
  },
  {
    value: 8200,
    label: "Forum Mitglieder",
    icon: FaGlobeEurope,
    gradient: "from-cyan-500 via-cyan-400 to-cyan-500",
    accentColor: "bg-cyan-500/10"
  },
  {
    value: 3700,
    label: "Discord Mitglieder",
    icon: FaDiscord,
    gradient: "from-indigo-500 via-indigo-400 to-indigo-500",
    accentColor: "bg-indigo-500/10"
  }
];
