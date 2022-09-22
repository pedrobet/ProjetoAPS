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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";

// import { Container } from './styles';

const Horario: React.FC = () => {
  const [medicos, setMedicos] = useState<{ value: string; name: string }[]>([]);

  // fetch medicos from api
  useEffect(() => {
    api.get("/doctors").then((response) => {
      const { data } = response;
      const medicos = data.map((medico: any) => ({
        value: medico,
        name: medico,
      }));
      setMedicos(medicos);
    });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
      const { data: availableTimes } = await api.post("/availableTimes", {
        doctorName: data.medico,
        startDate: data.startDate,
        endDate: data.endDate,
      });
      if (availableTimes) {
        toast({
          title: "Horários cadastrados com sucesso",
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
        title: "Erro ao cadastrar os horários",
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
        Cadastro de Horários
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
            <FormControl isInvalid={!!errors.startDate}>
              <FormLabel fontSize="lg" color="gray.500">
                Horário de início
              </FormLabel>
              <Input
                type="datetime-local"
                {...register("startDate", { required: true })}
              />
              {errors.startDate && (
                <FormErrorMessage>
                  Horário de início é obrigatório.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.endDate}>
              <FormLabel fontSize="lg" color="gray.500">
                Horário de fim
              </FormLabel>
              <Input
                type="datetime-local"
                {...register("endDate", { required: true })}
              />
              {errors.endDate && (
                <FormErrorMessage>
                  Horário de fim é obrigatório.
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
          <Flex maxW="30%">
            <FormControl isInvalid={!!errors.medico}>
              <FormLabel fontSize="lg" color="gray.500">
                Médico
              </FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Select
                  {...register("medico", { required: true })}
                  defaultValue="outro"
                >
                  {medicos.map((medico) => (
                    <option key={medico.value} value={medico.value}>
                      {medico.name}
                    </option>
                  ))}
                </Select>
                {errors.medico && (
                  <FormErrorMessage>Médico é obrigatório.</FormErrorMessage>
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

export default Horario;
