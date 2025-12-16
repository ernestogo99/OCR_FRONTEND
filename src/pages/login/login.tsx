import { Box } from "@mui/material";
import { AuthForm } from "../../shared/components";
import type { IuserRequest } from "../../shared/interfaces";
import { loginService } from "../../shared/services/loginservice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (data: IuserRequest) => {
    loginService.login(data).then((response) => {
      if (response instanceof Error) {
        toast.error(response.message);
      } else {
        toast.success("Login foi um sucesso");

        localStorage.setItem("token", response.token);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    });
  };
  return (
    <Box>
      <AuthForm tittle="Login" isLogin={true} onSubmit={onSubmit}></AuthForm>
    </Box>
  );
};
