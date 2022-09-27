import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { useUserStore } from "../store/userStore";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setUser } = useUserStore((state) => state);
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const { data: userData } = await api.post("/sessions", {
        username: data.username,
        password: data.password,
      });
      if (userData) {
        setUser(userData);
        toast({
          title: "Usuário logado com sucesso",
          description: "Você será redirecionado para a página principal",
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao logar",
        description: "Verifique suas credenciais",
        status: "error",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    }
  };
  return (
    <Grid
      width="100%"
      height="100vh"
      bg="black"
      templateColumns="3fr 2fr"
      templateRows="1fr"
    >
      <GridItem
        bgColor=" #8BC6EC"
        bgImage="linear-gradient(135deg, #8BC6EC 0%, #3182CE 100%)"
      ></GridItem>
      <GridItem bgColor="gray.50" boxShadow="base">
        <Flex
          display="flex"
          width="100%"
          height="100%"
          align="center"
          justify="center"
          flexDirection="column"
        >
          <Heading mb={6}>Faça o login:</Heading>

          <Box
            width={500}
            height={350}
            boxShadow="lg"
            bgColor="white"
            rounded="md"
            p={6}
          >
            <Flex
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              flexDirection="column"
              gap={6}
              justify="center"
              height="100%"
            >
              <FormControl isInvalid={!!errors.username}>
                <FormLabel fontSize="lg">Usuário</FormLabel>
                <Input
                  type="text"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <FormErrorMessage>
                    O nome de usuário é obrigatório.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel fontSize="lg">Senha</FormLabel>
                <InputGroup display="flex" flexDir="column">
                  <Input
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <FormErrorMessage>A senha é obrigatória.</FormErrorMessage>
                  )}
                </InputGroup>
              </FormControl>

              <Flex width="100%" mt={4} justify="end">
                <Button
                  type="submit"
                  colorScheme="blue"
                  variant="outline"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  Login
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Home;

