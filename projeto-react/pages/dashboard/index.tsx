import { Flex, Grid, GridItem, Heading, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./components/sidebar";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { GrUserAdmin, GrUser } from "react-icons/gr";
import { BsClockHistory, BsCardList, BsCardChecklist } from "react-icons/bs";
import { useRouter } from "next/router";
import { useNotifications } from "../../hooks/useQueries";

// import { Container } from './styles';

const panels = [
  "Cadastro de Usuários",
  "Cadastro de Pacientes",
  "Cadastro de Horários",
  "Ver pedidos de Marcação",
  "Confirmar pedidos de Marcação",
];

const iconsMap: { [key: string]: IconType } = {
  "Cadastro de Usuários": GrUserAdmin,
  "Cadastro de Pacientes": GrUser,
  "Cadastro de Horários": BsClockHistory,
  "Ver pedidos de Marcação": BsCardList,
  "Confirmar pedidos de Marcação": BsCardChecklist,
};

const linksMap: { [key: string]: string } = {
  "Cadastro de Usuários": "/cadastro/usuario",
  "Cadastro de Pacientes": "/cadastro/paciente",
  "Cadastro de Horários": "/cadastro/horario",
  "Ver pedidos de Marcação": "/marcacao/ver",
  "Confirmar pedidos de Marcação": "/marcacao/confirmar",
};

const Dashboard: React.FC = () => {

  const router = useRouter();

  return (
    <Flex w="100%" h="100vh" bgColor="gray.100">
    
      <Flex align={"center"} justify={"center"} w="100%" h="100vh">
        <Grid
          gridTemplateRows="1fr 1fr"
          gridTemplateColumns="1fr 1fr 1fr"
          gridGap={4}
          w="90%"
          h="90%"
          // bgColor="white"
          // boxShadow="lg"
          // rounded="md"
          p={6}
        >
          {panels.map((panel, index) => (
            <GridItem key={panel}>
              <Flex
                height="100%"
                flexDir="column"
                align="center"
                justify="center"
                border="1px solid #e2e8f0"
                rounded="md"
                boxShadow="sm"
                p={6}
                gap={4}
                _hover={{
                  boxShadow: "xl",
                  transitionDelay: "0.125s",
                  bgColor: "white",
                  cursor: "pointer",
                }}
                onClick={() => router.push(linksMap[panel])}
              >
                <Icon boxSize={10} as={iconsMap[panel]} />
                <Heading textAlign="center" fontSize="xl">
                  {panel}
                </Heading>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
