export interface HistoricoPagamento {
  id: string
  mes: string
  ano: number
  valor: number
  metodoPagamento: "dinheiro" | "pix"
  dataPagamento: string
  comprovante?: string
  observacao?: string
  registradoPor: string
}

export interface HistoricoPagamentosProps {
    moradorId: string
}