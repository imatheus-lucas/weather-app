import React from "react";

import { Container, Image, Text } from "./styled";

interface DayContentProps {
  path?: string;
  border?: boolean;
  active?: boolean;
  temp: number;
  hour: string;
}
const Days: React.FC<DayContentProps> = ({
  path,
  border = false,
  active = false,
  temp,
  hour,
}) => {
  return (
    <Container
      press={active}
      isBorder={border}
      style={{ elevation: 5 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={active ? ["#28CEEA", "#6E96FA"] : ["#fff", "#fff"]}
    >
      <Text press={active}>{hour}</Text>
      <Image
        resizeMode="cover"
        source={{
          uri: path,
        }}
      />
      <Text press={active}>{temp}º</Text>
    </Container>
  );
};

export default Days;
