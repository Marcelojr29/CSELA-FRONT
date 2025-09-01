export interface TimelineItem {
  year: string
  title: string
  description: string
}

export interface TimelineProps {
  items: TimelineItem[]
}