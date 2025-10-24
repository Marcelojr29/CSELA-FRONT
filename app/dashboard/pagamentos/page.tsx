import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, HelpCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { RegistroPagamentoForm } from "@/components/dashboard/moradores/registro-pagamento-form"
import { HistoricoPagamentos } from "@/components/dashboard/moradores/historico-pagamentos"
import { CarneDigital } from "@/components/dashboard/moradores/carne-digital"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PagamentosMoradorPage({ params }: { params: { id: string } }) {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/moradores">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Pagamentos do Morador</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>
                    Esta tela gerencia todos os pagamentos do morador. Use o carnê digital para marcar pagamentos ou
                    registre pagamentos com comprovantes.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-muted-foreground">João Silva Santos - ID: {params.id}</p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar Histórico
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Baixe um relatório completo com todo o histórico de pagamentos</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Como funciona:</strong> Use o <strong>Carnê Digital</strong> para marcar pagamentos recebidos em
            dinheiro diretamente no mês correspondente. Use <strong>Registrar Pagamento</strong> apenas para pagamentos
            via PIX que precisam de comprovante digital anexado.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">Carnê Digital - Controle Principal</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-medium">Carnê Digital - Funcionalidade Principal:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>
                          <strong>Clique no checkbox</strong> de cada mês para marcar como pago
                        </li>
                        <li>
                          <strong>Verde = Pago</strong>, Branco = Pendente
                        </li>
                        <li>
                          <strong>Para dinheiro:</strong> Apenas marque o checkbox
                        </li>
                        <li>
                          <strong>Para PIX:</strong> Use "Registrar Pagamento" ao lado
                        </li>
                        <li>Imprima o carnê completo quando necessário</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <CardDescription>
                Marque os meses como pagos conforme receber os pagamentos. Esta é a forma principal de controle.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CarneDigital moradorId={params.id} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">Pagamento PIX</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-medium">Apenas para Pagamentos PIX:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Use apenas quando receber via PIX</li>
                        <li>Selecione o mês que está sendo pago</li>
                        <li>Anexe obrigatoriamente o comprovante</li>
                        <li>O mês será marcado automaticamente como pago</li>
                        <li>
                          <strong>Para dinheiro:</strong> use apenas o carnê digital
                        </li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <CardDescription>Use apenas para pagamentos via PIX que precisam de comprovante anexado</CardDescription>
            </CardHeader>
            <CardContent>
              <RegistroPagamentoForm moradorId={params.id} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Histórico de Pagamentos</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-2">
                    <p className="font-medium">Histórico Completo:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Todos os pagamentos registrados</li>
                      <li>Pagamentos em dinheiro (marcados no carnê)</li>
                      <li>Pagamentos PIX (com comprovantes)</li>
                      <li>Clique no ícone do olho para ver detalhes</li>
                      <li>Ordenado do mais recente para o mais antigo</li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>Todos os pagamentos registrados para este morador</CardDescription>
          </CardHeader>
          <CardContent>
            <HistoricoPagamentos moradorId={params.id} />
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-900 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Guia Rápido de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-800 space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium">💰 Pagamento em Dinheiro:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Receba o pagamento do morador</li>
                  <li>
                    Vá no <strong>Carnê Digital</strong>
                  </li>
                  <li>Clique no checkbox do mês correspondente</li>
                  <li>Pronto! Fica marcado como pago (verde)</li>
                </ol>
              </div>
              <div className="space-y-2">
                <p className="font-medium">📱 Pagamento via PIX:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Receba o PIX do morador</li>
                  <li>
                    Use <strong>Pagamento PIX</strong> ao lado
                  </li>
                  <li>Selecione o mês e anexe o comprovante</li>
                  <li>Clique em "Registrar" - marca automaticamente</li>
                </ol>
              </div>
            </div>
            <div className="pt-2 border-t border-green-200">
              <p className="text-xs text-green-700">
                <strong>Dica:</strong> O carnê digital é sincronizado com a tela de "Controle de Pagamento" na listagem
                de moradores. Qualquer alteração aqui aparece lá também.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
