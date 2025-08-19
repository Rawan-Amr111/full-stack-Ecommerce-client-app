import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();
export const addItemToShoppingCart = (
  cartItem = {},
  shoppingCartItems = []
) => {
  const existsItem = shoppingCartItems.find((item) => item.id === cartItem.id);

  if (existsItem) {
    toast({
      title: "Added to your cart",
      description:
        "this item is already in your cart, the quantity has been updated",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  toast({
    title: "Added to your cart",
    status: "success",
    duration: 3000,
    isClosable: true,
  });
  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};
