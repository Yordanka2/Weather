const apiKey ='e6c6b01c791dfe25e34332730415cfca';

const apiBaseURL = 'https://api.openweathermap.org/data/2.5/';



//https://api.openweathermap.org/data/2.5/forecast?q=Plovdiv&appid=e6c6b01c791dfe25e34332730415cfca



//https://api.openweathermap.org/data/2.5/forecast?q=Plovdiv&appid=e6c6b01c791dfe25e34332730415cfca



//https://api.openweathermap.org/data/2.5/onecall?lat=42.13&lon=24.74&exclude=hourly,current,minutly,alert&appid=e6c6b01c791dfe25e34332730415cfca



let view='list';

let forecast= [];

let city='';

function getWeather(params= {}) {

     const data={...params,appid: apiKey}

     const route='onecall'

    $.ajax({

        method: "GET",

        url: `${apiBaseURL}${route}`,

        data,

    })

    .done(response =>  {

        forecast = response.daily;

        renderForecastList();        

    })

    .fail(response => {

        console.log(response);

    })

    .always(() => {

        console.log('ajax completed');

    })

}



    function renderForecastList(){

        $forecastList= $('#forecast-list');

        $forecastList.empty();

        for(var i = 0; i < 7; ++i){

            const $template=getForecastTemplate(forecast[i]);

            $forecastList.append($template);

        }

    }

    //Тук как мога да добавя да 

   function getForecastTemplate(forecast){       

        $('.city').text(city);

        const templateSelector= `#forecast-${view}-template`;

        const $template= $($(templateSelector).html());

        var date = new Date(forecast.dt * 1000).toLocaleDateString("en-US");

        $template.find('.date').text(date);

        var tempclass = '';

        if(forecast.temp.day - 273.15 < 10) tempclass = 'bg-primary';

        else if(forecast.temp.day - 273.15 < 15) tempclass = 'bg-success';

        else tempclass = 'bg-warning';

        $template.find('.temperature').text((forecast.temp.day - 273.15).toFixed(1) + ' °C').addClass(tempclass);

        $template.find('.humidity').text('Влажност: ' + forecast.humidity + "%");

        $template.find('.wind').text('Вятър: ' + forecast.wind_speed + " m/s");

        $template.find('.icon').attr("src","http://openweathermap.org/img/wn/" + forecast.weather[0].icon + "@2x.png");



        return $template;

   }

function getWeatherParams(){    

    const cityName=getCityName()

    //const sortBy= $('#filter-sort').val();

    const split = cityName.split(' '); 

    const lat = split[0];

    const lon = split[1];

   city = split[2];

    const params= {lat,lon};

    return params;

  }



  function getCityName() {

   return $('#city').val();

  }



  $('#grid-view').click(e => {

    view = 'grid';

    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');

    $('#list-view').addClass('btn-outline-primary').removeClass('btn-primary');

    renderForecastList();

})



$('#list-view').click(e => {

    view = 'list';

    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');

    $('#grid-view').addClass('btn-outline-primary').removeClass('btn-primary');

    renderForecastList();

})



$('#get-weather').click(()=>{

    getWeather(this.getWeatherParams());

});





// $('button.toggle').on('click',function() {

//     var bool=$(".result").is(":hidden")

//     $(".result").toggleClass('hidden')

//     $(".result").attr('hidden',!bool)

    

//     });