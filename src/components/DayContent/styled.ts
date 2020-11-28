import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

interface ContainerProps {
  isBorder: boolean;
  press: boolean;
}

interface TextProps {
  press: boolean;
}
export const Container = styled(LinearGradient)<ContainerProps>`
  width: 47px;
  height: 85px;
  border: ${(props) => (props.isBorder ? "1px solid #ddd" : "none")};
  border-radius: 10px;
  margin: 0 15px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 30px;
  height: 30px;
  margin: 3px 0;
`;

export const Text = styled.Text<TextProps>`
  font-family: "Epilogue-Regular";
  font-size: 14px;
  color: ${(props) => (props.press ? " #f5f5f5" : "#ddd")};
`;
