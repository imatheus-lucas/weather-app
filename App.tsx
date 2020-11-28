
import React,{useState} from 'react';
import Home from './src/pages/Home'
import * as Font  from 'expo-font';
import { AppLoading } from 'expo';
import { StatusBar} from 'react-native'

export default function App() {
  /**
   * carregando as fonts utlizando o expo-font
   * https://docs.expo.io/versions/latest/sdk/font/
   */
  const[fontLoaded, setFontLoaded] = useState(false);
    const loadFonts = ()=>{
      return Font.loadAsync({
        "Epilogue-Black": require('./src/assets/fonts/Epilogue-Black.ttf'),
        "Epilogue-Medium": require('./src/assets/fonts/Epilogue-Medium.ttf'),
        "Epilogue-Regular": require('./src/assets/fonts/Epilogue-Regular.ttf'),
      });
   }

   //enquanto não carregado 
 if(!fontLoaded){
   return (
     <AppLoading
          startAsync={loadFonts}
          onFinish={() => setFontLoaded(true)}
          onError={(err) => console.log(err)}
       >
     </AppLoading>

   )
 }
 /**
  * quando carrgado exibir os components
  */
  return (
    <>
    <StatusBar translucent backgroundColor="#1987c7"  barStyle="light-content"/>
     <Home/>
    </>
  );
}

