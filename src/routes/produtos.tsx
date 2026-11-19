import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Speaker, Smartphone, Laptop, Tv } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
import { products, addToCart, brl, useCart } from "@/lib/store";
const icons = { speaker: Speaker, phone: Smartphone, laptop: Laptop, tv: Tv } as Record<string, typeof Tv>;
export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [
    { title: "Produtos — Plataforma" },
    { name: "description", content: "Caixas de som, smartphones, notebooks e smart TVs em até 10x sem juros." },
    { property: "og:title", content: "Produtos — Plataforma" },
    { property: "og:description", content: "Eletrônicos em até 10x sem juros." },
  ] }),
  component: Produtos,
});
function Produtos() {
  const [q, setQ] = useState("");
  const cart = useCart();
  const list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const total = cart.reduce((s, id) => s + (products.find((p) => p.id === id)?.price ?? 0), 0);
  return (
    <Shell>
      <label className="flex items-center gap-3 rounded-md bg-card-light px-4 py-3 text-card-light-foreground">
        <Search /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="PESQUISAR PRODUTO" className="flex-1 bg-transparent font-serif-b outline-none placeholder:text-card-light-foreground/60" />
      </label>
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {list.map((p) => { const I = icons[p.icon] ?? Tv; return (
          <div key={p.id} className="flex flex-col items-center text-center">
            <div className="flex aspect-square w-full items-center justify-center rounded-md bg-card-light text-card-light-foreground shadow-glow"><I size={72} /></div>
            <h3 className="mt-3 text-sm font-semibold">{p.name}</h3>
            <p className="font-bold text-primary">{brl(p.price)} à vista</p>
            <p className="text-xs text-muted-foreground">em até {p.installments}</p>
            <button aria-label={`Adicionar ${p.name}`} onClick={() => { addToCart(p.id); toast.success("Adicionado ao carrinho"); }} className="mt-4 rounded-full bg-card-light p-3 text-card-light-foreground transition hover:scale-110"><Plus size={28} /></button>
          </div>); })}
      </div>
      {cart.length > 0 && <p className="mt-10 text-center font-serif-b">Carrinho: {cart.length} itens — {brl(total)}</p>}
    </Shell>
  );
}
