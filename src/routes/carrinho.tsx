import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { addToCart, brl, products, removeFromCart, useCart } from "@/lib/store";

export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [
    { title: "Carrinho — Plataforma" },
    { name: "description", content: "Confira os produtos, quantidades e total do seu carrinho na Plataforma." },
    { property: "og:title", content: "Carrinho — Plataforma" },
    { property: "og:description", content: "Seus produtos e o total do carrinho." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Carrinho,
});

function Carrinho() {
  const cart = useCart();
  const items = products.map((product) => ({ ...product, quantity: cart.filter((id) => id === product.id).length })).filter((item) => item.quantity > 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Shell>
      <h2 className="mb-8 flex items-center gap-3 font-serif-b text-2xl"><ShoppingCart />Carrinho</h2>
      {items.length === 0 ? (
        <div className="py-12 text-center">
          <ShoppingCart className="mx-auto mb-4 size-16 text-muted-foreground" />
          <p className="mb-6">Seu carrinho está vazio.</p>
          <Button asChild><Link to="/produtos">Ver produtos</Link></Button>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-4 py-6">
                <div className="min-w-0 flex-1 basis-48">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="mt-1 text-muted-foreground">{brl(item.price)} por unidade</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" aria-label={`Diminuir quantidade de ${item.name}`} title="Diminuir quantidade" onClick={() => removeFromCart(item.id)}><Minus /></Button>
                  <span className="w-8 text-center" aria-label={`Quantidade de ${item.name}`}>{item.quantity}</span>
                  <Button variant="outline" size="icon" aria-label={`Aumentar quantidade de ${item.name}`} title="Aumentar quantidade" onClick={() => addToCart(item.id)}><Plus /></Button>
                </div>
                <p className="w-32 text-right font-bold text-primary">{brl(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
            <Button variant="outline" asChild><Link to="/produtos">Continuar comprando</Link></Button>
            <p className="font-serif-b text-xl">Total: {brl(total)}</p>
          </div>
        </>
      )}
    </Shell>
  );
}