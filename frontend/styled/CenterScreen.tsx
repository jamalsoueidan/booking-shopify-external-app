import styled from "styled-components";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Flex = styled.div`
  width: 90%;

  @media only screen and (min-width: 768px) {
    margin-top: -50px;
    width: 50%;
  }
`;

export default ({ children }: any) => {
  return (
    <Center>
      <Flex>{children}</Flex>
    </Center>
  );
};
