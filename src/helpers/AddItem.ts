import { CartItem, Part, SubPart  } from "@/types/Machine";

export const toCartItem = (
  item: Part | SubPart
): Omit<CartItem, "quantity"> => {
  return {
    id: item.id,
    name: item.name,
    reference: item.reference,
    description: item.description,
    image: item.image,
    price: item.price ?? 0,
  };
};
