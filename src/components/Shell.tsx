import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/store";
export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative mx-auto max-w-5xl px-6 pt-6">
        <div className="flex items-center justify-between">
          <button aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X size={36} /> : <Menu size={36} />}</button>
          <Link to="/produtos" className="relative" aria-label="Carrinho">
            <ShoppingCart size={40} />
            {cart.length > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">{cart.length}</span>}
          </Link>
        </div>
        <div className="relative mt-2 text-center">
          <h1 className="font-display text-6xl leading-none tracking-tight md:text-8xl">PLATAFORMA</h1>
          <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-serif-b text-sm drop-shadow md:text-xl [text-shadow:0_0_6px_var(--background)]">VENDAS ON-LINE DE MATERIAIS TECNOLÓGICOS</p>
        </div>
        {open && (
          <nav className="absolute left-6 top-20 z-10 flex flex-col gap-2 rounded-lg border bg-card p-4 font-serif-b">
            {([["/", "Início"], ["/produtos", "Produtos"], ["/contato", "Contato"]] as const).map(([to, l]) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} className="hover:text-primary">{l}</Link>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
