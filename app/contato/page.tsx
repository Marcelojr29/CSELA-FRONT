import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">Entre em Contato</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Estamos sempre disponíveis para ouvir suas dúvidas, sugestões ou para conversar sobre como podemos trabalhar
          juntos.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Envie-nos uma mensagem</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo e entraremos em contato o mais breve possível.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>Outras formas de entrar em contato conosco</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Endereço</h3>
                  <p className="text-sm text-muted-foreground">
                    Rua Mané Garrincha, 258
                    <br />
                    Bairro Puraquequara, Manaus - AM
                    <br />
                    CEP: 69009-305
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Telefone</h3>
                  <p className="text-sm text-muted-foreground">
                    +55 (92) 99504-8351
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">E-mail</h3>
                  <p className="text-sm text-muted-foreground">
                    sercsela321@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Horário de Atendimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Segunda a Sexta: 7h às 14h
                    <br />
                    Sábado: 7h às 12h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mapa</CardTitle>
              <CardDescription>Localização da nossa sede</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full overflow-hidden rounded-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.914318258758!2d-59.984583925019!3d-3.134371840238952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c055b5e8a61c5%3A0x3bfcb8727338c4b8!2sR.%20Man%C3%A9%20Garrincha%2C%20258%20-%20Puraquequara%2C%20Manaus%20-%20AM%2C%2069009-305!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da CSELA"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
