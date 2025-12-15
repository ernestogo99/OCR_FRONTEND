import { Box, Container, Typography, Button, Paper } from "@mui/material";
import React from "react";
import { FormTextField } from "./formtextfield";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema, type Iuser, type loginData } from "../../interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
interface IauthFormProps {
  tittle: string;
  isLogin: boolean;
  onSubmit: (data: Iuser) => void;
}

export const AuthForm: React.FC<IauthFormProps> = ({
  tittle,
  isLogin,
  onSubmit,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginData>({
    resolver: zodResolver(LoginSchema),
  });
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={550}
    >
      <Paper>
        {" "}
        <Container
          maxWidth="xs"
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
          }}
        >
          <Paper></Paper>
          <Typography fontSize={25} textAlign="center" fontWeight="bold" mb={2}>
            {tittle}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              label="Email"
              type="email"
              register={register("email")}
              fieldError={errors.email}
              helperText={errors.email?.message}
            />

            <FormTextField
              label="Senha"
              type="password"
              register={register("password")}
              fieldError={errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              disabled={isSubmitting}
            >
              {isLogin ? "Entrar" : "Cadastrar"}
            </Button>

            {isLogin && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/cadastro")}
              >
                Cadastre-se
              </Button>
            )}
          </form>
        </Container>
      </Paper>
    </Box>
  );
};
