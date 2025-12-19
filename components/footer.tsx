import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Droplet } from "lucide-react"
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-primary-foreground border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/images/cselaLogo.png" 
                alt="CSELA Logo" 
                width={24} 
                height={24}
                className="h-12 w-12"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Levando água limpa e vida para comunidades necessitadas desde 2005.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/nossa-historia" className="text-muted-foreground hover:text-primary">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Rua Mané Garrincha, 258
                  <br />
                  Bairro Puraquequara, Manaus - AM
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+55 (92) 99504-8351</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">sercsela321@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CSELA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
