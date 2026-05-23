/* eslint-disable no-useless-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import image from "../assets/react.svg";
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { HiTrendingUp } from "react-icons/hi";
import { TbChartBarPopular } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import ReactPlayer from 'react-player';
const MoviePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any[]>([]);
  const [input,setInput]=useState("")
  const [click, setClick] = useState(false);
  const [popup, setPopup] = useState("");
  const [search, setSearch] = useState("");
  const [trailerKey, setTrailerKey] = useState('');

  //   https://api.themoviedb.org/3/trending/{media_type}/{time_window}
//   async function fetData() {
//     const res = await axios.get(
//       `https://api.themoviedb.org/3/trending/movie/week?api_key=91de401eef2d1e423503c9a061cb82a4&page=7`,
//     );
//     // console.log(res);
//     setMovie(res.data.results);
//   }

//   useEffect(() => {
//     if(search.trim()==""){
//     fetData();
// }
//   }, []);

  //   console.log(movie);

  async function handleClick(ele: any) {
    setClick(!click);
    setPopup(ele);
    let url=`https://api.themoviedb.org/3/movie/${ele.id}/videos?api_key=91de401eef2d1e423503c9a061cb82a4`
    const video=await axios.get(url)
    // setTrailerKey(video.results.key)
    console.log(video)
    // console.log(video.data.results[0].key)
    const trailer=video.data.results.find((vid)=>vid.type=="Trailer")
    if(trailer){
        setTrailerKey(trailer?.key)
    }else{
        // <p>NO trailer found</p>
    }


  }

  useEffect(()=>{
   
  },[input])


  useEffect(() => {
    async function fetchSearch() {
         let url=""
    if(search.trim()!==""){
     url=`https://api.themoviedb.org/3/search/movie?api_key=91de401eef2d1e423503c9a061cb82a4&query=${search}`
    }else{
      url=`https://api.themoviedb.org/3/trending/movie/week?api_key=91de401eef2d1e423503c9a061cb82a4&page=7`
    }
    const res=await axios.get(url)
      console.log("resukt search");
      console.log(res.data.results);
      setMovie(res.data.results)
      setLoading(false)
}

 const timer=setTimeout(() => {
    fetchSearch()

    }, 1000);

    return ()=>{
        clearTimeout(timer)
    }
  }, [search]);

  if(loading){
    return (
        <div className="flex justify-center items-center h-[100vh] w-full">
        <div className="loader">
            <span></span>
        </div>
        </div>
    )
  }

  return (
    <div>
      <div className=" bg-[#1c1e23] h-[100vh]">
        <nav
          className="w-[100vw] hidden sm:flex  h-[10vh] flex border items-center 
      justify-between p-4 bg-[#020617] text-white"
        >
          <div>MOVIE</div>
          <div>
            <ul className="flex gap-3 justify-between w-[30vw] cursor-pointer ml-[-2em]">
              <li className="hover:text-[#00ffff] {} text-[#00ffff] text-lg border-b">
                Home
              </li>
              <li className="hover:text-[#00ffff] hover:border-b text-lg">
                Trending
              </li>
              <li className="hover:text-[#00ffff] text-lg">Popular</li>
              {/* <li className="hover:text-[#00ffff] text-lg">Trending</li> */}
            </ul>
          </div>
          <div className="flex items-center ">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter name to Search"
              className="border w-[35vw] p-3 rounded-3xl"
            />
            <IoSearch className="ml-[-2em] text-xl" />
          </div>
          <div>
            <img src={image} alt="" />
          </div>
        </nav>

        <nav className="flex  w-full justify-center fixed z-6 bg-[#1c1e23] text-white ">
          <div className="h-[6vh] flex justify-center sm:hidden w-full bg-[#1c1e23] fixed z-50  ">
            <div className="flex items-center justify-between  gap-2 w-full  z-60  ">
              <h1 className="m-2">MOVIE</h1>
              {/* <h1>Movie Hub</h1> */}
              <IoSearch
                className="mr-[1em]  text-xl "
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>

          <nav
            className="h-[8vh] flex  sm:hidden fixed justify-between border border-[#00E5ff] bottom-4 
        rounded-full text-white  w-[90vw] bg-[#1c1e23] z-50"
          >
            <div className="flex flex-col justify-center  w-[90vw] ">
              <ul className="flex justify-around items-center   cursor-pointer">
                <li className="hover:text-[#00e5ff] text-[#00ffff] text-lg border-b">
                  <IoHome className="text-[6vw]" />
                  {/* Home */}
                </li>
                <li className="hover:text-[#00e5ff] hover:border-b text-lg">
                  <HiTrendingUp className="text-[6vw]" />
                  {/* Trending */}
                </li>
                <li className="hover:text-[#00ffff] text-lg">
                  <TbChartBarPopular className="text-[6vw]" />
                  {/* Popular */}
                </li>
                <li className="hover:text-[#00ffff] text-lg">
                  {" "}
                  <CgProfile className="text-[6vw]" />
                  {/* Trending */}
                </li>
              </ul>
            </div>
          </nav>
        </nav>
        <div className="relative flex justify-center w-full">
          {isOpen && (
            <div className="flex absolute justify-center top-20  z-2 items-center mt-1 w-[90%] sm:hidden">
              <input
                type="text"
                onBlur={() => setIsOpen(false)}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search Movies border"
                className=" p-2 rounded-full items-center    w-full py-4 pl-14 pr-5
        bg-black/70
        backdrop-blur-md
        text-white
        placeholder-gray-400
        border border-gray-600
        outline-none
        focus:border-red-500
        focus:ring-2
        focus:ring-red-500/40
        transition-all
        duration-300
        shadow-2xl"
              />
            </div>
          )}
        </div>

        <div className="grid relative p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-4 place-items-center bg-[#1c1e23]">
          {movie.map((ele) => (
            <div
              key={ele.id}
              className=" relative w-full shadow-[0_0_30px_rgba(0,229,255,0.4)] border border-[#00E5ff] rounded flex p-4 flex-col items-center  overflow-hidden top-15"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`}
                className="h-full w-full object-cover"
                alt=""
                onClick={() => handleClick(ele)}
              />
              <h1 className="text-white">{ele.title}</h1>
              <h1 className="text-white">
                Rating : {ele.vote_average} 🌟 / 10
              </h1>

              {/* Pop up card */}
              {click && (
                <div className="">
                  <div className="h-20 w-20 flex flex-col  absolute fixed top-[10%] md:top-[5%] left-[10%] z-20">
                    <div className=" flex justify-center ">
                      <IoClose
                        onClick={() => setClick(false)}
                        className="text-4xl text-cyan-500 md:hidden font-bold.  bg-white p-1 m-1 rounded-full"
                      />
                    </div>

                    {click && (
                      <div className="md:h-[80vh] p-8  border border-[#00E5ff] bg-[#1c1e23] shadow-[0_0_5px_rgba(0,229,255,0.4)] flex justify-center gap-20 md:gap-0 items-center flex-col w-[80vw] text-white z-20">
                        <div className="">
                          {/* <img
                            src={`https://image.tmdb.org/t/p/original${popup.backdrop_path}`}
                            className="h w-full md:h-[65%] md:pt-[20%] object-cover p-2"
                            alt=""
                          /> */}
                          
                          
                    
                          <div className="flex justify-around ">
                            <div className="">
                              <h1 className="text-cyan-400">{popup.title}</h1>
                              <h1 className="text-white ">
                                <strong className="text-cyan-400">
                                  Rating :{" "}
                                </strong>
                                {ele.vote_average} 🌟 / 10
                              </h1>
                              <div className="hidden md:flex flex-col">
                                {/* <h1>{popup.media_type}</h1> */}
                                <h1>
                                  <strong className="text-cyan-400">
                                    Release Date :{" "}
                                  </strong>
                                  {popup.release_date}
                                </h1>
                                <h1>
                                  <strong className="text-cyan-400">
                                    Descriptions :{" "}
                                  </strong>
                                  {popup.overview}
                                </h1>
                              </div>
                            </div>
                            <div>
                              <button
                                className="border p-2 bg-red-400 text-black font-bold "
                                onClick={() => console.log("hello")}
                              >
                                Watch Now
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="md:hidden sm:flex">
                          {/* <h1>{popup.media_type}</h1> */}
                          <h1>
                            <strong className="text-cyan-400">
                              Release Date :{" "}
                            </strong>
                            {popup.release_date}
                          </h1>
                          <h1 className="line-clamp-5">
                            <strong className="text-cyan-400">
                              Descriptions :{" "}
                            </strong>
                            {popup.overview}
                          </h1>
                        </div>
                        {/* <h1 className="bg-red-500">{popup.title}</h1> */}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {trailerKey ? (
            <div className="relative">
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${trailerKey}`} 
          controls={true}
          width="100%"
          height="100%"
          className="md:h-[65%]  w-full"
        />
        </div>
      ) : (
        <p>No trailer available</p>
      )}
      </div>
    </div>
  );
};

export default MoviePage;
