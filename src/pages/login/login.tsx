import { Box } from "@mui/material";
import { AuthForm } from "../../shared/components";
import type { Iuser } from "../../shared/interfaces";

export const Login = () => {
  const onSubmit = (data: Iuser) => {
    console.log(data);
  };
  return (
    <Box>
      <AuthForm tittle="Login" isLogin={true} onSubmit={onSubmit}></AuthForm>
    </Box>
  );
};
