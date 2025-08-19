import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CookieService from "../services/CookieService";

const ProductCard = ({ id, attributes }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const token = CookieService.getCookie("jwt");

  const handleViewDetails = () => {
    if (token) {
      navigate(`/products/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Card
      border="1px solid #a8b5c8"
      bg="none"
      boxShadow="0 2px 10px rgba(255, 217, 0, 0.37), 0 4px 20px rgba(0, 0, 0, 0.3)"
      height="500px"
      display="flex"
      flexDirection="column"
    >
      <CardBody
        display="flex"
        flexDirection="column"
        bg={
          colorMode === "light"
            ? "#fffbeb"
            : "linear-gradient(145deg, #4a4a4aff, #111)"
        }
        flex="1"
      >
        <Image
          src={attributes?.thumbnail?.data?.attributes?.formats?.medium?.url}
          alt={attributes.title}
          borderRadius="50%"
          width="200px"
          height="200px"
          mx="auto"
          objectFit="cover"
        />

        <Stack mt={4} spacing={3} flex="1">
          <Heading
            size="md"
            textAlign="center"
            color="#e0cda9"
            minHeight="48px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {attributes.title}
          </Heading>

          <Text
            color={colorMode === "light" ? "#000000" : "#ffffffff"}
            fontSize="sm"
            textAlign="center"
            minHeight="40px"
            noOfLines={2}
          >
            {attributes.description}
          </Text>

          <Text color="#cc9c00" fontSize="2xl" textAlign="center">
            ${attributes.price}
          </Text>

          <Box mt="auto">
            <Button
              onClick={handleViewDetails}
              bg={
                colorMode === "light"
                  ? "linear-gradient(135deg, #a9997dff, #5d4f20ff)"
                  : "linear-gradient(135deg, #827358ff, #654d04ff)"
              }
              color={colorMode !== "light" ? "#c7bda7ff" : "#c7b58cff"}
              size="lg"
              w="full"
              variant="outline"
              border="none"
              py={5}
              _hover={{
                bg: colorMode === "light" ? "#776327ff" : "#654d04ff",
                color: colorMode !== "light" ? "#afac6dff" : "#e6f3fd",
                border: "transparent",
              }}
            >
              View Details
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
