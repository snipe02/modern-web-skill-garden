import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Shell } from "@/components/Shell";
export const Route = createFileRoute("/contato")({
  head: () => ({ meta: [
    { title: "Contato — Plataforma" },
    { name: "description", content: "Fale com a Plataforma de vendas de materiais tecnológicos." },
    { property: "og:title", content: "Contato — Plataforma" },
    { property: "og:description", content: "Envie sua mensagem." },
  ] }),
  component: Contato,
});
function Contato() {
  const [robot, setRobot] = useState(false);
  return (
    <Shell>
      <form className="mx-auto flex max-w-md flex-col gap-4" onSubmit={(e) => { e.preventDefault(); if (!robot) { toast.error("Confirme que não é um robô"); return; } toast.success("Mensagem enviada!"); (e.target as HTMLFormElement).reset(); setRobot(false); }}>
        {["NOME", "E-MAIL", "TELEFONE"].map((n) => <input key={n} required placeholder={n} type={n === "E-MAIL" ? "email" : "text"} className="field" />)}
        <textarea required placeholder="MENSAGEM" rows={4} className="field" />
        <label className="mt-2 flex items-center gap-4 font-serif-b"><input type="checkbox" checked={robot} onChange={(e) => setRobot(e.target.checked)} className="size-8 accent-primary" />NÃO SOU UM ROBÔ</label>
        <button className="pill mt-2 justify-center"><Send className="text-primary" /> ENVIAR</button>
      </form>
    </Shell>
  );
}
