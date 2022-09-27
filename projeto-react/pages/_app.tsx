import { ChakraProvider, Flex, useDisclosure } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Sidebar from "./dashboard/components/sidebar";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../services/queryClient";
import { useNotifications } from "../hooks/useQueries";

function MyApp({ Component, pageProps }: AppProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default MyApp;

