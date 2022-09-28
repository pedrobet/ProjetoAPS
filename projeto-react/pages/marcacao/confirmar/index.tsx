import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { api } from "../../../services/api";
import { useScheduleRequestStore } from "../../../store/scheduleRequestStore";
import { useQuery } from "@tanstack/react-query";

// import { Container } from './styles';

const Confirmar: React.FC = () => {
  const { setScheduleRequest, scheduleRequest } = useScheduleRequestStore(
    (state) => state
  );
  const toast = useToast();

  const { isLoading, isFetching, refetch } = useQuery(
    ["scheduleRequestToApprove"],
    async () => {
      const res = await api.get("/scheduledRequests/retrieve_first");
      setScheduleRequest(res.data);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      onError: (error: Error) => {
        console.log(error);
        toast({
          title: "Erro ao carregar requisição",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  async function handleConfirmScheduleRequest() {
    try {
      const { data } = await api.post(
        `/scheduledRequests/confirm/${scheduleRequest?._id}`
      );
      if (data) {
        refetch();
      } else {
        setScheduleRequest(data);
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Erro ao carregar requisição",
        description: error.message,
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  async function handleDeclineScheduleRequest() {
    try {
      const { data } = await api.post(
        `/scheduledRequests/decline/${scheduleRequest?._id}`
      );
      if (data) {
        refetch();
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Erro ao carregar requisição",
        description: error.message,
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  if (isLoading || isFetching) {
    return (
      <Flex flexDir="column" width="100%" align="center" p={20}>
        <Heading
          borderLeft={"4px solid #2B6CB0"}
          pl={1}
          mb={4}
          alignSelf="start"
          marginLeft="10%"
        >
          Carregando...
        </Heading>
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" width="100%" align="center" p={20}>
      {!isLoading && !isFetching && scheduleRequest === null ? (
        <Heading
          borderLeft={"4px solid #2B6CB0"}
          pl={1}
          mb={4}
          alignSelf="start"
          marginLeft="10%"
        >
          Não há pedidos na fila
        </Heading>
      ) : (
        <>
          <Heading
            borderLeft={"4px solid #2B6CB0"}
            pl={1}
            mb={4}
            alignSelf="start"
            marginLeft="10%"
          >
            Pedido da fila:
          </Heading>
          <Flex flexDir="column" p={6} boxShadow="base" width={600} gap={4}>
            <FormControl
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <FormLabel>Paciente da requisição:</FormLabel>
              {scheduleRequest &&
                (!isLoading && !isFetching ? (
                  <Heading fontSize="lg">{scheduleRequest.patient}</Heading>
                ) : (
                  <Heading fontSize="lg">Carregando...</Heading>
                ))}
            </FormControl>
            <Divider />
            <FormControl
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <FormLabel>Médico requerido:</FormLabel>
              {scheduleRequest &&
                (!isLoading && !isFetching ? (
                  <Heading fontSize="lg">{scheduleRequest.doctor}</Heading>
                ) : (
                  <Heading fontSize="lg">Carregando...</Heading>
                ))}
            </FormControl>
            <Divider />
            <FormControl
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <FormLabel>Horário requerido:</FormLabel>
              {scheduleRequest &&
                (!isLoading && !isFetching ? (
                  <Heading fontSize="lg">
                    {format(
                      new Date(scheduleRequest.consultTime),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </Heading>
                ) : (
                  <Heading fontSize="lg">Carregando...</Heading>
                ))}
            </FormControl>
            <Flex width="100%" mt={10} justify="space-between">
              <Button
                size="lg"
                colorScheme="red"
                onClick={handleDeclineScheduleRequest}
              >
                Cancelar
              </Button>
              <Button
                size="lg"
                colorScheme="green"
                onClick={handleConfirmScheduleRequest}
              >
                Confirmar
              </Button>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Confirmar;
