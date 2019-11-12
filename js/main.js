'use strict';

//default valor
let  country = "London";

 


//nueva funcion del crear con promise
//funcion que crear el weathercard
  function getweathercar(clima){
   const {dt,  main, weather } = clima
   const date = new Date(dt * 1000);
   const day = moment(date).format('dddd');
   const card = `
   <div class="weather-card">
   <div class="titulo"> ${day}</div>  
   <div class="icon"> <img src='http://openweathermap.org/img/wn/${weather[0].icon}@2x.png' /> </div>
   <div class="hot">${main.temp_max}°</div>    
   <div class="cold"> ${main.temp_min}°</div> 
   </div><!--fin de la primera carta-->`;
    return card;
}



//nueva funcion con promise
 async function GenarateWeathercard(name){
    
    const {list} =  await name;
    let current = '';

    $('.card-container').html('');
    //bucle para que no se repita.
    for( let day of list){
        let date = moment(new Date(day.dt * 1000)).format('YYYY-MM-DD');
        if(current != date){
            const card =  getweathercar(day)
            $('.card-container').append(card);
            current = date;
        }
        
    } 

}

const GetCountryByName = () =>{
    //catch the valor into a variable and select the current position
    var x = document.getElementById("select").selectedIndex;
    let _valor = document.getElementsByTagName("option")[x].value;
  
    ////"London" "New York" "Germany"  "Russia" "Australia" "Chile"
    switch(_valor){
        case "0":
            country = 'London'
            break;
        case "1":
            GetByCurrent();
            break;
        case "2":
                country = "Germany";
            break;
        case "3":
                country = "New York";
            break;
        case "4":
                country = "Russia";
            break;
        case "5":
                country = "Australia";
            break;
        case "6":
                country = "Chile";
            break;
            

    }
    //return the response of the endpoint and it's assigned to countryname
    const _name = serviciodeclima.GetWeatherByCountryName(country);
    GenarateWeathercard(_name);

}




//CurrentLocation
const  GetByCurrent = ()=>{
    //navigator integreted function 
    navigator.geolocation.getCurrentPosition((position) =>{
     const{coords} = position; 

            //ejecutar funcion cuando se llame
           valor(coords);

    })
}

//function async para mandar el currentlocation al service
async function valor(coords){
    const  Response = await serviciodeclima.GetWeatherCurrentLocation(coords);
    GenarateWeathercard(Response);
}


//DOM
document.addEventListener("DOMContentLoaded",function(){
        const coutryname = serviciodeclima.GetWeatherByCountryName(country);
     GenarateWeathercard(coutryname);
    
})


