import styled from "styled-components";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Flex = styled.div`
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 60%;
  }
`;

export default ({ children }: any) => {
  return (
    <Center>
      <Flex>{children}</Flex>
    </Center>
  );
};
