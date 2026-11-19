import { useSyncExternalStore } from "react";
export type Product = { id: number; name: string; price: number; installments: string; icon: string };
export const products: Product[] = [
  { id: 1, name: "Caixa de Som Portátil JBL PartyBox", price: 2399, installments: "10x de R$ 239,90 sem juros", icon: "speaker" },
  { id: 2, name: "Smartphone Samsung Galaxy A05s", price: 699, installments: "10x de R$ 69,90 sem juros", icon: "phone" },
  { id: 3, name: "Notebook Asus X515KA", price: 1999, installments: "10x de R$ 199,90 sem juros", icon: "laptop" },
  { id: 4, name: 'Smart TV 43" LED Full HD SEMP TCL', price: 1399, installments: "10x de R$ 149,90 sem juros", icon: "tv" },
];
let cart: number[] = [];
const subs = new Set<() => void>();
export const addToCart = (id: number) => { cart = [...cart, id]; subs.forEach((f) => f()); };
export const removeFromCart = (id: number) => {
  const index = cart.indexOf(id);
  if (index < 0) return;
  cart = cart.filter((_, i) => i !== index);
  subs.forEach((f) => f());
};
export const useCart = () => useSyncExternalStore((f) => (subs.add(f), () => subs.delete(f)), () => cart, () => cart);
export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
