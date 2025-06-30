import { Part, SubPart } from "@/data/Parts";

export type CartItem = {
  id: number;
  name: string;
  reference: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
};

export const toCartItem = (
  item: Part | SubPart
): Omit<CartItem, "quantity"> => {
  const numericId = parseInt(item.id.replace(/\D/g, "")) || Date.now();

  return {
    id: numericId,
    name: item.name,
    reference: item.reference,
    description: item.description,
    image: item.image,
    price: item.price ?? 0,
  };
};
