export interface Morador {
  id: string
  nome: string
  rg: string
  cpf: string
  dataNascimento: string
  estadoCivil: string
  endereco: {
    rua: string
    numero: string
    comunidade: string
    cep: string
  }
  contato: {
    telefone: string
    email: string
  }
  residencia: {
    tipo: string
    qtdPessoas: number
    tempoResidencia: string
  }
  observacao: string
  status: "ativo" | "inativo"
  dataCadastro: string
}