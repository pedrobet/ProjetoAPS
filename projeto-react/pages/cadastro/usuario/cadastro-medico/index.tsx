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

const Medico: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
      const { data: patientData } = await api.post("/doctors", {
        email: data.email,
        name: data.nome,
      });
      if (patientData) {
        toast({
          title: "Medico cadastrado com sucesso",
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
        title: "Erro ao cadastrar o medico",
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
        Cadastro de Médicos
      </Heading>
      <Flex
        alignSelf="center"
        as="form"
        p={4}
        w="50%"
        h="40vh"
        bgColor="white"
        rounded="md"
        boxShadow="base"
        onSubmit={handleSubmit(onSubmit)}
        flexDir="column"
        mb="auto"
      >
        <Flex flexDir="column" justify="center" w='100%'  gap={4}>
          <FormControl isInvalid={!!errors.nome}>
            <FormLabel fontSize="lg" color="gray.500">
              Nome
            </FormLabel>
            <Input type="text" {...register("nome", { required: true })} />
            {errors.nome && (
              <FormErrorMessage>
                O Nome do médico é obrigatório.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel fontSize="lg" color="gray.500">
              E-mail
            </FormLabel>
            <InputGroup display="flex" flexDir="column">
              <Input type="email" {...register("email", { required: true })} />
              {errors.email && (
                <FormErrorMessage>
                  O E-mail do medico é obrigatório.
                </FormErrorMessage>
              )}
            </InputGroup>
          </FormControl>
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

export default Medico;
