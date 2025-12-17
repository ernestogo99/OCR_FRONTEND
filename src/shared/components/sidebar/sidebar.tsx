import React, { useEffect } from "react";
import {
  Box,
  Drawer,
  useTheme,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
  useMediaQuery,
} from "@mui/material";

import {
  Outlet,
  useMatch,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";
import { DarkMode, DoorBack } from "@mui/icons-material";
import iconMapping from "../../utils/iconmapping";
import { useAppThemeContext, useDrawercontext } from "../../contexts";

interface IListItemProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListitemLink: React.FC<IListItemProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const IconComponent = iconMapping[icon];

  const navigate = useNavigate();

  const resolvedpath = useResolvedPath(to);

  const match = useMatch({ path: resolvedpath.pathname, end: false });

  const handleclick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleclick}>
      <ListItemIcon>
        {IconComponent ? <IconComponent /> : <Icon>{icon}</Icon>}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, draweroptions } = useDrawercontext();
  const { toggletheme } = useAppThemeContext();

  const { setdraweroptions } = useDrawercontext();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    setdraweroptions([
      {
        label: "Upload de Arquivos",
        icon: "home",
        path: "/upload",
      },
      {
        label: "Meus Arquivos",
        icon: "sale",
        path: "/meus_arquivos",
      },
    ]);
  }, []);

  return (
    <>
      <Drawer
        onClose={toggleDrawerOpen}
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {draweroptions.map((draweroption) => (
                <ListitemLink
                  key={draweroption.path}
                  to={draweroption.path}
                  icon={draweroption.icon}
                  label={draweroption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggletheme}>
                <ListItemIcon>
                  <DarkMode></DarkMode>
                </ListItemIcon>
                <ListItemText primary="alterar tema" />
              </ListItemButton>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <DoorBack></DoorBack>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        <Outlet />
      </Box>
    </>
  );
};
