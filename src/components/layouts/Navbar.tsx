import React, { FC } from "react";
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

const navbarContent: { href: string; children: string }[] = [
  {
    href: "/",
    children: "Home",
  },
  {
    href: "/statistics",
    children: "Statistics",
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
