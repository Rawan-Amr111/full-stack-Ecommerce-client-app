import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import axios from "axios";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { motion } from "framer-motion";

const MotionGrid = motion(Grid);
const MotionDiv = motion.div;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ProductsPage = () => {
  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate[thumbnail]=*&populate[categories]=*&fields[0]=title&fields[1]=description&fields[2]=price`
    );
    return data;
  };

  const { isLoading, data } = useQuery("productList", getProductList);

  if (isLoading)
    return (
      <Grid
        margin={30}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </Grid>
    );

  return (
    <MotionGrid
      margin={30}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.data.map((product) => (
        <MotionDiv
          key={product.id}
          variants={cardVariants}
          style={{ height: "100%" }}
        >
          <ProductCard {...product} />
        </MotionDiv>
      ))}
    </MotionGrid>
  );
};

export default ProductsPage;
