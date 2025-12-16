import { Menu } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { type ReactNode } from "react";
import { useDrawercontext } from "../contexts/drawercontext";

interface Ilayoutbaseprop {
  children: ReactNode;
  tittle: string;
}

export const BaseLayout: React.FC<Ilayoutbaseprop> = ({ children, tittle }) => {
  const { toggleDrawerOpen } = useDrawercontext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Menu></Menu>
          </IconButton>
        )}

        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {tittle}
        </Typography>
      </Box>

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
