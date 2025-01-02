
# WEATHER

## Creating Sensors[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#creating-sensors "Direct link to Creating Sensors")

```
const weather = hmSensor.createSensor(hmSensor.id.WEATHER)  

```
## WEATHER instance[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#weather-instance "Direct link to WEATHER instance")

### weather.getForecastWeather()[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#weathergetforecastweather "Direct link to weather.getForecastWeather()")

#### Type[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#type "Direct link to Type")

```
() => ForecastWeather  

```
#### ForecastWeather: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#forecastweather-object "Direct link to ForecastWeather: object")

| Properties | Description | Type |
| --- | --- | --- |
| cityName | City Name | `string` |
| forecastData | Weather Data | `ForecastData` |
| tideData | Sunrise/Sunset Data | `TideData` |

#### ForecastData: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#forecastdata-object "Direct link to ForecastData: object")

| Properties | Description | Type |
| --- | --- | --- |
| data | Array of weather data, index `0` position for the day | `Array<ForecastDataItem>` |
| count | Length of the ForecastData array | `number` |

#### ForecastDataItem: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#forecastdataitem-object "Direct link to ForecastDataItem: object")

| Properties | Description | Type |
| --- | --- | --- |
| high | Highest temperature | `number` |
| low | Lowest temperature | `number` |
| index | Weather index, values are detailed in the table below | `number` |

| `index` value | Description |
| --- | --- |
| `0` | Cloudy |
| `1` | Showers |
| `2` | Snow Showers |
| `3` | Sunny |
| `4` | Overcast |
| `5` | Light Rain |
| `6` | Light Snow |
| `7` | Moderate Rain |
| `8` | Moderate Snow |
| `9` | Heavy Snow |
| `10` | Heavy Rain |
| `11` | Sandstorm |
| `12` | Rain and Snow |
| `13` | Fog |
| `14` | Hazy |
| `15` | T-Storms |
| `16` | Snowstorm |
| `17` | Floating dust |
| `18` | Very Heavy Rainstorm |
| `19` | Rain and Hail |
| `20` | T-Storms and Hail |
| `21` | Heavy Rainstorm |
| `22` | Dust |
| `23` | Heavy sand storm |
| `24` | Rainstorm |
| `25` | Unknown |
| `26` | Cloudy Nighttime |
| `27` | Showers Nighttime |
| `28` | Sunny Nighttime |

#### TideData: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#tidedata-object "Direct link to TideData: object")

| Properties | Description | Type |
| --- | --- | --- |
| data | TideData array, Index `0` Position represents the day | `Array<TideDataItem>` |
| count | Length of the TideData array | `number` |

#### TideDataItem: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#tidedataitem-object "Direct link to TideDataItem: object")

| Properties | Description | Type |
| --- | --- | --- |
| sunrise | Sunrise data | `Sunrise` |
| sunset | Sunset data | `Sunset` |

#### Sunrise: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#sunrise-object "Direct link to Sunrise: object")

| Properties | Description | Type |
| --- | --- | --- |
| hour | Hour | `number` |
| minute | Minute | `number` |

#### Sunset: object[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#sunset-object "Direct link to Sunset: object")

| Properties | Description | Type |
| --- | --- | --- |
| hour | Hour | `number` |
| minute | Minute | `number` |

## Code example[​](/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#code-example "Direct link to Code example")

```
class TextByLine {  
  constructor(params) {  
    const { text = '', y = undefined, line = 0 } = params  
  
    this.text = text  
    this.y = y  
    this.line = line  
    this.y_computed = Number.isInteger(this.y) ? this.y : px(this.line * 60 + 120)  
  }  
  
  render() {  
    return hmUI.createWidget(hmUI.widget.TEXT, {  
      x: px(0),  
      y: this.y_computed,  
      w: px(480),  
      h: px(46),  
      color: 0xffffff,  
      text_size: px(20),  
      align_h: hmUI.align.CENTER_H,  
      align_v: hmUI.align.CENTER_V,  
      text_style: hmUI.text_style.NONE,  
      text: this.text  
    })  
  }  
}  
  
Page({  
  build() {  
    const weather = hmSensor.createSensor(hmSensor.id.WEATHER)  
    const weatherData = weather.getForecastWeather()  
    const { forecastData, tideData } = weatherData  
  
    new TextByLine({  
      text: `cityName:${weatherData.cityName}`,  
      line: 0  
    }).render()  
  
    new TextByLine({  
      text: `forecastCount:${forecastData.count};tideCount:${tideData.count}`,  
      line: 1  
    }).render()  
  
    for (let i = 0; i < forecastData.count; i++) {  
      const { index, high, low } = forecastData.data[i]  
  
      new TextByLine({  
        text: `index:${index};high:${high};low:${low}`,  
        line: 2 + i  
      }).render()  
    }  
  
    for (let i = 0; i < tideData.count; i++) {  
      const {  
        sunrise: { hour: sunriseHour, minute: sunriseMinute },  
        sunset: { hour: sunsetHour, minute: sunsetMinute }  
      } = tideData.data[i]  
  
      new TextByLine({  
        text: `sunrise:${sunriseHour}:${sunriseMinute};sunset:${sunsetHour}:${sunsetMinute}`,  
        line: 2 + i + forecastData.count  
      }).render()  
    }  
  }  
})  

```
