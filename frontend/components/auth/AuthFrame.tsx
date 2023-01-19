import {
  Frame,
  Icon,
  Link,
  Text,
  TextContainer,
  TopBar,
} from "@shopify/polaris";
import { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.avif";
import { LanguageMinor } from "@shopify/polaris-icons";
import { useSettings } from "@jamalsoueidan/bsf.bsf-pkg";

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  text-align: center;
`;

const logoOptions = {
  width: 124,
  topBarSource: logo,
  contextualSaveBarSource: "asd",
  url: "/",
  accessibilityLabel: "Logo",
};

interface AuthFrameProps {
  children: ReactNode;
}

export const AuthFrame = ({ children }: AuthFrameProps) => {
  const { update } = useSettings();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    [mobileNavigationActive]
  );

  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={LanguageMinor} />
          <Text variant="bodySm" as="span" visuallyHidden>
            Change Language
          </Text>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [
            {
              content: "Dansk",
              onAction: () => {
                update({ language: "da" });
              },
            },
            {
              content: "English",
              onAction: () => {
                update({ language: "en" });
              },
            },
          ],
        },
      ]}
    />
  );

  return (
    <Frame
      logo={logoOptions}
      topBar={
        <TopBar
          showNavigationToggle
          secondaryMenu={secondaryMenuMarkup}
          onNavigationToggle={toggleMobileNavigationActive}
        />
      }
    >
      {children}
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
