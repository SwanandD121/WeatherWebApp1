import React, {useState, useEffect} from 'react';
import videoBg from '../src/assets/img/videoBg.mp4'
import Lottie from 'lottie-react';

import axios from 'axios';

// LottieFiles Icons
import Thunderstorm from '../src/assets/icons/thunderstorm.json'

// Import Icons
import {IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch} from 'react-icons/io'
import {BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsCloudDrizzle, BsSnow} from 'react-icons/bs'
import {TbTemperatureCelsius} from 'react-icons/tb'
import {ImSpinner8} from 'react-icons/im'

// API Key
const APIkey = '87a56cbf00aa8d38f6eba88ed8a9b311';

const App = () => {
  const[data, setData] = useState(null);
  const[location, setLocation] = useState('Yavatmal');
  const[inputValue, setInputValue] = useState('');
  const[animate, setAnimate] = useState(false);
  const[loading, setLoading] = useState(false);
  const[errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    if(inputValue !== ''){
      // Set Location
      setLocation(inputValue);
    };

    // Select Input
    const input = document.querySelector('input');

    // if input value us empty
    if(inputValue === ''){
      // set animate to true
      setAnimate(true);

      // after 500ms, set animate to false
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    };

    // Clear Input
    input.value = '';

    // Prevent Default
    e.preventDefault();
  };

  

  // Fetching the Data
  useEffect(()=>{
    // Set loading to true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`
    
    axios.get(url).then(res => {
      // Set the Data after 1500ms
      setTimeout(() => {
        setData(res.data);
        // Set loading to false
        setLoading(false);
      }, 1500);
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err);
    })
  }, [location]);

  // Error Messege
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000)
    // Clear Timer
    return ()=> clearTimeout(timer);
  }, [errorMsg])

  if(!data){
    return <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
      <div>
        <ImSpinner8 className='text-5xl animate-spin text-white'/>
      </div>
    </div>
  }

  // Set Icons according to the weather
  let icon;
  console.log(data.weather[0].main);

  switch(data.weather[0].main){
    case 'Clouds':
      icon = <IoMdCloudy />
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break;
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]'/>
      break;
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]'/>
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]'/>
      break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#31cafb]'/>
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      // icon = <Lottie animationData={Thunderstorm} className='h-[50%]'/>
      break;
  }

  // Date Object
  const date = new Date();

  return <div className='w-full h-screen'>
    <video src={videoBg} autoPlay loop muted className='w-full h-full object-cover absolute'/>

    <div className='w-full h-full absolute flex flex-col items-center justify-center '>


      {errorMsg && <div className=' w-full max-w-[90vw] lg:max-w-[400px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md'>{`${errorMsg.response.data.messege}`}</div>}

      {/* Form */}
        <form className={`${animate ? 'animate-shake' : 'animate-none'}  h-14 bg-black/30 w-full max-w-[400px] rounded-full backdrop-blur-[32px] mb-5 `}>
          <div className='h-full relative flex items-center justify-between p-1'>
            <input onChange={(e)=> handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type="text" placeholder='Search by City or Country' ></input>
            <button onClick={(e)=> handleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'>
              <IoMdSearch className='text-2xl text-white' />
            </button>
          </div>
        </form>

      {/* Card */}
        <div className=' w-full max-w-[400px] bg-black/20 min-h-[484px] text-white backdrop-blur-[32px] rounded-[32px] py-9 px-7'>

          {loading ? (
            <div className='w-full h-full flex justify-center items-center'> <ImSpinner8 className='text-white text-5xl animate-spin'/> </div>
            ) : (
              
              <div>

              {/* Card Top */}
              <div className='flex items-center gap-x-5'>
                {/* Icon */}
                <div className='text-[87px]'>{icon}</div>

                <div>

                {/* City Name */}
                <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
                
                {/* Date */}
                <div>{date.getUTCDate()}/{date.getUTCMonth()+1}/{date.getUTCFullYear()}</div>

                </div>

              </div>

              {/* Card Body */}
              <div className='my-10'>

                <div className='flex justify-center items-center'>
                  {/* Temperature */}
                  <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>

                  {/* Celcius Icon */}
                  <div className='text-4xl'>
                    <TbTemperatureCelsius />
                  </div>
                </div>

                {/* Weather Description */}
                <div className='capitalize text-center'>{data.weather[0].description}</div>

              </div>

              {/* Card Bottom */}
              <div className='max-w-378px mx-auto flex flex-col gap-y-6'>

                <div className='flex justify-between'>

                  <div className='flex items-center gap-x-2'>
                    {/* Icon */}
                    <div className='text-[20px]'><BsEye /></div>
                    <div>Visibility <span className='ml-2'>{data.visibility/1000} km</span></div>
                  </div>

                  <div className='flex items-center gap-x-2'>
                    {/* Icon */}
                    <div className='text-[20px]'><BsThermometer /></div>
                    <div className='flex'>Feels Like 
                      <div className='ml-2 flex'>{parseInt(data.main.feels_like)}
                        <TbTemperatureCelsius />
                      </div> 
                    </div>
                  </div>

                </div>

                <div className='flex justify-between'>

                  <div className='flex items-center gap-x-2'>
                    {/* Icon */}
                    <div className='text-[20px]'><BsWater /></div>
                    <div>Humidity <span className='ml-2'>{data.main.humidity} %</span></div>
                  </div>

                  <div className='flex items-center gap-x-2'>
                    {/* Icon */}
                    <div className='text-[20px]'><BsWind /></div>
                    <div>Wind<span className='ml-2'>{data.wind.speed} m/s</span></div>
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>

      {/* Name */}
        <div className='flex flex-col text-white/50 items-center pt-3 text-[12px] tracking-widest'>
          <label>MADE BY</label>
          <label>SWANAND DESHPANDE</label>
        </div>

    </div>

  </div>;
};

export default App;
