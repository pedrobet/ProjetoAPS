import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Table,
  TableContainer,
  Text,
  VStack,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { api } from "../../../services/api";
import { useScheduleRequestStore } from "../../../store/scheduleRequestStore";
import { useQuery } from "@tanstack/react-query";
import format from "date-fns/format";
// import { Container } from './styles';

const Ver: React.FC = () => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["scheduleRequestList"],
    async () => {
      const res = await api.get("/scheduledRequests/");
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
      {!isLoading && !isFetching && data.length === 0 ? (
        <Heading
          borderLeft={"4px solid #2B6CB0"}
          pl={1}
          mb={4}
          alignSelf="start"
          marginLeft="10%"
        >
          Não há pedidos de marcação para serem analisados
        </Heading>
      ) : (
        <>
          <Heading
            borderLeft={"4px solid #2B6CB0"}
            pl={1}
            mb={6}
            alignSelf="start"
            marginLeft="10%"
          >
            Pedidos de marcação:
          </Heading>
          <TableContainer
            // width={700}
            bgColor="white"
            flexDir="column"
            boxShadow="base"
            rounded="md"
          >
            <Table>
              <Thead>
                <Tr>
                  <Th fontSize="lg"> Nome do Paciente </Th>
                  <Th fontSize="lg"> Nome do Médico </Th>
                  <Th fontSize="lg"> Data da Consulta </Th>
                  <Th fontSize="lg"> Status do pedido </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((scheduleRequest: any) => (
                  <Tr key={scheduleRequest._id}>
                    <Td>{scheduleRequest.patient}</Td>
                    <Td>{scheduleRequest.doctor}</Td>
                    <Td>
                      {format(
                        new Date(scheduleRequest.consultTime),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </Td>
                    <Td>
                      <Badge colorScheme="orange" rounded="full" p={2}>
                        Pendente
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </Flex>
  );
};

export default Ver;
