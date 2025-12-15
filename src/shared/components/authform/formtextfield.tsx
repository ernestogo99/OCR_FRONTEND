import { TextField, type TextFieldProps } from "@mui/material";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";

type FormTextFieldProps = Omit<TextFieldProps, "error"> & {
  register: UseFormRegisterReturn;
  fieldError?: FieldError;
};

export const FormTextField: React.FC<FormTextFieldProps> = ({
  register,
  fieldError,
  ...props
}) => {
  return (
    <TextField
      {...register}
      {...props}
      error={!!fieldError}
      helperText={fieldError?.message}
      fullWidth
      margin="normal"
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        "& .MuiInputBase-root": {
          borderRadius: 2,
        },
      }}
    />
  );
};
