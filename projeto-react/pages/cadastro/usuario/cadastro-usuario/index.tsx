import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Select,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../../services/api";

// import { Container } from './styles';

const Usuario: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
      const { data: patientData } = await api.post("/users", {
        name: data.nome,
        email: data.email,
        password: data.senha,
        role: data.role,
        username: data.username,
      });
      if (patientData) {
        toast({
          title: "Usuário cadastrado com sucesso",
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
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Erro ao cadastrar o usuário",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <Flex w="100%" flexDir="column" bgColor="gray.100" p={10}>
      <Heading
        mb={4}
        ml="10%"
        borderLeft="4px solid #2B6CB0"
        pl={2}
        width="fit-content"
      >
        Cadastro de Usuários
      </Heading>
      <Flex
        alignSelf="center"
        as="form"
        p={4}
        w="80%"
        h="55vh"
        bgColor="white"
        rounded="md"
        boxShadow="base"
        onSubmit={handleSubmit(onSubmit)}
        flexDir="column"
        mb="auto"
      >
        <Flex flexDir="column" justify="center" gap={4}>
          <Flex width="100%" gap={10}>
            <FormControl isInvalid={!!errors.nome}>
              <FormLabel fontSize="lg" color="gray.500">
                Nome
              </FormLabel>
              <Input type="text" {...register("nome", { required: true })} />
              {errors.nome && (
                <FormErrorMessage>
                  O Nome do paciente é obrigatório.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel fontSize="lg" color="gray.500">
                E-mail
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <FormErrorMessage>
                    O E-mail do usuário é obrigatório.
                  </FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>
          </Flex>
          <Flex width="100%" gap={10}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel fontSize="lg" color="gray.500">
                Username
              </FormLabel>
              <Input
                type="text"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <FormErrorMessage>
                  O Username do usuário é obrigatório.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.role}>
              <FormLabel fontSize="lg" color="gray.500">
                Tipo de usuário
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Select
                  {...register("role", { required: true })}
                  defaultValue="acs"
                >
                  <option value="acs">Agente de Saúde</option>
                  <option value="admin">Administrador</option>
                </Select>
                {errors.role && (
                  <FormErrorMessage>
                    O tipo de usuário deve ser definido.
                  </FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>
          </Flex>
          <Flex width="100%" gap={10}>
            <FormControl isInvalid={!!errors.senha}>
              <FormLabel fontSize="lg" color="gray.500">
                Senha
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Input
                  type="password"
                  {...register("senha", {
                    required: {
                      value: true,
                      message: "Você deve definir uma senha para o usuário.",
                    },
                    minLength: {
                      value: 8,
                      message: "A senha deve ter no mínimo 8 caracteres",
                    },
                  })}
                />
                {errors.senha && (
                  <FormErrorMessage>{`${errors.senha.message}`}</FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>

            <FormControl isInvalid={!!errors.senha_repeat}>
              <FormLabel fontSize="lg" color="gray.500">
                Repita a senha
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Input
                  type="password"
                  {...register("senha_repeat", {
                    validate: (value) =>
                      value === watch("senha") || "As senhas não coincidem",
                  })}
                />
                {errors.senha_repeat && (
                  <FormErrorMessage>{`${errors.senha_repeat.message}`}</FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>
          </Flex>
        </Flex>
        <Flex width="100%" mt={4} justify="end">
          <Button
            type="submit"
            colorScheme="blue"
            variant="outline"
            size="lg"
            isLoading={isSubmitting}
          >
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Usuario;
