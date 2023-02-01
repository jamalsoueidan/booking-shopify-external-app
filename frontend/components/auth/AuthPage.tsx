import { Text, TextContainer } from "@shopify/polaris";
import { ReactNode } from "react";
import styled from "styled-components";

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

export const AuthPage = ({ title, children }: LoginFrameProps) => (
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
);
