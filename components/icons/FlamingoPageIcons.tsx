"use client"

// This component dynamically imports all icons to reduce initial bundle size
import dynamic from 'next/dynamic'
import { ComponentType, SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

// Create wrapper components for each icon
export const Calendar = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Calendar))
export const Star = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Star))
export const Shield = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Shield))
export const Award = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Award))
export const Zap = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Zap))
export const Mountain = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Mountain))
export const Camera = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Camera))
export const Info = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Info))
export const Lightbulb = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Lightbulb))
export const CheckCircle = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.CheckCircle))
export const TrendingUp = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.TrendingUp))
export const Video = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Video))
export const MapPin = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.MapPin))
export const HelpCircle = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.HelpCircle))
export const Globe = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Globe))
export const Users = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Users))
export const Clock = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Clock))
export const Phone = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Phone))
export const Mail = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Mail))
export const MessageCircle = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.MessageCircle))
export const CreditCard = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.CreditCard))
export const Heart = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Heart))
export const Compass = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Compass))
export const Sunrise = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Sunrise))
export const Sunset = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Sunset))
export const Eye = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Eye))
export const ThumbsUp = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.ThumbsUp))
export const Droplets = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Droplets))
export const Trees = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Trees))
export const Bird = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Bird))
export const Feather = dynamic<IconProps>(() => import('lucide-react').then(mod => mod.Feather))

// Default export for dynamic import
export default {
  Calendar,
  Star,
  Shield,
  Award,
  Zap,
  Mountain,
  Camera,
  Info,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Video,
  MapPin,
  HelpCircle,
  Globe,
  Users,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  CreditCard,
  Heart,
  Compass,
  Sunrise,
  Sunset,
  Eye,
  ThumbsUp,
  Droplets,
  Trees,
  Bird,
  Feather,
}