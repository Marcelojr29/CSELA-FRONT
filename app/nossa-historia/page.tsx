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
          <CardDescription>24 de abril de 1972</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            O Centro Social e Educacional do Lago do Aleixo (CSELA) foi fundado por um grupo de moradores do bairro Lago do Aleixo, em Manaus, com o objetivo de combater desafios sociais, especialmente o preconceito contra portadores e ex-portadores do Mal de Hansen (lepra). A organização ganhou estrutura e apoio da Igreja Católica, incluindo missionários como Pe. Ludovico Crimella e Pe. José Maria Fumagalli.
          </p>
        </CardContent>
      </Card>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-primary">Linha do Tempo</h2>
        <Timeline
          items={[
            {
              year: "2005-2006",
              title: "Projeto Água Para Todos – Bela Vista",
              description: "Primeira reunião com lideranças comunitárias para discutir a falta de água no bairro Bela Vista, onde 700 famílias dependiam de poços artesianos sem rede de distribuição. Crianças e mulheres transportavam água manualmente, prejudicando estudos e condições higiênicas. ",
            },
            {
              year: "2005",
              title: "Projeto Água Para Todos – Bela Vista - Julho",
              description:
                "Elaboração do projeto pelo CSELA, com financiamento do grupo ALLEIMAR (80% dos recursos) e contrapartida da comunidade (20%).",
            },
            {
              year: "2005",
              title: "Projeto Água Para Todos – Bela Vista - Dezembro",
              description: "Reunião com 400 famílias para apresentar o projeto, que incluía escavação de valas, instalação de tubulações e perfuração de novos poços.",
            },
            {
              year: "2006",
              title: "Projeto Água Para Todos – Bela Vista - Fevereiro",
              description:
                "Início das obras, com mutirões comunitários para escavar 6.363 metros de tubulações. ",
            },
            {
              year: "2006",
              title: "Projeto Água Para Todos – Bela Vista - Julho",
              description: "Conclusão do projeto, beneficiando **800 famílias** (3.600 pessoas) com água canalizada.",
            },
            {
              year: "2006",
              title: "Projeto Água Para Todos – Bela Vista - Agosto",
              description: "Visita do grupo ALLEIMAR para avaliação.",
            },
            {
              year: "2007-2009",
              title: "Impacto e Expansão - 2007",
              description: "Formalização de três funcionários do programa com carteira assinada e Inauguração do escritório de arrecadação",
            },
            {
              year: "2007-2009",
              title: "Impacto e Expansão - 2008",
              description: "Perfuração de novo poço pela Prefeitura (plano emergencial) e Pesquisa de avaliação do projeto, com resultados positivos",
            },
            {
              year: "2007-2009",
              title: "Impacto e Expansão - 2009",
              description: "Elaboração de artigo científico sobre o programa.",
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
            Mais de 50 anos após sua fundação, o CSELA continua sendo uma <strong>semente de transformação social</strong> na Colônia Antônio Aleixo e entorno. Mantemos nosso compromisso com o desenvolvimento comunitário através das quatro dimensões fundamentais: <strong>Pedagógica, Geração de Renda, Saúde da População e Habitação</strong>.
          </p>
          <p className="mb-4 text-muted-foreground">
            O projeto <strong>"Água Para Todos"</strong> tornou-se referência em autogestão comunitária, beneficiando milhares de famílias com água potável através de um sistema sustentável mantido pela própria comunidade. Continuamos fortalecendo o vínculo com as comissões organizadas e expandindo nossa atuação para outras comunidades carentes de Manaus.
          </p>
          <p className="text-muted-foreground">
            Nossa metodologia de <strong>participação popular e autogestão</strong> já inspirou outras comunidades e demonstra que é possível, através da organização coletiva, resolver problemas graves mesmo sem o apoio do poder público, garantindo dignidade e cidadania para milhares de pessoas.
          </p>
        </CardContent>
      </Card>

      <div className="mt-12">
  <h2 className="mb-6 text-2xl font-bold text-primary">Eventos Importantes</h2>
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[
      {
        title: "Ação Social da Comunidade Bela Vista",
        date: "2022",
        description: "Cerimônia de Ação Social da Comunidade Bela Vista",
        image: "/images/Acao.jpeg"
      },
      {
        title: "Ação Social da Comunidade Bela Vista",
        date: "2022",
        description: "Cerimônia de Ação Social da Comunidade Bela Vista",
        image: "/images/AcaoSocial.jpeg"
      },
      {
        title: "Nova estrutura do escritório CSELA da Comunidade Bela Vista",
        date: "2022",
        description: "Nova estrutura do escritório CSELA da Comunidade Bela Vista",
        image: "/images/CselaFrente.jpeg"
      },
      {
        title: "Nova estrutura dos poços da Comunidade Bela Vista",
        date: "2022",
        description: "Nova estrutura dos poços da Comunidade Bela Vista",
        image: "/images/CselaPoco.jpeg"
      },
      {
        title: "Nova estrutura dos reservatórios da Comunidade Bela Vista",
        date: "Fevereiro 2008",
        description: "Nova estrutura dos reservatórios da Comunidade Bela Vista",
        image: "/images/CselaReservatorio.jpeg"
      },
      {
        title: "Escavação para expansão dos poços da Comunidade Bela Vista",
        date: "2024",
        description: "Escavação para expansão dos poços da Comunidade Bela Vista",
        image: "/images/Escavacao2.jpeg"
      },
      {
        title: "Escavação para expansão dos poços da Comunidade Bela Vista",
        date: "2024",
        description: "Escavação para expansão dos poços da Comunidade Bela Vista",
        image: "/images/Escavacao3.jpeg"
      },
      {
        title: "Escavação para expansão dos poços da Comunidade Bela Vista",
        date: "2024",
        description: "Escavação para expansão dos poços da Comunidade Bela Vista",
        image: "/images/Escavacao4.jpeg"
      },
      {
        title: "Escavação para expansão dos poços da Comunidade Bela Vista",
        date: "2024",
        description: "Escavação para expansão dos poços da Comunidade Bela Vista",
        image: "/images/Escavao1.jpeg"
      },
      {
        title: "Presidente Edivaldo Barreto",
        date: "2024",
        description: "Presidente Edivaldo Barreto palestrando na ação social da Comunidade Bela Vista",
        image: "/images/Padre.jpeg"
      },
    ].map((event, index) => (
      <Card key={index} className="overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-80 object-cover"
          />
        </div>
        <CardHeader className="pb-3">
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
