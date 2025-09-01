import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentPayments() {
  return (
    <div className="space-y-8">
      {[
        {
          name: "Maria Silva",
          email: "maria.silva@example.com",
          amount: 250.0,
          status: "pago",
          date: "2023-06-15",
        },
        {
          name: "João Santos",
          email: "joao.santos@example.com",
          amount: 150.0,
          status: "pago",
          date: "2023-06-14",
        },
        {
          name: "Ana Oliveira",
          email: "ana.oliveira@example.com",
          amount: 350.0,
          status: "pendente",
          date: "2023-06-13",
        },
        {
          name: "Carlos Ferreira",
          email: "carlos.ferreira@example.com",
          amount: 200.0,
          status: "pago",
          date: "2023-06-12",
        },
        {
          name: "Lúcia Mendes",
          email: "lucia.mendes@example.com",
          amount: 180.0,
          status: "atrasado",
          date: "2023-06-10",
        },
      ].map((payment, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={payment.name} />
            <AvatarFallback>{payment.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{payment.name}</p>
            <p className="text-sm text-muted-foreground">{payment.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <div className="text-right">
              <p>R$ {payment.amount.toFixed(2)}</p>
              <Badge
                variant={
                  payment.status === "pago" ? "outline" : payment.status === "pendente" ? "secondary" : "destructive"
                }
                className="mt-1"
              >
                {payment.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
