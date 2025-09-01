import { Card, CardContent } from "@/components/ui/card"
import { TimelineItem, TimelineProps } from "@/interfaces/ITimeline"

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:left-9 before:ml-0.5 before:border-l-2 before:border-primary/20">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="relative mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow">
            <span className="absolute -left-[0.5px] h-full w-3 bg-background"></span>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                  {item.year}
                </span>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
