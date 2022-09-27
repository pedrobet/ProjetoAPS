import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex, useDisclosure } from "@chakra-ui/react";
import Sidebar from "./dashboard/components/sidebar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();



  return (
    <ChakraProvider>
      <Flex w="100%" h="100vh">
        <Sidebar
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          isVisible={router.pathname === "/" ? false : true}
        />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;

