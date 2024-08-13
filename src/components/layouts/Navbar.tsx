import React, { FC, ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  alpha,
  lighten,
  Button,
  Box,
  Stack,
} from "@mui/material";
import Link from "next/link";
import {
  HomeRounded,
  QueryStatsRounded,
  SettingsRounded,
} from "@mui/icons-material";

const navbarContent: { href: string; children: string; icon?: ReactNode }[] = [
  {
    href: "/",
    children: "Home",
    icon: <HomeRounded />,
  },
  {
    href: "/statistics",
    children: "Statistics",
    icon: <QueryStatsRounded />,
  },
  {
    href: "/settings",
    children: "Settings",
    icon: <SettingsRounded />,
  },
];

export const Navbar: FC = () => {
  return (
    <AppBar
      variant="elevation"
      sx={{
        backgroundColor: alpha(lighten("#000", 0.1), 0.9),
        backdropFilter: "blur(10px) saturate(180%)",
      }}
      position="sticky"
    >
      <Toolbar>
        <Button
          sx={{ fontWeight: "bold", fontSize: "2rem", pt: 0, pb: 0 }}
          color="inherit"
          variant="text"
          size="small"
          LinkComponent={Link}
          href="/"
        >
          Number Guessing Game
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "block" }, mr: 5 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {navbarContent.map((item, index) => (
              <Button
                key={index}
                sx={{ fontWeight: "bold" }}
                startIcon={item.icon}
                color="inherit"
                LinkComponent={Link}
                href={item.href}
              >
                {item.children}
              </Button>
            ))}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
