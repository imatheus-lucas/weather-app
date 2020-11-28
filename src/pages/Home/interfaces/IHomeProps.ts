
/**
 * interface da api somente com algumas informações 
 * verifique a https://www.weatherapi.com/api-explorer.aspx 
 * caso queira pegar todas as informaçoes
*/ 
export default interface ResponseProps {
    location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      tz_id: string;
      localtime_epoch: number;
      localtime: string;
    };
    current: {
      last_updated_epoch: number;
      last_updated: string;
      temp_c: number;
      temp_f: number;
      is_day: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
    };
    forecast: {
      forecastday: [
        {
          date: string;
          day: {
            maxtemp_c: number;
            mintemp_c: number;
            condition: {
              text: string;
              icon: string;
            };
            uv: number;
          };
          hour: [
            {
              temp_c: number;
              time: string;
              condition: {
                text: string;
                icon: string;
              };
              humidity: number;
              cloud: number;
            }
          ];
        }
      ];
    };
  }