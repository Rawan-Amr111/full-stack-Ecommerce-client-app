import { Divider, Flex, Image, Stack, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { removeFromCart } from "../app/features/cartSlice";
const CartDrawerItem = ({
  id,
  attributes: { title, price, thumbnail },
  quantity,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Flex alignItems="center" gap="4" mb="3" py="2">
        <Image
          src={thumbnail?.data?.attributes?.url}
          alt="title"
          w="80px"
          h="80px"
          rounded="full"
          objectFit="cover"
          mr="5"
        />
        <Stack>
          <Text fontSize="sm">{title}</Text>
          <Text fontSize="sm">Price: ${price}</Text>
          <Text fontSize="sm">Quantity: {quantity}</Text>
          <Button
            colorScheme="red"
            size="md"
            variant="outline"
            w="fit-content"
            leftIcon={<BsTrash />}
            onClick={() => dispatch(removeFromCart(id))}
          >
            {" "}
            Remove
          </Button>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
