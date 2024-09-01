import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  // Initial Values for the Form
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    // Validation Schema using Yup
    validationSchema: Yup.object({
      firstName: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      type: Yup.string().required("Please select an enquiry type"),
      comment: Yup.string()
        .required("Message is required")
        .min(25, "Message must be at least 25 characters"),
    }),
    // Handling form submission
    onSubmit: async (values, actions) => {
      const response = await submit(values);
      if (response.type === "success") {
        onOpen({
          title: `Thank you, ${values.firstName}!`,
          message: response.message,
          type: response.type,
        });
        actions.resetForm(); // Reset form after successful submission
      } else {
        onOpen({
          title: "Oops!",
          message: response.message,
          type: response.type,
        });
      }
      actions.setSubmitting(false);
    },
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          {/* Use Formik's handleSubmit to submit the form */}
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              {/* Name Input */}
              <FormControl
                isInvalid={formik.touched.firstName && !!formik.errors.firstName}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              {/* Email Input */}
              <FormControl
                isInvalid={formik.touched.email && !!formik.errors.email}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              {/* Enquiry Type Select */}
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...formik.getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              {/* Comment Textarea */}
              <FormControl
                isInvalid={formik.touched.comment && !!formik.errors.comment}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={formik.isSubmitting || isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
