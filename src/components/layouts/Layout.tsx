import Head from "next/head";
import React, { ReactNode } from "react";
import { CssBaseline, Grow, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { IntlProvider } from "react-intl";
import { theme } from "@/lib/theme/theme";
import { ConfigProvider } from "@/hooks/useConfig";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Number Guessing Game</title>
        <meta name="description" content="Number Guessing Game" />
        <meta name="application-name" content="Number Guessing Game" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Number Guessing Game"
        />
        <meta
          name="description"
          content="A simple minimalistic number guessing game."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon.png" />

        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <ConfigProvider>
        <IntlProvider locale="en-GB" defaultLocale="en-GB">
          <SnackbarProvider
            maxSnack={2}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            TransitionComponent={Grow}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </SnackbarProvider>
        </IntlProvider>
      </ConfigProvider>
    </>
  );
};

export default Layout;
