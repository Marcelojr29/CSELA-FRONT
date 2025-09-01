export interface RegistrarPagamentoModalProps {
  children: React.ReactNode
  morador: {
    id: string
    nome: string
    valorMensal: number
    mesesAtraso?: number
  }
  onPagamentoRegistrado: (moradorId: string) => void
}