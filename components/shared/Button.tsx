import styled from "styled-components";

type ButtonIcons = "plus" | "cross";

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  fullWidth?: boolean;
  icon?: ButtonIcons;
  onClick(): void;
};

export const Button = styled.button<ButtonProps>`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fontSizes.xs};

  ${(props) => props.fullWidth && `width: 100%`}
`;