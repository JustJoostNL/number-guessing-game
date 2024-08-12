import React from "react";
import {
  Box,
  Container,
  ContainerProps,
  Typography,
  TypographyOwnProps,
} from "@mui/material";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  hideTitle?: boolean;
  titleVariant?: TypographyOwnProps["variant"];
  container?: boolean;
  containerProps?: ContainerProps;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  children,
  hideTitle = false,
  titleVariant = "h3",
  container = false,
  containerProps,
  ...props
}) => {
  const ContainerWrapper = container ? Container : React.Fragment;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" {...props}>
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
