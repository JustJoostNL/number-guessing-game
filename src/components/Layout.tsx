import Head from "next/head";
import React, { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/lib/theme/theme";
import { ConfigProvider } from "@/hooks/useConfig";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Number Guessing Game</title>
        <meta name="description" content="A simple atomic clock app" />
        <meta name="application-name" content="Atomic Clock" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Atomic Clock" />
        <meta name="description" content="A simple atomic clock app" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon.png" />

        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ConfigProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ConfigProvider>
    </>
  );
};

export default Layout;
