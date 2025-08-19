import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";
import ProductCardSkeleton from "../../components/ProductCardSkeleton";
import { useParams } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";
const Categories = () => {
  const { colorMode } = useColorMode();
  const { id } = useParams();
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState({});
  const getCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/categories`
    );
    console.log(data.data);
    return data;
  };
  const getProductsByCategory = async (categoryId) => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?filters[category][id][$eq]=${categoryId}&populate=*
`
    );

    return data;
  };
  const { isLoading, data } = useQuery(["categories", id], () =>
    getCategories()
  );
  useEffect(() => {
    document.title = ` Category ${data?.data?.attributes?.title} Page`;
  }, [data?.data?.attributes?.title]);

  const handleToggleProducts = async (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null);
    } else {
      if (!categoryProducts[categoryId]) {
        const products = await getProductsByCategory(categoryId);
        setCategoryProducts((prev) => ({
          ...prev,
          [categoryId]: products,
        }));
      }
      setExpandedCategoryId(categoryId);
    }
  };
  if (isLoading)
    return (
      <Box maxW="sm" mx="auto" my="20">
        <ProductCardSkeleton />
      </Box>
    );

  return (
    <>
      {" "}
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {data.data.map((item) => (
          <Card
            key={item.id}
            bg={
              colorMode === "light"
                ? "linear-gradient(135deg, #a9997dff, #5d4f20ff)"
                : "linear-gradient(135deg, #3e331eff, #473a13ff)"
            }
          >
            <CardHeader>
              <Heading size="md"> {item?.attributes?.title}</Heading>
            </CardHeader>

            <CardFooter>
              <Button onClick={() => handleToggleProducts(item.id)}>
                View here
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      {expandedCategoryId && (
        <Box mt={10}>
          <Heading
            mb={4}
            textAlign="center"
            fontFamily={"Playwrite PL"}
            color={colorMode === "light" ? "#583823" : "#583823"}
          >
            Products for:{" "}
            {
              data.data.find((cat) => cat.id === expandedCategoryId)?.attributes
                ?.title
            }
          </Heading>

          <SimpleGrid columns={[1, 2, 3]} spacing={5}>
            {categoryProducts[expandedCategoryId]?.data?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                attributes={product.attributes}
              />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default Categories;
