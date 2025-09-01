import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function PagamentosRecentes() {
  return (
    <div className="space-y-8">
      {[
        {
          name: "João Silva",
          email: "joao.silva@example.com",
          amount: 50.0,
          status: "pago",
          date: "2023-06-15",
          method: "Dinheiro",
        },
        {
          name: "Ana Souza",
          email: "ana.souza@example.com",
          amount: 50.0,
          status: "pago",
          date: "2023-06-14",
          method: "PIX",
        },
        {
          name: "Roberto Alves",
          email: "roberto.alves@example.com",
          amount: 100.0,
          status: "pago",
          date: "2023-06-13",
          method: "Dinheiro",
        },
        {
          name: "Fernanda Lima",
          email: "fernanda.lima@example.com",
          amount: 50.0,
          status: "pago",
          date: "2023-06-12",
          method: "PIX",
        },
        {
          name: "Ricardo Souza",
          email: "ricardo.souza@example.com",
          amount: 150.0,
          status: "pago",
          date: "2023-06-10",
          method: "Dinheiro",
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
              <div className="mt-1 flex items-center justify-end gap-2">
                <Badge variant="outline" className="text-xs">
                  {payment.method}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(payment.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
