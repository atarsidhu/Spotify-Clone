import React from "react";
import "./Login.css";
import { loginUrl } from "./spotify";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import logo from "./images/spotify.jpg";

function Login() {
  return (
    <div className="login">
      <div className="login__header">
        <img src={logo} alt="Spotify Logo" className="spotifyLogo" />
        <div className="header__right">
          <div className="tooltip">
            <div className="tooltipText">
              If you don't have a Spotify account, you may use the following
              credentials to login: <br></br>
              <div className="credentials">
                <div className="type">
                  <strong>Email:</strong>
                  <br></br>
                  <strong>Password:</strong>
                </div>
                <div className="values">
                  spotifyclone123@gmail.com
                  <br></br>
                  admin123#
                </div>
              </div>
            </div>
            <a href={loginUrl}>Login</a>
          </div>
        </div>
      </div>
      <div className="login__body">
        <div className="tint"></div>
        <div className="slideshow">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={3}
            className="carousel"
            infinite={true}
            isPlaying={true}
            interval={2500}
          >
            <Slider className="slider">
              <Slide index={0}>
                <div className="slide">
                  <h1 className="title">Listen to Songs</h1>
                  <img
                    className="img-slider"
                    src="https://i.scdn.co/image/ab67706f0000000287bff188c40608c48b82068f"
                    alt=""
                  />
                </div>
              </Slide>
              <Slide index={1}>
                <div className="slide">
                  <h1 className="title">Search for Songs and Artists</h1>
                  <img
                    className="img-slider"
                    src="https://newjams-images.scdn.co/v3/discover-weekly/aAbca4VNfzWuUCQ_FGiEFA==/bmVuZW5lbmVuZW5lbmVuZQ==/default"
                    alt=""
                  />
                </div>
              </Slide>
              <Slide index={2}>
                <div className="slide">
                  <h1 className="title">View User Playlists</h1>
                  <img
                    className="img-slider"
                    src="https://lineup-images.scdn.co/wrapped-2020-top100_DEFAULT-en.jpg"
                    alt=""
                  />
                </div>
              </Slide>
            </Slider>
            <DotGroup className="dots" />
            <ButtonBack className="btn btn-back">&#10094;</ButtonBack>
            <ButtonNext className="btn btn-next">&#10095;</ButtonNext>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
}

export default Login;
