import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  Select,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import InputMask from "react-input-mask";
import { getCookie } from "cookies-next";

// import { Container } from './styles';

const Paciente: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
   

      const { data: patientData } = await api.post("/patients", {
        name: data.nome,
        birthDate: data.dataNascimento,
        phone: Number(data.telefone),
        susNumber: Number(data.susNumber),
        sex: data.sexo,
      });
      if (patientData) {
        toast({
          title: "Paciente cadastrado com sucesso",
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
        title: "Erro ao cadastrar o paciente",
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
        Cadastro de Pacientes
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
            <FormControl isInvalid={!!errors.telefone}>
              <FormLabel fontSize="lg" color="gray.500">
                Telefone
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Input
                  type="number"
                  placeholder="apenas números"
                  {...register("telefone", { required: true })}
                />
                {errors.telefone && (
                  <FormErrorMessage>
                    O Telefone do paciente é obrigatório.
                  </FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>
          </Flex>
          <Flex width="100%" gap={10}>
            <FormControl isInvalid={!!errors.susNumber}>
              <FormLabel fontSize="lg" color="gray.500">
                Nº do SUS
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Input
                  type="number"
                  {...register("susNumber", { required: true })}
                />
                {errors.susNumber && (
                  <FormErrorMessage>
                    O Nº do SUS é obrigatório.
                  </FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>

            <FormControl isInvalid={!!errors.dataNascimento}>
              <FormLabel fontSize="lg" color="gray.500">
                Data de Nascimento
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Input
                  type="date"
                  {...register("dataNascimento", { required: true })}
                />
                {errors.dataNascimento && (
                  <FormErrorMessage>
                    A Data de Nascimento do paciente é obrigatória.
                  </FormErrorMessage>
                )}
              </InputGroup>
            </FormControl>
          </Flex>
          <Flex maxW="30%">
            <FormControl isInvalid={!!errors.sexo}>
              <FormLabel fontSize="lg" color="gray.500">
                Sexo do paciente
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Select
                  {...register("sexo", { required: true })}
                  defaultValue="outro"
                >
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                </Select>
                {errors.sexo && (
                  <FormErrorMessage>
                    O Sexo do paciente é obrigatório.
                  </FormErrorMessage>
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

export default Paciente;
