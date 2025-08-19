import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CardFooter,
  Divider,
  Heading,
  Stack,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import { Flex, Card, CardBody, Image } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { addToCart } from "../app/features/cartSlice";
const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart(data?.data));
  };
  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate[thumbnail]=*&populate[category]=*&fields[0]=title&fields[1]=description&fields[2]=price`
    );

    return data;
  };
  const { isLoading, data } = useQuery(["products", id], () =>
    getProductList()
  );

  const goBack = () => navigate(-1);
  useEffect(() => {
    document.title = ` Product ${data?.data?.attributes?.title} Page`;
  }, [data?.data?.attributes?.title]);
  if (isLoading)
    return (
      <Box maxW="sm" mx="auto" my="20">
        <ProductCardSkeleton />
      </Box>
    );
  return (
    <>
      <Flex
        alignItems="center"
        maxW="sm"
        mx="auto"
        my="7"
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
      </Flex>
      <Card maxW="sm" mx="auto" mb="20" border="1px solid #a8b5c8">
        <CardBody
          bg={
            colorMode === "light"
              ? "#fffbeb"
              : "linear-gradient(145deg, #4a4a4aff, #111)"
          }
        >
          <Image
            src={
              data?.data?.attributes?.thumbnail?.data?.attributes?.formats
                ?.medium?.url
            }
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            width={"300px"}
            height={"300px"}
            mx={"auto"}
            objectFit={"cover"}
          />
          <Stack mt="6" spacing="3">
            <Heading
              size={"md"}
              textAlign={"center"}
              color={"#e0cda9	"}
              mb={2}
              mt={"auto"}
            >
              {data?.data?.attributes?.title}
            </Heading>
            <Text
              textAlign={"center"}
              color={colorMode === "light" ? "#000000" : "#ffffffff"}
              fontSize={"sm"}
              mt={"auto"}
            >
              {" "}
              {data?.data?.attributes?.description}
            </Text>

            <Text textAlign={"center"} color="#cc9c00" fontSize="2xl" mt="auto">
              ${data?.data?.attributes?.price}
            </Text>
            <Button
              variant={"solid"}
              colorScheme="purple"
              w="full"
              size="lg"
              bg={
                colorMode === "light"
                  ? "linear-gradient(135deg, #a9997dff, #5d4f20ff)"
                  : "linear-gradient(135deg, #827358ff, #654d04ff)"
              }
              color={colorMode !== "light" ? "#c7bda7ff" : "#c7b58cff"}
              _hover={{
                bg: colorMode === "light" ? "#776327ff" : "#654d04ff",
                color: colorMode !== "light" ? "#afac6dff" : "#e6f3fd",
                border: "transparent",
              }}
              p="8"
              textTransform={"uppercase"}
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductPage;
