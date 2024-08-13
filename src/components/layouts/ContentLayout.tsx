import React, { FC, Fragment, ReactNode } from "react";
import {
  Box,
  Container,
  ContainerProps,
  Typography,
  TypographyOwnProps,
} from "@mui/material";
import { Navbar } from "./Navbar";

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
  hideTitle?: boolean;
  hideNavbar?: boolean;
  titleVariant?: TypographyOwnProps["variant"];
  container?: boolean;
  containerProps?: ContainerProps;
}

export const ContentLayout: FC<ContentLayoutProps> = ({
  title,
  children,
  hideTitle = false,
  hideNavbar = false,
  titleVariant = "h3",
  container = false,
  containerProps,
  ...props
}) => {
  const ContainerWrapper = container ? Container : Fragment;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" {...props}>
      {!hideNavbar && <Navbar />}
      <Box flexGrow={1}>
        <ContainerWrapper {...containerProps}>
          {!hideTitle && title && (
            <Typography
              fontWeight={800}
              variant={titleVariant}
              noWrap
              my={2}
              mx={2}
            >
              {title}
            </Typography>
          )}
          {children}
        </ContainerWrapper>
      </Box>
    </Box>
  );
};
