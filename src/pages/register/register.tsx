import { Box } from "@mui/material";
import { AuthForm } from "../../shared/components";
import type { IuserRequest } from "../../shared/interfaces";
import { userService } from "../../shared/services/userservice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const onSubmit = (data: IuserRequest) => {
    userService.createUser(data).then((response) => {
      if (response instanceof Error) {
        toast.error(response.message);
      } else {
        toast.success("Usuário criado com sucesso");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    });
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
