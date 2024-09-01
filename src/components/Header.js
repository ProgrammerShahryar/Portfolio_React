import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Social Media Links */}
          <HStack spacing={4}>
            {socials.map((social) => (
              <Link
                key={social.url}
                href={social.url}
                isExternal
                aria-label={social.url}
                _hover={{ color: "#4A90E2" }} // Add hover effect
              >
                <FontAwesomeIcon icon={social.icon} size="2x" />
              </Link>
            ))}
          </HStack>
          {/* Internal Links */}
          <HStack spacing={8}>
            <Link onClick={handleClick("projects")} href="#projects-section">
              Projects
            </Link>
            <Link onClick={handleClick("contactme")} href="#contactme-section">
              Contact Me
            </Link>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
