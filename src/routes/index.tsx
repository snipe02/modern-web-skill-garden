import { createFileRoute, Link } from "@tanstack/react-router";
import { Send, Phone, Mail, MapPin, Monitor, Truck, Tag, ShoppingCart } from "lucide-react";
import { Shell } from "@/components/Shell";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Plataforma — Vendas on-line de materiais tecnológicos" },
    { name: "description", content: "Loja on-line de eletrônicos: som, smartphones, notebooks e TVs com frete grátis." },
    { property: "og:title", content: "Plataforma — Materiais Tecnológicos" },
    { property: "og:description", content: "Eletrônicos com ofertas e frete grátis." },
  ] }),
  component: Index,
});
function Index() {
  const feats = [[Monitor, "Loja"], [Truck, "Frete grátis"], [Tag, "Ofertas"], [ShoppingCart, "Compras"]] as const;
  return (
    <Shell>
      <div className="mx-auto flex max-w-md flex-col gap-4">
        {[["/", "INÍCIO"], ["/produtos", "PRODUTO"], ["/contato", "CONTATO"]].map(([to, l]) => (
          <Link key={to} to={to} className="pill"><Send className="text-primary" /> <span className="flex-1 text-center">{l}</span></Link>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
        {feats.map(([Icon, l]) => (
          <Link to="/produtos" key={l} className="flex flex-col items-center gap-2 font-serif-b uppercase transition hover:text-primary"><Icon size={64} strokeWidth={1.5} />{l}</Link>
        ))}
      </div>
      <ul className="mx-auto mt-12 max-w-md space-y-3 text-sm">
        <li className="flex items-center gap-3"><Phone className="text-primary" />(86) 99909-4808</li>
        <li className="flex items-center gap-3"><Mail className="text-primary" />alamberg_silva@hotmail.com</li>
        <li className="flex items-center gap-3"><MapPin className="text-primary" />Barro Duro - Piauí</li>
      </ul>
    </Shell>
  );
}
