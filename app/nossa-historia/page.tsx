import { Timeline } from "@/components/timeline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OurHistoryPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">Nossa História</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Conheça a trajetória da CSELA e como nos tornamos referência na distribuição de água para comunidades
          necessitadas.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Como Tudo Começou</CardTitle>
          <CardDescription>2005 - Os primeiros passos</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A CSELA nasceu da iniciativa de um grupo de engenheiros ambientais e ativistas sociais que identificaram a
            grave crise hídrica em comunidades rurais do nordeste brasileiro. O que começou como um projeto voluntário
            de instalação de cisternas em 5 comunidades, rapidamente se expandiu quando os resultados positivos
            começaram a aparecer.
          </p>
        </CardContent>
      </Card>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Linha do Tempo</h2>
        <Timeline
          items={[
            {
              year: "2005",
              title: "Fundação",
              description: "Criação da ONG e primeiros projetos em 5 comunidades rurais",
            },
            {
              year: "2008",
              title: "Expansão Regional",
              description:
                "Ampliação para 20 comunidades e desenvolvimento do primeiro sistema de captação de água da chuva",
            },
            {
              year: "2012",
              title: "Reconhecimento Nacional",
              description: "Prêmio Nacional de Sustentabilidade e parceria com o governo federal",
            },
            {
              year: "2015",
              title: "Ponto Crucial",
              description:
                "Desenvolvimento da tecnologia própria de purificação de água e expansão para 100 comunidades",
            },
            {
              year: "2018",
              title: "Internacionalização",
              description: "Primeiros projetos internacionais na África e América Latina",
            },
            {
              year: "2023",
              title: "Atualidade",
              description: "Presente em 5 países, com mais de 500 comunidades atendidas e 1 milhão de beneficiados",
            },
          ]}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nos Dias Atuais</CardTitle>
          <CardDescription>Nossa atuação hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Hoje, a CSELA é reconhecida internacionalmente pelo seu trabalho na distribuição de água potável e
            implementação de sistemas sustentáveis de captação e purificação. Contamos com uma equipe de mais de 200
            profissionais dedicados e milhares de voluntários em todo o mundo.
          </p>
          <p className="text-muted-foreground">
            Nossa metodologia inovadora já foi implementada em mais de 500 comunidades em 5 países, beneficiando
            diretamente mais de 1 milhão de pessoas. Continuamos expandindo nossos projetos e desenvolvendo novas
            tecnologias para tornar o acesso à água limpa uma realidade para todos.
          </p>
        </CardContent>
      </Card>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Eventos Importantes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Fórum Mundial da Água",
              date: "Março 2022",
              description: "Apresentação de nossas soluções no maior evento mundial sobre água",
            },
            {
              title: "Conferência da ONU",
              date: "Setembro 2021",
              description: "Participação como organização convidada para discutir soluções sustentáveis",
            },
            {
              title: "Semana da Água",
              date: "Anual - Março",
              description: "Evento organizado pela CSELA com workshops, palestras e atividades educativas",
            },
            {
              title: "Expedição Águas do Sertão",
              date: "Julho (anual)",
              description: "Projeto de mapeamento e intervenção em comunidades do semiárido",
            },
            {
              title: "Hackathon Tecnologias Hídricas",
              date: "Outubro (anual)",
              description: "Competição para desenvolvimento de soluções inovadoras para acesso à água",
            },
            {
              title: "Gala Beneficente",
              date: "Dezembro (anual)",
              description: "Evento de arrecadação de fundos para projetos do ano seguinte",
            },
          ].map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
