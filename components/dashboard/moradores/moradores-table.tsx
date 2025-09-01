"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, FileText, Printer, MessageSquare, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { MoradoresTableProps } from "@/interfaces/IMoradoresTableProps"

// Dados simulados de moradores com todos os campos necessários
const moradoresData = [
  {
    id: "1",
    nome: "João Silva",
    rg: "12.345.678-9",
    cpf: "123.456.789-00",
    nascimento: "1985-03-15",
    estadoCivil: "Casado(a)",
    rua: "Rua das Flores",
    numero: "123",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69000-000",
    telefone: "(92) 98765-4321",
    tipoResidencia: "Alvenaria",
    qtdPessoas: 4,
    tempoResidencia: "2020-01-15",
    observacao:
      "Morador muito colaborativo com a comunidade. Sempre participa das reuniões e ajuda na organização dos eventos locais.",
    status: "adimplente",
    ultimoPagamento: "2023-06-15",
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    rg: "98.765.432-1",
    cpf: "987.654.321-00",
    nascimento: "1978-08-22",
    estadoCivil: "Solteiro(a)",
    rua: "Av. Principal",
    numero: "456",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69000-001",
    telefone: "(92) 91234-5678",
    tipoResidencia: "Madeira",
    qtdPessoas: 3,
    tempoResidencia: "2018-05-10",
    observacao: "",
    status: "inadimplente",
    ultimoPagamento: "2023-03-10",
  },
  {
    id: "3",
    nome: "Pedro Santos",
    rg: "45.678.912-3",
    cpf: "456.789.123-00",
    nascimento: "1990-12-03",
    estadoCivil: "União Estável",
    rua: "Rua dos Pinheiros",
    numero: "789",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69000-002",
    telefone: "(92) 99876-5432",
    tipoResidencia: "Mista",
    qtdPessoas: 2,
    tempoResidencia: "2019-03-20",
    observacao: "Possui deficiência física. Necessita de atenção especial para acessibilidade.",
    status: "inadimplente",
    ultimoPagamento: "2023-02-05",
  },
  {
    id: "4",
    nome: "Ana Souza",
    rg: "78.912.345-6",
    cpf: "789.123.456-00",
    nascimento: "1982-07-18",
    estadoCivil: "Divorciado(a)",
    rua: "Alameda Santos",
    numero: "1011",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69000-003",
    telefone: "(92) 95678-1234",
    tipoResidencia: "Estância",
    qtdPessoas: 5,
    tempoResidencia: "2017-11-08",
    observacao: "Família numerosa com crianças pequenas. Prioridade para programas sociais.",
    status: "adimplente",
    ultimoPagamento: "2023-06-20",
  },
  {
    id: "5",
    nome: "Carlos Ferreira",
    rg: "32.165.498-7",
    cpf: "321.654.987-00",
    nascimento: "1975-04-12",
    estadoCivil: "Viúvo",
    rua: "Rua Augusta",
    numero: "1213",
    bairro: "PURAQUEQUARA (Com. Bela Vista)",
    cep: "69000-004",
    telefone: "(92) 94321-8765",
    tipoResidencia: "Alvenaria",
    qtdPessoas: 1,
    tempoResidencia: "2021-09-15",
    observacao: "",
    status: "inadimplente",
    ultimoPagamento: "2023-01-15",
  },
]

export function MoradoresTable({ filter }: MoradoresTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtra os moradores com base no termo de busca e no filtro de status
  const filteredMoradores = moradoresData
    .filter((morador) => {
      if (filter === "adimplentes") return morador.status === "adimplente"
      if (filter === "inadimplentes") return morador.status === "inadimplente"
      return true
    })
    .filter(
      (morador) =>
        morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        morador.cpf.includes(searchTerm) ||
        morador.rg.includes(searchTerm) ||
        morador.rua.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  const calcularIdade = (nascimento: string) => {
    const hoje = new Date()
    const dataNasc = new Date(nascimento)
    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    const mes = hoje.getMonth() - dataNasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--
    }
    return idade
  }

  const calcularTempoResidencia = (dataInicio: string) => {
    const hoje = new Date()
    const inicio = new Date(dataInicio)
    const anos = hoje.getFullYear() - inicio.getFullYear()
    const meses = hoje.getMonth() - inicio.getMonth()

    if (anos > 0) {
      return `${anos} ano${anos > 1 ? "s" : ""}`
    } else if (meses > 0) {
      return `${meses} mês${meses > 1 ? "es" : ""}`
    } else {
      return "Menos de 1 mês"
    }
  }

  const calcularTempoResidenciaCompleto = (dataInicio: string) => {
    const hoje = new Date()
    const inicio = new Date(dataInicio)

    return `${inicio.getFullYear()} A ${hoje.getFullYear()}`
  }

  const handleImprimirFicha = (morador: any) => {
    const dataAtual = new Date().toLocaleDateString("pt-BR")

    // Criar conteúdo HTML para impressão da ficha seguindo o modelo da imagem
    const fichaContent = `
      <html>
        <head>
          <title>Ficha Cadastral - ${morador.nome}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              font-size: 12px;
              line-height: 1.2;
              background: white;
              padding: 20px;
            }
            .header {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .logo {
              width: 80px;
              height: 80px;
              border: 2px solid #000;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 16px;
              margin-right: 15px;
              background: #f0f0f0;
            }
            .header-text {
              flex: 1;
            }
            .header-text h1 {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .header-text p {
              font-size: 10px;
              margin-bottom: 2px;
            }
            .title {
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              margin: 20px 0;
              background: #e6f3ff;
              padding: 8px;
              border: 1px solid #000;
            }
            .form-section {
              margin-bottom: 15px;
            }
            .form-row {
              display: flex;
              margin-bottom: 8px;
              align-items: center;
            }
            .form-field {
              border: 1px solid #000;
              padding: 5px;
              display: flex;
              align-items: center;
            }
            .form-label {
              background: #e6f3ff;
              padding: 5px 8px;
              font-weight: bold;
              border-right: 1px solid #000;
              min-width: 80px;
            }
            .form-value {
              padding: 5px 8px;
              flex: 1;
              min-height: 20px;
            }
            .checkbox-group {
              display: flex;
              gap: 15px;
              padding: 5px 8px;
            }
            .checkbox-item {
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .checkbox {
              width: 12px;
              height: 12px;
              border: 1px solid #000;
              display: inline-block;
              text-align: center;
              line-height: 10px;
            }
            .obs-section {
              margin: 20px 0;
            }
            .obs-field {
              border: 1px solid #000;
              min-height: 120px;
              padding: 10px;
            }
            .obs-label {
              background: #e6f3ff;
              padding: 5px 8px;
              font-weight: bold;
              border: 1px solid #000;
              border-bottom: none;
            }
            .signature-section {
              margin-top: 30px;
            }
            .signature-row {
              display: flex;
              margin-bottom: 15px;
            }
            .signature-field {
              border: 1px solid #000;
              padding: 5px;
              display: flex;
              align-items: center;
              flex: 1;
            }
            .signature-label {
              background: #e6f3ff;
              padding: 5px 8px;
              font-weight: bold;
              border-right: 1px solid #000;
              min-width: 150px;
            }
            .signature-area {
              padding: 20px;
              flex: 1;
              min-height: 40px;
            }
            .footer-info {
              text-align: right;
              margin-top: 20px;
              font-size: 10px;
            }
            @media print { 
              body { margin: 0; padding: 15px; }
              .header { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <!-- Cabeçalho -->
          <div class="header">
            <div class="logo">CSELA</div>
            <div class="header-text">
              <h1>CENTRO SOCIAL E EDUCACIONAL DO LAGO DO ALEIXO</h1>
              <p>CNPJ: Nº 04.136.277/0001-40 - Util. Pública Est. Lei Nº 2.458 Util. Pública</p>
              <p>402 - Rua João Mário Nº 21 - 11 de maio - Col. Antônio Aleixo - Tel. 3618-5221 /</p>
              <p>99504-8351 CEP: 69008-120 - Manaus – Amazonas</p>
            </div>
          </div>

          <!-- Título -->
          <div class="title">SERVIÇO COMUNITÁRIO DE ÁGUA DADOS CADASTRAIS</div>

          <!-- Nome -->
          <div class="form-row">
            <div class="form-field" style="flex: 1;">
              <div class="form-label">Nome:</div>
              <div class="form-value">${morador.nome.toUpperCase()}</div>
            </div>
          </div>

          <!-- RG, CPF, Nascimento -->
          <div class="form-row">
            <div class="form-field" style="flex: 1;">
              <div class="form-label">RG</div>
              <div class="form-value">${morador.rg}</div>
            </div>
            <div class="form-field" style="flex: 1;">
              <div class="form-label">CPF</div>
              <div class="form-value">${morador.cpf}</div>
            </div>
            <div class="form-field" style="flex: 1;">
              <div class="form-label">Nascimento</div>
              <div class="form-value">${new Date(morador.nascimento).toLocaleDateString("pt-BR")}</div>
            </div>
          </div>

          <!-- Estado Civil -->
          <div class="form-row">
            <div class="form-field" style="flex: 1;">
              <div class="form-label">Estado Civil:</div>
              <div class="checkbox-group">
                <div class="checkbox-item">
                  <span class="checkbox">${morador.estadoCivil === "Solteiro(a)" ? "X" : ""}</span>
                  <span>Solteiro(a);</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.estadoCivil === "Casado(a)" ? "X" : ""}</span>
                  <span>Casado(a);</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.estadoCivil === "União Estável" ? "X" : ""}</span>
                  <span>União Estável;</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.estadoCivil === "Divorciado(a)" ? "X" : ""}</span>
                  <span>Divorciado(a);</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.estadoCivil === "Viúvo" ? "X" : ""}</span>
                  <span>Viúvo</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Rua e Número -->
          <div class="form-row">
            <div class="form-field" style="flex: 3;">
              <div class="form-label">Rua:</div>
              <div class="form-value">${morador.rua.toUpperCase()}</div>
            </div>
            <div class="form-field" style="flex: 1;">
              <div class="form-label">N.º</div>
              <div class="form-value">${morador.numero}</div>
            </div>
          </div>

          <!-- Bairro, CEP, Tel -->
          <div class="form-row">
            <div class="form-field" style="flex: 2;">
              <div class="form-label">BAIRRO:</div>
              <div class="form-value">${morador.bairro}</div>
            </div>
            <div class="form-field" style="flex: 1;">
              <div class="form-label">Cep:</div>
              <div class="form-value">${morador.cep}</div>
            </div>
            <div class="form-field" style="flex: 1;">
              <div class="form-label">Tel:</div>
              <div class="form-value">${morador.telefone}</div>
            </div>
          </div>

          <!-- Tipo de Residência -->
          <div class="form-row">
            <div class="form-field" style="flex: 1;">
              <div class="form-label">Tipo de Residência:</div>
              <div class="checkbox-group">
                <div class="checkbox-item">
                  <span class="checkbox">${morador.tipoResidencia === "Madeira" ? "X" : ""}</span>
                  <span>Madeira;</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.tipoResidencia === "Alvenaria" ? "X" : ""}</span>
                  <span>Alvenaria;</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.tipoResidencia === "Mista" ? "X" : ""}</span>
                  <span>Mista;</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.tipoResidencia === "Estância" ? "X" : ""}</span>
                  <span>Estância</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quantas pessoas e Tempo de residência -->
          <div class="form-row">
            <div class="form-field" style="flex: 2;">
              <div class="form-label">Quantas Pessoas Moram na Casa?</div>
              <div class="form-value" style="text-align: center; font-weight: bold;">${morador.qtdPessoas.toString().padStart(2, "0")}</div>
            </div>
            <div class="form-field" style="flex: 2;">
              <div class="form-label">Reside há Quanto Tempo?</div>
              <div class="form-value" style="text-align: center; font-weight: bold;">${calcularTempoResidenciaCompleto(morador.tempoResidencia)}</div>
            </div>
          </div>

          <!-- Observações -->
          <div class="obs-section">
            <div class="obs-label">OBS:</div>
            <div class="obs-field">
              ${morador.observacao || "APRESENTADO RG, E CPF PARA REGULARIZAR SEM RISCO DE PRAZOS IMPORTANTE ATÉ DIA 15-PARA REGULARIZAR SEM RISCO DE SUSPENSÃO. TAXA 45,00 MENSAL MIL LITROS"}
            </div>
          </div>

          <!-- Informações do rodapé -->
          <div class="footer-info">
            <p>CSELA-CNPJ: 04.136.277/0001-40</p>
            <p>Manaus ${dataAtual}</p>
          </div>

          <!-- Assinaturas -->
          <div class="signature-section">
            <div class="signature-row">
              <div class="signature-field">
                <div class="signature-label">Assinatura do Pesquisador:</div>
                <div class="signature-area"></div>
              </div>
            </div>
            <div class="signature-row">
              <div class="signature-field">
                <div class="signature-label">Assinatura do Informante:</div>
                <div class="signature-area"></div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Abrir nova janela para impressão
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(fichaContent)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar moradores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-[300px]"
          />
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>RG</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Nascimento</TableHead>
                <TableHead>Rua</TableHead>
                <TableHead>Nº</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>CEP</TableHead>
                <TableHead>Tel</TableHead>
                <TableHead>Tipo Residência</TableHead>
                <TableHead>Qtd Pessoas</TableHead>
                <TableHead>Tempo Residência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Pagamento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMoradores.map((morador) => (
                <TableRow key={morador.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {morador.nome}
                      {morador.observacao && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Observações - {morador.nome}</DialogTitle>
                              <DialogDescription>{morador.observacao}</DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{morador.rg}</TableCell>
                  <TableCell>{morador.cpf}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>{new Date(morador.nascimento).toLocaleDateString("pt-BR")}</TooltipTrigger>
                      <TooltipContent>{calcularIdade(morador.nascimento)} anos</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{morador.rua}</TableCell>
                  <TableCell>{morador.numero}</TableCell>
                  <TableCell className="text-xs">{morador.bairro}</TableCell>
                  <TableCell>{morador.cep}</TableCell>
                  <TableCell>{morador.telefone}</TableCell>
                  <TableCell>{morador.tipoResidencia}</TableCell>
                  <TableCell className="text-center">{morador.qtdPessoas}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>{calcularTempoResidencia(morador.tempoResidencia)}</TooltipTrigger>
                      <TooltipContent>
                        Desde {new Date(morador.tempoResidencia).toLocaleDateString("pt-BR")}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Badge variant={morador.status === "adimplente" ? "outline" : "destructive"}>
                      {morador.status === "adimplente" ? "Adimplente" : "Inadimplente"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(morador.ultimoPagamento).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/moradores/${morador.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/moradores/${morador.id}/editar`}>
                            <FileText className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/moradores/${morador.id}/pagamentos`}>
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimir Carnê
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleImprimirFicha(morador)}>
                          <Printer className="mr-2 h-4 w-4" />
                          Imprimir Ficha
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}
