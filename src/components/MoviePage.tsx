/* eslint-disable no-useless-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { HiTrendingUp } from "react-icons/hi";
import { TbChartBarPopular } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
import image2 from "../assets/image.png";
import tiger from "../assets/tiger.png";

const MoviePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any[]>([]);
  //   const [input, setInput] = useState("");
  const [click, setClick] = useState(false);
  const [popup, setPopup] = useState<any>("");
  const [search, setSearch] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [category, setCategory] = useState("");
  const [profile, setProfile] = useState(false);

  const api_key=import.meta.env.VITE_API_URL
  console.log(api_key)

  async function handleClick(ele: any) {

    setClick(!click);
    setPopup(ele);
    const url = `https://api.themoviedb.org/3/movie/${ele.id}/videos?api_key=${api_key}`;
    const video = await axios.get(url);
    console.log(video);
    const trailer = video.data.results.find(
      (vid: any) => vid.type == "Trailer",
    );
    if (trailer) {
      setTrailerKey(trailer?.key);
    } else {
      <p>NO trailer found</p>;
    }
  }

  console.log(category);
  useEffect(() => {
    async function fetchSearch() {
      let url = "";
      if (search.trim() !== "") {
        setLoading(true)
        url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`;
      } else if (category == "popular") {
        setLoading(true)
        url = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&query=${search}`;
      } else if (category == "top") {
        setLoading(true)
        url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&query=${search}`;
      } else {
        setLoading(true)
        url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&page=7`;
      }
      const res = await axios.get(url);
      setMovie(res.data.results);
      setLoading(false);
    }

    const timer = setTimeout(() => {
      fetchSearch();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search, category]);

  //   console.log(profile)
  function handlePopular() {
    setCategory("popular");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-full">
        <div className="loader">
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" bg-[#1c1e23] relative h-[100vh]">
        <nav
          className="w-[100vw] hidden sm:flex  h-[10vh] flex border items-center 
      justify-between p-4 bg-[#020617] text-white"
        >
          <img src={image2} className="w-[15%] h-[80%]" alt="" />

          <div>
            <ul className="flex gap-3 justify-around w-[30vw] cursor-pointer ml-[-2em]">
              <li
                className={`hover:text-[#00ffff] ${category === "" ? "borber border-b-2 text-cyan-400" : "text-white"} text-[#00ffff] text-lg `}
                onClick={() => setCategory("")}
              >
                Home
              </li>
              <li
                onClick={handlePopular}
                className={`hover:text-[#00ffff] ${category === "popular" ? "borber border-b-2 text-cyan-400" : "text-white"} hover:border-b text-lg`}
              >
                Popular
              </li>
              <li
                className={`hover:text-[#00ffff] ${category === "top" ? "borber border-b-2 text-cyan-400" : "text-white"} text-lg`}
                onClick={() => setCategory("top")}
              >
                Top
              </li>
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
            {/* <img src={image} alt="" /> */}
            <CgProfile
              className="text-4xl "
              onClick={() => setProfile(!profile)}
            />
          </div>
        </nav>

        <nav className="flex  w-full justify-center fixed z-6 bg-[#1c1e23] text-white ">
          <div className="h-[6vh] flex justify-center sm:hidden w-full bg-[#1c1e23] fixed z-50  ">
            <div className="flex items-center justify-between border-b border-[#00e5ff] gap-2 w-full  z-60  ">
              {/* <h1 className="m-2">MOVIE</h1> */}
              <img src={image2} className="w-[15%] m-4 pt-2 h-[80%]" alt="" />

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
                <li className="hover:text-[#00e5ff] text-[#00ffff] text-lg ">
                  <IoHome
                    className={`text-[6vw] ${category === "" ? "borber border-b-2 text-cyan-400" : "text-white"}`}
                    onClick={() => setCategory("")}
                  />
                  {/* Home */}
                </li>
                <li
                  className={`hover:text-[#00e5ff] ${category === "popular" ? "borber border-b-2 text-cyan-400" : "text-white"} hover:border-b text-lg`}
                >
                  <HiTrendingUp
                    className="text-[6vw]"
                    onClick={handlePopular}
                  />
                  {/* Trending */}
                </li>
                <li
                  className={`hover:text-[#00ffff] ${category === "top" ? "borber border-b-2 text-cyan-400" : "text-white"} text-lg`}
                >
                  <TbChartBarPopular
                    className="text-[6vw]"
                    onClick={() => setCategory("top")}
                  />
                  {/* Popular */}
                </li>
                <li className="hover:text-[#00ffff] text-lg">
                  {" "}
                  <CgProfile
                    className="text-[6vw]"
                    onClick={() => setProfile(!profile)}
                  />
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
        {category == "popular" && search.trim() == "" && (
          <h1 className="text-white pl-5 text-2xl mt-20 z-50">Popular</h1>
        )}
        {category == "top" && search.trim() == "" && (
          <h1 className="text-white pl-5 text-2xl mt-20 z-50">Top</h1>
        )}
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
                  <div
                    className="h-20 left-1/2 -translate-x-1/2 flex flex-col  absolute 
                  fixed top-[15%]  z-20"
                  >
                    <div className=" flex justify-center ">
                      <IoClose
                        onClick={() => setClick(false)}
                        className="text-4xl text-cyan-500 md:hidden font-bold.  bg-white p-1 m-1 rounded-full"
                      />
                    </div>

                    {click && (
                      <div className=" h-auto max-h-[90vh] max-w-[1100px] m-2 p-3   bg-[#1c1e23] shadow-[0_0_5px_rgba(0,229,255,0.4)] flex justify-center gap-20 md:gap-0 items-center flex-col w-[80vw] lg:w-[80vw] text-white z-20">
                        <div className="">
                          <IoClose
                            className="text-4xl z-20 hidden md:flex"
                            onClick={() => setClick(!click)}
                          />

                          {trailerKey ? (
                            <div className="relative pt-[56%]">
                              <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                                controls={true}
                                width="100%"
                                height="100%"
                                className="md:h-[55%] absolute top-0 left-0 w-full"
                              />
                            </div>
                          ) : (
                            <p>No trailer available</p>
                          )}

                          <div className="flex justify-around ">
                            <div className="md:w-[70vw] lg:w-[55vw] xl:w-[45vw] w-[70vw]">
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
                              {/* <button
                                className="border p-2 bg-red-400 text-black font-bold "
                                onClick={() => console.log("hello")}
                              >
                                Watch Now
                              </button> */}
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
        {/* {trailerKey ? (
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
      )} */}
        <div className="flex h-auto w-full justify-center items-center">
          {profile && (
            <div className=" bg-[#1c1e23] rounded-xl text-white h-[70vh] w-[80vw] fixed justify-center items-center z-50 flex absolute top-0  mt-25">
              <div className="absolute top-0 left-0">
                <IoClose
                  className="text-4xl"
                  onClick={() => setProfile(!profile)}
                />
              </div>
              <div className="flex justify-center flex-col items-center">
                <img
                  src={tiger}
                  alt=""
                  className="rounded-full h-[200px] w-[200px]"
                />
                <h1 className="text-3xl text-align-center">Tiger</h1>
                <h1>INDIAN</h1>
                <h1 className="text-center">
                  A Powerful tiger Known for his strength and speed
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
