import { Box, Heading, Text, Container } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

export default function Offline() {
  return (
    <>
      <NextSeo
        title="Offline - Achim Sommer"
        noindex={true}
      />
      <Container maxW="container.md" py={10}>
        <Box textAlign="center" py={10} px={6}>
          <Heading
            display="inline-block"
            as="h1"
            size="xl"
            bgGradient="linear(to-r, blue.400, blue.600)"
            backgroundClip="text"
            mb={4}
          >
            Offline
          </Heading>
          <Text fontSize="lg" mb={6}>
            Es scheint, dass Sie offline sind. Bitte überprüfen Sie Ihre Internetverbindung.
          </Text>
        </Box>
      </Container>
    </>
  );
}
