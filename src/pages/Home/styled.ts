import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

interface TodayProps {
  size?: string;
  margin?: string;
}

interface TextProps {
  size?: string;
  family?: string;
  color?: string;
}
export const Container = styled(LinearGradient)`
  flex: 1;
`;

export const Header = styled.View`
  padding: 20px 15px;
`;
export const Location = styled.Text`
  font-family: "Epilogue-Black";
  font-size: 27px;
  color: #f5f5f5;
  line-height: 50px;
`;
export const DateToday = styled.Text`
  font-size: 18px;
  color: #f5f5f5;
  font-family: "Epilogue-Regular";
`;
export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Content = styled.View`
  width: 100%;
  padding: 5px 25px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
export const Image = styled.Image`
  width: 64px;
  height: 64px;
`;
export const Today = styled.Text<TodayProps>`
  font-size: ${(props) => (props.size ? props.size : "75px")};
  color: #f5f5f5;
  margin: ${(props) => (props.margin ? props.margin : "0")};
  font-family: "Epilogue-Regular";
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  background: #fff;
  flex-direction: column;
  padding: 25px;
  align-items: center;
  height: 200px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
`;

export const Linear = styled.View`
  height: 5px;
  width: 50px;
  background: #4085ec;
  border-radius: 50px;
`;

export const FooterHeader = styled.View`
  height: 57px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
`;

export const FooterContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.Text<TextProps>`
  font-size: ${(props) => (props.size ? props.size : "37px")};
  color: ${(props) => (props.color ? props.color : "#fff")};
  font-family: ${(props) => (props.family ? props.family : "Epilogue-Medium")};
`;
