"use client";

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
  Box,
  SimpleGrid,
  Avatar,
  Container,
} from "@chakra-ui/react";
import { GiDiamondRing } from "react-icons/gi";
import { FaShippingFast, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

// Motion Components
const MotionFlex = motion(Flex);
const MotionBox = motion(Box);
const MotionStack = motion(Stack);

// Feature Component
const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

// Testimonials Components
const Testimonial = ({ children }) => <Box>{children}</Box>;

const TestimonialContent = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Stack
      bg={colorMode === "light" ? "white" : "gray.800"}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: colorMode === "light" ? "white" : "gray.800",
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => (
  <Heading as={"h3"} fontSize={"xl"}>
    {children}
  </Heading>
);

const TestimonialText = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Text
      textAlign={"center"}
      color={colorMode === "light" ? "gray.600" : "gray.400"}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text
          fontSize={"sm"}
          color={colorMode === "light" ? "gray.600" : "gray.400"}
        >
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

// Main Home Page
export default function HomePage() {
  const { colorMode } = useColorMode();

  return (
    <>
      {/* Hero Section */}
      <Stack
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
        mb="100px"
      >
        {/* الصورة */}
        <MotionFlex
          flex={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <Image
            alt={"Hero Image"}
            objectFit={"cover"}
            src={"/images/hero.jpg"}
            mt="6"
            borderRadius={"50%"}
          />
        </MotionFlex>

        {/* النص */}
        <MotionFlex
          p={8}
          flex={1}
          align={"center"}
          justify={"center"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              color={"#583823"}
            >
              <div className="waviy">
                {[
                  "W",
                  "e",
                  "a",
                  "r",
                  " ",
                  "Y",
                  "o",
                  "u",
                  "r",
                  " ",
                  "S",
                  "t",
                  "o",
                  "r",
                  "y",
                ].map((char, i) => (
                  <span key={i} style={{ "--i": i + 1 }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
              <br />
              <Text
                color={"#a27c43ff"}
                as={"span"}
                mt="6"
                fontFamily={"roboto-mono"}
              >
                Jewelry That Speaks for You
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={"gray.500"}
              fontFamily={"roboto-mono"}
            >
              Explore exclusive, handcrafted pieces that reflect your
              personality, style, and spirit. Made to shine — just like you.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"#583823"}
                color={"white"}
                _hover={{
                  bg: "#624c3dff",
                }}
              >
                Shop Now
              </Button>
            </Stack>
          </Stack>
        </MotionFlex>
      </Stack>

      {/* Features Section */}
      <MotionBox
        p={4}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={
              <Box
                bg={"#583823"}
                w={16}
                h={16}
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="full"
              >
                <GiDiamondRing size={24} color="white" />
              </Box>
            }
            title={"Timeless Elegance"}
            text={
              "Discover jewelry pieces that blend classic charm with modern style, crafted to last forever."
            }
          />

          <Feature
            icon={
              <Box
                bg={"#583823"}
                w={16}
                h={16}
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="full"
              >
                <FaShippingFast size={24} color="white" />
              </Box>
            }
            title={"Free & Secure Delivery"}
            text={
              "Enjoy fast, free, and insured delivery on all your orders—right to your doorstep."
            }
          />

          <Feature
            icon={
              <Box
                bg={"#583823"}
                w={16}
                h={16}
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="full"
              >
                <FaHeadset size={24} color="white" />
              </Box>
            }
            title={"24/7 Customer Care"}
            text={
              "Our expert team is always here to assist you with any questions or personalized recommendations."
            }
          />
        </SimpleGrid>
      </MotionBox>

      {/* Testimonials Section */}
      <MotionBox
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        mt={16}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={"center"}>
            <Heading>Our Clients Speak</Heading>
            <Text>We have been working with clients around the world</Text>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Efficient Collaborating</TestimonialHeading>
                <TestimonialText>
                  The service was outstanding! My order arrived earlier than
                  expected and was beautifully packaged.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?auto=format&fit=crop&w=100&q=80"
                }
                name={"Jane Cooper"}
                title={"CEO at ABC Corporation"}
              />
            </Testimonial>

            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Intuitive Design</TestimonialHeading>
                <TestimonialText>
                  The designs are elegant and timeless. I receive compliments
                  every time I wear my new necklace.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?auto=format&fit=crop&w=100&q=80"
                }
                name={"Sarah Johnson"}
                title={"Fashion Blogger"}
              />
            </Testimonial>

            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>Mindblowing Service</TestimonialHeading>
                <TestimonialText>
                  Excellent customer support! They helped me choose the perfect
                  gift for my sister.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={
                  "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?auto=format&fit=crop&w=100&q=80"
                }
                name={"Emily Davis"}
                title={"Marketing Specialist"}
              />
            </Testimonial>
          </Stack>
        </Container>
      </MotionBox>

      {/* About Us Section */}
      <MotionBox
        py={16}
        px={8}
        bg={colorMode === "light" ? "#eee9cc" : "black"}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={10}
          align="center"
          maxW="6xl"
          mx="auto"
        >
          {/* Badge */}
          <Box
            bg="#a27c43"
            color="white"
            px={6}
            py={4}
            rounded="lg"
            fontWeight="bold"
            boxShadow="lg"
            fontSize="lg"
            textAlign="center"
          >
            Since 1995
          </Box>

          {/* About Us Text */}
          <Stack spacing={4} flex={1}>
            <Heading fontSize={"3xl"}>About Us</Heading>
            <Text color={"gray.600"} fontSize={"lg"}>
              At <b>Your Brand</b>, we believe jewelry is more than just an
              accessory – it’s a reflection of your story. Every piece is
              crafted with passion, precision, and a promise to make you shine.
            </Text>
          </Stack>
        </Stack>
      </MotionBox>

      {/* Footer */}
      <Box bg={"#1a202c"} color={"white"} py={10}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          justify={"space-between"}
          align={"center"}
          maxW={"6xl"}
          mx={"auto"}
          px={8}
        >
          <Text>
            &copy; {new Date().getFullYear()} Your Brand. All rights reserved.
          </Text>
          <Stack direction={"row"} spacing={6}>
            <Text as="a" href="#">
              Home
            </Text>
            <Text as="a" href="#">
              Shop
            </Text>
            <Text as="a" href="#">
              Contact
            </Text>
            <Text as="a" href="#">
              Privacy
            </Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
