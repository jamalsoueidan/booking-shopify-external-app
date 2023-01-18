import { Frame, Link, Text, TextContainer, TopBar } from "@shopify/polaris";
import { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.avif";

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  text-align: center;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding-left: 32px;
  padding-right: 32px;
`;

const Flex = styled.div`
  width: 90%;
  @media only screen and (min-width: 768px) {
    width: 400px;
  }
`;

interface LoginFrameProps {
  title: string;
  children: ReactNode;
}

export const LoginFrame = ({ title, children }: LoginFrameProps) => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    [mobileNavigationActive]
  );

  const logoOptions = {
    width: 124,
    topBarSource: logo,
    contextualSaveBarSource: "asd",
    url: "/",
    accessibilityLabel: "Logo",
  };

  return (
    <Frame
      logo={logoOptions}
      topBar={
        <TopBar
          showNavigationToggle
          userMenu={null}
          onNavigationToggle={toggleMobileNavigationActive}
        />
      }
    >
      <Center>
        <Flex>
          <TextContainer spacing="loose">
            <Text variant="heading2xl" as="h1">
              <center>{title}</center>
            </Text>
            {children}
          </TextContainer>
        </Flex>
      </Center>
      <Footer>
        <p>
          Alle rettigheder forbeholdt{" "}
          <Link url="https://wwww.by-sisters.dk">BySisters</Link> ©
        </p>
        <p>Version 1.0.1</p>
      </Footer>
    </Frame>
  );
};
