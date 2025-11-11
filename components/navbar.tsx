"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Droplet } from "lucide-react"
import Image from "next/image" // Importe o componente Image

const navItems = [
  { label: "Home", href: "/" },
  { label: "Nossa História", href: "/nossa-historia" },
  { label: "Contato", href: "/contato" },
  // { label: "Associe-se", href: "/associe-se" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={() => setIsOpen(false)}>
              {/* Substitua também no menu mobile */}
              <Image 
                src="/images/cselaLogoPreta2.png" 
                alt="CSELA Logo" 
                width={24} 
                height={24}
                className="h-6 w-6"
              />
            </Link>
            <nav className="mt-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="mt-4 text-lg font-medium text-primary transition-colors hover:text-primary/80"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Aqui está a substituição do Droplet pelo logo */}
        <Link href="/" className="flex items-center gap-2 md:mr-6">
          <Image 
            src="/images/cselaLogoPreta2.png" 
            alt="CSELA Logo" 
            width={24} 
            height={24}
            className="h-12 w-16"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-between md:flex">
          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/login">
            <Button variant="default" size="sm">
              Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
