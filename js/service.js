'use strict';

/*api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=a8cd739b976f5b4c2021603c21c594a5 */
const HOST= "https://api.openweathermap.org/data/2.5";//agrego el endpoint
const APPID = 'a8cd739b976f5b4c2021603c21c594a5';



    //function get weather by name with parameter
 const GetWeatherByCountryName = (name) =>{

    return new Promise(async(resolve,reject) =>{
        try {
            const response  = await fetch(`${HOST}/forecast?q=${name}&appid=${APPID}&units=metric`);
            const datos = await response.json();
            resolve(datos);
        } catch (error) {
            reject(error)
        }
        
        //console.log(response);
    })

}


    //function get current location 
const GetWeatherCurrentLocation = (cord) =>{
    return new Promise(async(resolve, reject) =>{

        try {
           const {latitude, longitude} = cord;
            const response  = await fetch(`${HOST}/forecast?lat=${latitude}&lon=${longitude}&appid=${APPID}&units=metric`);
            const data = await response.json();
            resolve(data);

        } catch (error) {
            reject(error);
        }
        
        
    })
}

//objet with the main function of the service
const serviciodeclima = {
    
    GetWeatherCurrentLocation,
    GetWeatherByCountryName
};





