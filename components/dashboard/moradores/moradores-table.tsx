"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, FileText, Printer, MessageSquare, Eye, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
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
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { MoradoresTableProps } from "@/interfaces/IMoradoresTableProps"
import { useMoradoresAPI, type Morador } from "@/hooks/use-moradores-api"

export function MoradoresTable({ filter }: MoradoresTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [moradorParaExcluir, setMoradorParaExcluir] = useState<Morador | null>(null)
  const [excluindoMorador, setExcluindoMorador] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { moradores, moradoresResponse, isLoading, error, buscarMoradores, excluirMorador } = useMoradoresAPI()
  const { toast } = useToast()

  const fetchMoradores = useCallback(async (page = currentPage, limit = pageSize, search = searchTerm) => {
    const filtros: any = {
      page,
      limit,
    }
    
    if (filter) {
      filtros.status = filter === "adimplentes" ? "Adimplente" : "Inadimplente"
    }
    
    if (search.trim()) {
      filtros.search = search.trim()
    }
    
    await buscarMoradores(filtros)
  }, [filter, currentPage, pageSize, searchTerm, buscarMoradores])

  // Buscar moradores ao montar o componente ou quando os filtros/paginação mudarem
  useEffect(() => {
    fetchMoradores()
  }, [fetchMoradores])

  // Reset para primeira página quando filtros mudarem
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [filter, searchTerm])

  // Usar dados diretamente da API (já filtrados no backend)
  const filteredMoradores = moradores

  const calcularIdade = (dataDeNascimento: string) => {
    const hoje = new Date()
    const dataNasc = new Date(dataDeNascimento)
    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    const mes = hoje.getMonth() - dataNasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--
    }
    return idade
  }

  const calcularTempoResidencia = (tempoEmMeses: number) => {
    if (tempoEmMeses >= 12) {
      const anos = Math.floor(tempoEmMeses / 12)
      return `${anos} ano${anos > 1 ? "s" : ""}`
    } else if (tempoEmMeses > 0) {
      return `${tempoEmMeses} mês${tempoEmMeses > 1 ? "es" : ""}`
    } else {
      return "1 mês"
    }
  }

  const calcularTempoResidenciaCompleto = (criadoEm: string) => {
    const hoje = new Date()
    const inicio = new Date(criadoEm)
    return `${inicio.getFullYear()} A ${hoje.getFullYear()}`
  }

  const formatarCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatarRg = (rg: string) => {
    if (rg.length <= 9) {
      return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4")
    }
    return rg
  }

  const handleImprimirFicha = (morador: Morador) => {
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
              <div class="form-value">${formatarRg(morador.rg)}</div>
            </div>
            <div class="form-field" style="flex: 1;">
              <div class="form-label">CPF</div>
              <div class="form-value">${formatarCpf(morador.cpf)}</div>
            </div>
            <div class="form-field" style="flex: 1;">
              <div class="form-label">Nascimento</div>
              <div class="form-value">${new Date(morador.dataDeNascimento).toLocaleDateString("pt-BR")}</div>
            </div>
          </div>

          <!-- Estado Civil (campo não existe na API, deixar em branco) -->
          <div class="form-row">
            <div class="form-field" style="flex: 1;">
              <div class="form-label">Estado Civil:</div>
              <div class="checkbox-group">
                <div class="checkbox-item">
                  <span class="checkbox"></span>
                  <span>Solteiro(a);</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox"></span>
                  <span>Casado(a);</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox"></span>
                  <span>União Estável;</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox"></span>
                  <span>Divorciado(a);</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox"></span>
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
              <div class="form-value">${morador.numeroResidencia}</div>
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
              <div class="form-value">${morador.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}</div>
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
                  <span class="checkbox">${morador.tipoResidencia === "Casa" || morador.tipoResidencia === "Apartamento" ? "X" : ""}</span>
                  <span>Alvenaria;</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.tipoResidencia === "Mista" ? "X" : ""}</span>
                  <span>Mista;</span>
                </div>
                <div class="checkbox-item">
                  <span class="checkbox">${morador.tipoResidencia === "Sobrado" || morador.tipoResidencia === "Comercial" ? "X" : ""}</span>
                  <span>Estância</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quantas pessoas e Tempo de residência -->
          <div class="form-row">
            <div class="form-field" style="flex: 2;">
              <div class="form-label">Quantas Pessoas Moram na Casa?</div>
              <div class="form-value" style="text-align: center; font-weight: bold;">${morador.quantidadePessoas.toString().padStart(2, "0")}</div>
            </div>
            <div class="form-field" style="flex: 2;">
              <div class="form-label">Reside há Quanto Tempo?</div>
              <div class="form-value" style="text-align: center; font-weight: bold;">${calcularTempoResidenciaCompleto(morador.criadoEm)}</div>
            </div>
          </div>

          <!-- Observações -->
          <div class="obs-section">
            <div class="obs-label">OBS:</div>
            <div class="obs-field">
              ${morador.descricao || "APRESENTADO RG, E CPF PARA REGULARIZAR SEM RISCO DE PRAZOS IMPORTANTE ATÉ DIA 15-PARA REGULARIZAR SEM RISCO DE SUSPENSÃO. TAXA 45,00 MENSAL MIL LITROS"}
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

  const handleExcluirMorador = async () => {
    if (!moradorParaExcluir) return

    setExcluindoMorador(true)
    try {
      const sucesso = await excluirMorador(moradorParaExcluir.id)
      
      if (sucesso) {
        toast({
          title: "Morador excluído com sucesso!",
          description: `${moradorParaExcluir.nome} foi removido do sistema.`,
        })
        setMoradorParaExcluir(null)
        
        // Recarregar dados mantendo a paginação atual
        // Se foi o último item da página, voltar para página anterior
        if (moradores.length === 1 && currentPage > 1) {
          const newPage = currentPage - 1
          setCurrentPage(newPage)
          fetchMoradores(newPage, pageSize, searchTerm)
        } else {
          fetchMoradores(currentPage, pageSize, searchTerm)
        }
      } else {
        throw new Error("Falha ao excluir morador")
      }
    } catch (err: any) {
      toast({
        title: "Erro ao excluir morador",
        description: err.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setExcluindoMorador(false)
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">


        {/* Modal de confirmação de exclusão */}
        <Dialog open={!!moradorParaExcluir} onOpenChange={() => setMoradorParaExcluir(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir o morador <strong>{moradorParaExcluir?.nome}</strong>?
                <br />
                <span className="text-red-600 font-medium">
                  Esta ação não pode ser desfeita.
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setMoradorParaExcluir(null)}
                disabled={excluindoMorador}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleExcluirMorador}
                disabled={excluindoMorador}
              >
                {excluindoMorador ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  "Excluir Morador"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Controles de busca e paginação */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar moradores..."
              value={searchTerm}
              onChange={(e) => {
                const newSearchTerm = e.target.value
                setSearchTerm(newSearchTerm)
                // Debounce: buscar após 500ms sem digitação
                const timeoutId = setTimeout(() => {
                  setCurrentPage(1)
                  fetchMoradores(1, pageSize, newSearchTerm)
                }, 500)
                return () => clearTimeout(timeoutId)
              }}
              className="h-8 w-[300px]"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Itens por página:</span>
            <select 
              value={pageSize} 
              onChange={(e) => {
                const newPageSize = Number(e.target.value)
                setPageSize(newPageSize)
                setCurrentPage(1)
                fetchMoradores(1, newPageSize, searchTerm)
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Carregando moradores...</span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex justify-center items-center py-8 text-red-500">
            <span>Erro ao carregar moradores: {error.message}</span>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && (
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
                {filteredMoradores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={15} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "Nenhum morador encontrado com os filtros aplicados" : "Nenhum morador cadastrado"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMoradores.map((morador) => (
                    <TableRow key={morador.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {morador.nome}
                          {morador.descricao && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MessageSquare className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Observações - {morador.nome}</DialogTitle>
                                  <DialogDescription>{morador.descricao}</DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatarRg(morador.rg)}</TableCell>
                      <TableCell>{formatarCpf(morador.cpf)}</TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>{new Date(morador.dataDeNascimento).toLocaleDateString("pt-BR")}</TooltipTrigger>
                          <TooltipContent>{calcularIdade(morador.dataDeNascimento)} anos</TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{morador.rua}</TableCell>
                      <TableCell>{morador.numeroResidencia}</TableCell>
                      <TableCell className="text-xs">{morador.bairro}</TableCell>
                      <TableCell>{morador.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}</TableCell>
                      <TableCell>{morador.telefone}</TableCell>
                      <TableCell>{morador.tipoResidencia}</TableCell>
                      <TableCell className="text-center">{morador.quantidadePessoas}</TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>{calcularTempoResidencia(morador.tempoResidencia)}</TooltipTrigger>
                          <TooltipContent>
                            Desde {new Date(morador.criadoEm).toLocaleDateString("pt-BR")}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Badge variant={morador.status === "Adimplente" ? "outline" : "destructive"}>
                          {morador.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {morador.dataUltimoPagamento
                          ? new Date(morador.dataUltimoPagamento).toLocaleDateString("pt-BR")
                          : "Nunca"}
                      </TableCell>
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
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => setMoradorParaExcluir(morador)}
                            >
                              Excluir
                            </DropdownMenuItem>
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Controles de paginação */}
        {!isLoading && !error && moradoresResponse && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Mostrando {((moradoresResponse.page - 1) * moradoresResponse.limit) + 1} a{" "}
                {Math.min(moradoresResponse.page * moradoresResponse.limit, moradoresResponse.total)} de{" "}
                {moradoresResponse.total} moradores
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPage = currentPage - 1
                  setCurrentPage(newPage)
                  fetchMoradores(newPage, pageSize, searchTerm)
                }}
                disabled={currentPage <= 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              
              <div className="flex items-center gap-1">
                {/* Paginação numerada */}
                {Array.from({ length: Math.min(5, moradoresResponse.totalPages) }, (_, i) => {
                  const pageNumber = Math.max(1, Math.min(
                    moradoresResponse.totalPages - 4,
                    Math.max(1, currentPage - 2)
                  )) + i
                  
                  if (pageNumber > moradoresResponse.totalPages) return null
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setCurrentPage(pageNumber)
                        fetchMoradores(pageNumber, pageSize, searchTerm)
                      }}
                      disabled={isLoading}
                      className="w-8 h-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
                
                {moradoresResponse.totalPages > 5 && currentPage < moradoresResponse.totalPages - 2 && (
                  <>
                    <span className="px-2 text-muted-foreground">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentPage(moradoresResponse.totalPages)
                        fetchMoradores(moradoresResponse.totalPages, pageSize, searchTerm)
                      }}
                      disabled={isLoading}
                      className="w-8 h-8 p-0"
                    >
                      {moradoresResponse.totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPage = currentPage + 1
                  setCurrentPage(newPage)
                  fetchMoradores(newPage, pageSize, searchTerm)
                }}
                disabled={currentPage >= moradoresResponse.totalPages || isLoading}
              >
                Próximo
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
