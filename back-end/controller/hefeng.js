const { getCity, getWeather } = require("../api/api");
const {windScaleText} = require("../constant")
const JWT = require("../util/JWT")

//由于少，本来这些都应该卸载service里面，这里直接在controller中写了，反正hefeng只有这一个
const HefengController = {
    getCityAndWeather:async (req, res) => {
        let {geolocation} = req.query
        
        const city_result = await getCity({location: geolocation})
        // console.log(city_result.data)
        const weather_result = await getWeather({
            location: city_result.data.location[0].id //city_result.data.location[0].id 为 locationId
        })
        console.log(weather_result.data)

        res.send({
            code:"SUCCESS_GET-CITY AND WEATHER",
            msg: "获取城市与天气成功",
            data: {
                city: {
                    name: `${city_result.data.location[0].adm2} ${city_result.data.location[0].name}`,
                    locationId: city_result.data.location[0].id,
                },
                weather: {
                    icon: weather_result.data.now.icon,
                    text: `${weather_result.data.now.text} ${weather_result.data.now.temp}℃ ${windScaleText[weather_result.data.now.windScale]}`,
                    fxLink: weather_result.data.fxLink
                },
            }
        })
    },
}
module.exports = HefengController