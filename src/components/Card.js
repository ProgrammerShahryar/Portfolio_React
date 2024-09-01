import React from "react";
import { HStack, VStack, Image, Heading, Text, Link } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, description, imageUrl, link }) => {
  return (
    <Link href={link} isExternal>
      <VStack
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        align="start"
        bg="white"
        _hover={{ shadow: "md" }}
        transition="0.3s"
      >
        <Image src={imageUrl} alt={title} />
        <VStack p={4} align="start" spacing={2}>
          <Heading size="md">{title}</Heading>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
          <HStack alignSelf="end">
            <Text fontSize="sm" color="blue.500">
              Learn more
            </Text>
            <FontAwesomeIcon icon={faArrowRight} size="1x" />
          </HStack>
        </VStack>
      </VStack>
    </Link>
  );
};

export default Card;
