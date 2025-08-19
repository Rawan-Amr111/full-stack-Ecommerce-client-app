import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { selectLogin, userLogin } from "../../app/features/loginSlice";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

export default function SimpleCard() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, user } = useSelector(selectLogin);
  const goBack = () => navigate(-1);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const bgGradient = useColorModeValue(
    "linear-gradient(-45deg, #f7f1e3, #c4b270ff, #cfb787ff, #f7f1e3)",
    "linear-gradient(-45deg, #1a1a1a, #333222, #544d3e, #1a1a1a)"
  );
  const gradientStyles = `
    @keyframes gradientMove {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    @keyframes shimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
  `;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.identifier) {
      setIsUsername(true);

      return;
    }
    if (!formData.password) {
      setIsPassword(true);

      return;
    }
    if (!formData.identifier && !formData.password) {
      setIsUsername(true);
      setIsPassword(true);
      return;
    }
    setIsUsername(false);
    setIsPassword(false);
    dispatch(userLogin(formData));
  };
  if (user) {
    if (user.isAdmin) {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <>
      <style>{gradientStyles}</style>

      <Flex
        sx={{
          background: bgGradient,
          backgroundSize: "400% 400%",
          animation: "gradientMove 15s ease infinite",
        }}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="-100%"
          w="200%"
          h="100%"
          background="linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.12) 50%, transparent 70%)"
          animation="shimmer 8s linear infinite"
          pointerEvents="none"
          zIndex={0}
        />

        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Flex
            onClick={goBack}
            cursor={"pointer"}
            align={"center"}
            fontSize={"lg"}
          >
            <BsArrowLeft />
            <Text ml={2}>Back</Text>
          </Flex>

          <Stack align={"center"}>
            <Heading
              fontSize={"4xl"}
              color={"#6a5514"}
              fontFamily={"roboto-mono"}
            >
              Sign in to your account
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={
              colorMode === "light"
                ? "rgba(255, 255, 255, 0.25)"
                : "rgba(0, 0, 0, 0.25)"
            }
            boxShadow={"0 8px 32px 0 rgba(31, 38, 135, 0.37)"}
            backdropFilter="blur(8px)"
            border="1px solid rgba(255, 255, 255, 0.18)"
            p={8}
            as={"form"}
            onSubmit={submitHandler}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>

                <Input
                  type="email"
                  isInvalid={isUsername}
                  errorBorderColor="crimson"
                  value={formData.identifier}
                  onChange={onChangeHandler}
                  name="identifier"
                />
                {isUsername ? (
                  <FormHelperText color="red.500" textAlign="left" mt={1}>
                    Email is required
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    isInvalid={isPassword}
                    errorBorderColor="crimson"
                    value={formData.password}
                    onChange={onChangeHandler}
                    name="password"
                  />

                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      p={0}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {isPassword ? (
                  <FormHelperText color="red.500" textAlign="left" mt={1}>
                    Password is required
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"#ad7f1b"}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={isUsername || isPassword ? "red.500" : "#6a5514"}
                  color={"white"}
                  _hover={{
                    bg: isUsername || isPassword ? "red.600" : "#72602aff",
                  }}
                  type="submit"
                  isLoading={loading}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
