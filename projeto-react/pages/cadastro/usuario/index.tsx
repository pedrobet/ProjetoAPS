import { Flex, Grid, GridItem, Heading, Icon } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { GrUser } from "react-icons/gr";
import { FaUserMd } from "react-icons/fa";

// import { Container } from './styles';

const Usuario: React.FC = () => {
  return (
    <Flex w="100%" h="100vh" bgColor="gray.100">
      <Flex align={"center"} justify={"center"} w="100%" h="100vh">
        <Grid
          gridTemplateRows="1fr"
          gridTemplateColumns="1fr 1fr "
          gridGap={4}
          w="90%"
          h="90%"
          p={6}
          alignItems="center"
        >
          <GridItem>
            <Flex
              height={300}
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
              onClick={() => router.push("/cadastro/usuario/cadastro-usuario")}
            >
              <Icon boxSize={10} as={GrUser} />
              <Heading textAlign="center" fontSize="xl">
                Cadastrar Usuário
              </Heading>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              height={300}
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
              onClick={() => router.push("/cadastro/usuario/cadastro-medico")}
            >
              <Icon boxSize={10} as={FaUserMd} />
              <Heading textAlign="center" fontSize="xl">
                Cadastrar Médico
              </Heading>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Usuario;
