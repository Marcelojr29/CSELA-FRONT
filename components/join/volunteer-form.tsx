"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send } from "lucide-react"

export default function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de processamento
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Formulário enviado com sucesso! Entraremos em contato em breve.")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Informações Pessoais</Label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" placeholder="Seu nome completo" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" placeholder="(00) 00000-0000" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Cidade/Estado</Label>
            <Input id="city" placeholder="Sua cidade e estado" required />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Disponibilidade e Interesses</Label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="area">Área de Interesse</Label>
            <Select>
              <SelectTrigger id="area">
                <SelectValue placeholder="Selecione uma área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="field">Trabalho de Campo</SelectItem>
                <SelectItem value="technical">Suporte Técnico</SelectItem>
                <SelectItem value="education">Educação Ambiental</SelectItem>
                <SelectItem value="administrative">Administrativo</SelectItem>
                <SelectItem value="communication">Comunicação</SelectItem>
                <SelectItem value="fundraising">Captação de Recursos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="availability">Disponibilidade</Label>
            <Select>
              <SelectTrigger id="availability">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays">Dias de semana</SelectItem>
                <SelectItem value="weekends">Finais de semana</SelectItem>
                <SelectItem value="both">Ambos</SelectItem>
                <SelectItem value="flexible">Flexível</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Horas por semana</Label>
            <Select>
              <SelectTrigger id="hours">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 horas</SelectItem>
                <SelectItem value="5-10">5-10 horas</SelectItem>
                <SelectItem value="10-20">10-20 horas</SelectItem>
                <SelectItem value="20+">Mais de 20 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Período de voluntariado</Label>
            <Select>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Curto prazo (até 3 meses)</SelectItem>
                <SelectItem value="medium">Médio prazo (3-6 meses)</SelectItem>
                <SelectItem value="long">Longo prazo (mais de 6 meses)</SelectItem>
                <SelectItem value="project">Por projeto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Habilidades e Experiência</Label>
        <div className="space-y-2">
          <Label htmlFor="skills">Habilidades Relevantes</Label>
          <Textarea
            id="skills"
            placeholder="Descreva suas habilidades que podem contribuir com nossos projetos..."
            rows={3}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Experiência Prévia</Label>
          <Textarea
            id="experience"
            placeholder="Conte-nos sobre experiências anteriores de voluntariado ou trabalho relevante..."
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="motivation">Por que você deseja ser voluntário na CSELA?</Label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="terms" />
          <Label
            htmlFor="terms"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Concordo em receber comunicações da CSELA e estou ciente da{" "}
            <a href="#" className="text-primary underline">
              Política de Privacidade
            </a>
            .
          </Label>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          "Enviando..."
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar Inscrição
          </>
        )}
      </Button>
    </form>
  )
}
