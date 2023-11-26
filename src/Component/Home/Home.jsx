import React, { useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";

const api_key = "76f484e0b423dec4bc04c06099511f34";
const url = "https://api.themoviedb.org/3"
const upcoming = "upcoming";
const imgUrl = "https://image.tmdb.org/t/p/original";
const nowPlaying = "now_playing";
const popular = "popular";
const topRatad = "top_rated";

const Card = ({img}) => <img className='card' src={img} alt = "cover"/>;


const Row = ({title,arr=[{
  
}
]}) =>{
  // console.log('arr',arr);
  return(
  <div className='row'>
    <h2>{title}</h2>
    <div>
        {
          arr.map((item,index)=>(
            <Card key= {index} img={`${imgUrl}/${item.poster_path}`}/>
          ))
        }
    </div>
  </div>
  )
    };

export const Home = () => {

  const [upcomingMovies,setUpcomingMovies] = useState([]);
  const [playing,setplaying] = useState([]);
  const [rated,setRated] = useState([]);
  const [upcomingPopular,setUpcomingPopular] = useState([]);
  const [genre,setGenre] = useState([]);

  useEffect(()=>{
    const fetchUpcoming = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${api_key}&page=3`);
      setUpcomingMovies(results)
      // console.log(upcomingMovies);
    }; 

    const Now_playing = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${api_key}`);
      setplaying(results)
      // console.log(upcomingMovies);
    }; 

    const top_Rated = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${topRatad}?api_key=${api_key}`);
      setRated(results)
      // console.log(upcomingMovies);
    }; 

    const Popular = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${api_key}`);
      setUpcomingPopular(results)
      // console.log(upcomingMovies);
    }; 

    const getAllGenre = async()=>{
      const {data:{genres}} = await axios.get(`${url}/genre/movie/list?api_key=${api_key}`);
      setGenre(genres)
      // console.log(upcomingMovies);
    }; 

    getAllGenre();
    Now_playing();
    top_Rated();
    Popular();
    fetchUpcoming()
  },[]);

  return (
    <section className='home'>
        <div className="banner"
        style={{
          backgroundImage:upcomingMovies[1]? `url(${`${imgUrl}/${upcomingPopular[1].poster_path}`})` : "rgb(16,16,16)"
        }}>
          {
            upcomingPopular[1] && (
              <h1>{upcomingPopular[1].original_title}</h1>
            )
          }
          {
            upcomingPopular[1] && (
              <p>{upcomingPopular[1].overview}</p>
              )
          }
          <div>

          <button><BiPlay/>Play </button>
          <button><AiOutlinePlus/> My List </button>
          </div>

        </div>
        <Row title={"Upcoming"} arr={upcomingMovies} />
        <Row title={"Now Playing"} arr={playing} />
        <Row title={"Top Rated"} arr={rated} />
        <Row title={"Popular"} arr={upcomingPopular} />
        <div className="genreBox">
          {
            genre.map((item)=>(
              <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
            ))
          }
        </div>
    </section>
  )
}
