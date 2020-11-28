/**
 * DOCUMENTAÇÃO DA API UTILIZADA https://www.weatherapi.com/docs/
 */

//IMPORTES
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import { format, parseISO, isAfter, isBefore, subHours } from "date-fns";
import { pt } from "date-fns/esm/locale";
import { View } from "react-native";

import {
  Container,
  Header,
  Location,
  DateToday,
  Content,
  ContentWrapper,
  Image,
  Footer,
  Today,
  FooterContent,
  FooterHeader,
  Text,
  Linear,
} from "./styled";
import { api, key } from "../../service/api";

import DayContent from "../../components/DayContent";
import * as Geolocation from "expo-location";
import ResponseProps from "./interfaces/IHomeProps";

const Home: React.FC = () => {
  //ESTADOS DA APLICAÇÃO USANDO O USESTATE DO REACT
  const [weather, setWeather] = useState<ResponseProps>();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  //useEffect e sempre quando a tela e acabada de ser montada
  useEffect(() => {
    /**
     * aqui temos uma arrow funtion anonima onde ela se auto chama depois de construida
     */
    (async () => {
      /**
       * Aqui pedidos permissão ao usuario para usar a sua localização
       */
      const { status } = await Geolocation.requestPermissionsAsync();
      if (status != "granted") {
        return;
      }

      //se aceito pegamos a posição e setamos em um estado
      const location = await Geolocation.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    })();
  }, []);

  useEffect(() => {
    /**
     * Mais uma arrow funtion anonima que se auto chama pois o useEffect 
     * não pode ser assincrono
     */
    (async () => {
      if (initialPosition) {
        /*aqui fazemos uma chama api para buscar informções do tempo passando 
        * latitude e longitude mais a chave da api que você consegue
        criando uma conta gratuita no site https://www.weatherapi.com/
        */
        const response = await api.get(
          `/forecast.json?key=${key}&q=${initialPosition[0]},${initialPosition[1]}&days=1`
        );
        setWeather(response.data);
      }
    })();
  }, []);

  /**
   * criei duas variaveis so para me auxiliar ao que mostrar na tela
   */
  let limit = 0;
  return (
     /**
      * Aqui usamos 2 componentes externos que foram instalados o LinearGradient
      * e o BlurView
      * https://docs.expo.io/versions/latest/sdk/blur-view/
      * https://docs.expo.io/versions/latest/sdk/linear-gradient/
      */  
    <Container
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#11DBE8", "#4085EC", "#11DBE8"]}
    >
      <BlurView
        style={{ flex: 1 }}
        tint="dark"
        intensity={10}
        blurType="dark"
        blurAmount={200}
        blurRadius={300}
      >
        <Header>
          <Location>{weather?.location.name}</Location>
          <DateToday>
            {format(Date.now(), "EEEE dd,  MMMM", { locale: pt })}
          </DateToday>
        </Header>
        <ContentWrapper>
          <Image
            resizeMode="contain"
            source={{ uri: "https:" + weather?.current.condition.icon }}
          />
          <Content>
            <Today size="25px">
              <FontAwesome name="chevron-down" size={15} color="#fff" />
              {/* 
                 Acessando propriedade do estado que e simplesmente um objeto 
                 forecastday tem varios objeto porém eu decido usar somente o primeiro
                 por isso acessei a posicção [0] do array e depois as propriedades
                 do primeiro objeto
              */}
              {weather?.forecast.forecastday[0].day.mintemp_c}º
            </Today>
            <Today margin="0 0 15% 10%">{weather?.current.temp_c}º</Today>
            <Today size="25px">
              <FontAwesome name="chevron-up" size={15} color="#fff" />
              {weather?.forecast.forecastday[0].day.maxtemp_c.toFixed()}º
            </Today>
          </Content>
        </ContentWrapper>
        <Footer>
          <FooterHeader>
            <Linear />
            <View
              style={{
                width: "100%",
                marginVertical: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text color="#72788A" size="18px">
                Today
              </Text>
              <Text color="#4085EC" size="14px">
                Next 7 days
              </Text>
            </View>
          </FooterHeader>
          <FooterContent>
            {/* 
              aqui fazemos um map muito simples para mostrar 
              como gostari de exibir somente algumas informações usei o date fns 
              isBefore e isAfter para me auxiliar a pegar as datas certas.
              usamos a variveis limit so pra mim exibir apenas alguns e não todas 
              as datas que vem na api.

            */}
            {weather?.forecast.forecastday[0].hour.map((props, index) => {
              if (
                isAfter(parseISO(props.time), subHours(Date.now(), 1)) &&
                limit <= 3
              ) {
                limit++;
                return (
                  <DayContent
                    key={Math.random().toString(36).substring(7)}
                    temp={props.temp_c}
                    hour={format(parseISO(props.time), "HH:mm")}
                    active={
                      isBefore(parseISO(props.time), Date.now()) ? true : false
                    }
                    border={
                      isAfter(parseISO(props.time), Date.now()) ? true : false
                    }
                    path={"https:" + props.condition.icon}
                  />
                );
              }
            })}
          </FooterContent>
        </Footer>
      </BlurView>
    </Container>
  );
};

export default Home;
