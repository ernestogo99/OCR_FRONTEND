import { Box } from "@mui/material";
import { AuthForm } from "../../shared/components";
import type { Iuser } from "../../shared/interfaces";

export const Register = () => {
  const onSubmit = (data: Iuser) => {
    console.log(data);
  };
  return (
    <Box>
      <AuthForm
        tittle="Cadastre-se"
        onSubmit={onSubmit}
        isLogin={false}
      ></AuthForm>
    </Box>
  );
};
