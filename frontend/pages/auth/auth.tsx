import { AuthFrame } from "@components/auth/AuthFrame";
import { LoadingPage, useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { Box, Button, Image, Text, TextContainer } from "@shopify/polaris";
import { Suspense, lazy } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import bookings from "../../assets/bookings.png";
import schedule from "../../assets/schedule.png";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-align: center;
  padding: 3rem;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const locales = {
  da: {
    login: "Log ind",
    subtitle: "Lige ved hånden.",
    text: "Med BySisters Selvbetjening kan du nemt få overblik over dine bookinger, holde styr på hvilken behandlinger du har hverdag og booke selv din tider, samt se informationer om din kunder.",
    title: "BySisters selvbetjening",
  },
  en: {
    login: "Login",
    subtitle: "Right by your hand.",
    text: "Using our BySisters app, you can view all of your reservations, select the hours you will be working, view all of your customers' details, and modify your settings to suit your needs.",
    title: "BySisters self-service",
  },
};

const Login = lazy(() => import("./login"));
const Phone = lazy(() => import("./phone"));

export default () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation({ id: "frontpage", locales });

  return (
    <AuthFrame>
      {pathname === "/" ? (
        <Center>
          <TextContainer spacing="tight">
            <Text variant="heading3xl" as="h1" alignment="center">
              {t("title")}
            </Text>
            <Text variant="headingXl" as="h3" alignment="center">
              {t("subtitle")}
            </Text>
          </TextContainer>
          <Box paddingBlockStart="5">
            <Text variant="bodyLg" as="p" alignment="center">
              {t("text")}
            </Text>
          </Box>
          <Box paddingBlockStart="3" paddingBlockEnd="10">
            <Button size="large" primary onClick={() => navigate("/login")}>
              {t("login")}
            </Button>
          </Box>

          <Flex>
            <Box padding="4">
              <Image source={bookings} alt="Bookings" width="100%" />
            </Box>
            <Box padding="4">
              <Image source={schedule} alt="Schedule" width="100%" />
            </Box>
          </Flex>
        </Center>
      ) : (
        <Suspense fallback={<LoadingPage title="Loading page..." />}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="phone" element={<Phone />} />
          </Routes>
        </Suspense>
      )}
    </AuthFrame>
  );
};
