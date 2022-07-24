import { StyledButton } from "./styles";
import { ButtonProps } from "../types";
import MyButton from '@mui/material/Button';

export const Button = ({
  color,
  fixedWidth,
  children,
  onClick,
}: ButtonProps) => (
  <MyButton onClick={onClick} variant="contained">
    {children}
  </MyButton>
);
