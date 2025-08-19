import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import { selectCart } from "../app/features/cartSlice";
import { selectGlobal } from "../app/features/globalSlice";
import { useSelector } from "react-redux";
import { onCloseCartDrawerAction } from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { Text } from "@chakra-ui/react";
import { clearCart } from "../app/features/cartSlice";
import { useColorMode } from "@chakra-ui/react";
const CartDrawer = () => {
  const btnRef = useRef();
  const dispatch = useDispatch();
  const onClose = () => dispatch(onCloseCartDrawerAction());
  const { colorMode } = useColorMode();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);

  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      bg={colorMode === "light" ? "#fefbea" : "#474747"}
    >
      <DrawerOverlay />
      <DrawerContent bg={colorMode === "light" ? "#fefbea" : "#474747"}>
        <DrawerCloseButton />
        <DrawerHeader>Your Shopping Cart</DrawerHeader>

        <DrawerBody>
          {cartProducts.length ? (
            cartProducts.map((item) => (
              <CartDrawerItem key={item.id} {...item} />
            ))
          ) : (
            <Text fontSize={"lg"}>Cart is empty</Text>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={() => dispatch(clearCart())}
            colorScheme="red"
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
