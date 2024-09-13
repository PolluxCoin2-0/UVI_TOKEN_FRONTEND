import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useInView } from "react-intersection-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroVideo from "../../assets/HeroVideo.mp4";
import Slider from "react-slick";
import PlayStoreImg from "../../assets/playstore.png";
import PolinkImg from "../../assets/polink.png";
import ChromeImg from "../../assets/chrome.png";
import PolinkExtensionImg from "../../assets/PolinkEx.png";
import CurveImg from "../../assets/Curve.png";

const SliderBanner = () => {
  const { ref: videoRef, inView: videoInView } = useInView({
    triggerOnce: true,
  });
  const CustomNextArrow = ({ onClick }) => (
    <div
      className="slider-arrow slider-arrow--next font-bold"
      onClick={onClick}
    >
      <SlArrowRight />
    </div>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <div className="slider-arrow slider-arrow--prev" onClick={onClick}>
      <SlArrowLeft />
    </div>
  );

  var settings = {
    infinite: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    adaptiveHeight: true,
  };
  return (
    <>
      <Slider {...settings}>
        {/* Video */}
        <div>
          {/* Video */}
          <div
            ref={videoRef}
            className={`relative rounded-2xl bg-[#040510] h-[200px] md:h-[330px] flex items-center justify-center
    ${videoInView ? "animate-pop-in" : ""}
  `}
          >
            <div className="absolute inset-0 rounded-2xl border-[4px] border-black blur-sm"></div>
            <video
              className="w-full h-full object-cover rounded-2xl"
              autoPlay
              loop
              muted
            >
              <source src={HeroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Banner1 */}
        <div
          className="bg-gradient-to-r to-[#161616] via-[#1f1400] from-[#141414] rounded-3xl  h-[200px] md:h-[330px] flex items-center justify-center "
          style={{
            boxShadow:
              "0 2px 20px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="flex flex-row  justify-around">
            <img
              src={PlayStoreImg}
              alt="playstore-image"
              className=" w-14 md:w-24 lg:w-24 xl:w-32 2xl:w-32 object-contain"
            />
            <p className="text-md md:text-2xl lg:text-3xl 2xl:text-4xl text-[#F6B63E] font-bold pt-6 md:pt-14 2xl:pt-12">
              Polink Mobile App
            </p>
            <img
              src={PolinkImg}
              alt="polink-image"
              className=" w-14  md:w-20 lg:w-20 xl:w-32 2xl:w-28 object-contain"
            />
          </div>

          <div className="text-center ">
            <p className="text-[10px] md:text-[16px] lg:text-lg xl:text-xl font-medium lg:font-semibold text-[#f7f4f4] pt-2 ">
              UVI Token Management on the Go! Access, trade, and manage your UVI
              Tokens from <br />
              anywhere, anytime with the Polink mobile app. Available on
              Android.
            </p>
          </div>

          <div className="flex items-center justify-center ">
            <div className="relative">
              <img
                src={CurveImg}
                alt=""
                className="w-full h-auto mt-11 md:mt-[90px] lg:mt-20 xl:mt-2  object-contain"
              />

              <div className="text-center absolute z-10 inset-0 flex flex-row justify-evenly items-center px-4 md:px-32 ml-4 mr-4">
                <img
                  src={PolinkImg}
                  alt="polink-image"
                  className="w-8 md:w-14 lg:w-16 xl:w-24 2xl:w-28 object-contain mb-1 xl:mb-2"
                />

                <div className="text-center flex flex-col justify-center items-center">
                  <p className="text-sm md:text-xl font-semibold pt-10 xl:pt-0 xl:mb-5 2xl:pt-0 text-white lg:text-black ">
                    Click Here
                  </p>

                  <a href="https://play.google.com/store/apps/details?id=com.app.PoLink">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center bg-gradient-to-r to-[#FFF7A7] from-[#F6B63E] bg-opacity-5 mb-1 md:mb-0 lg:mb-0 xl:mb-4 2xl:mb-2
                                     px-4 py-0 xl:px-14 md:py-2 rounded-full text-[10px] md:text-xl font-semibold mt-0 md:mt-4 lg:mt-2 xl:mt-0 border-[1px] border-black overflow-hidden group"
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-700 ease group-hover:rotate-180 ">
                        <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 bg-gradient-to-r to-[#EA4234] via-[#8CCBF9] from-purple-950 rounded-full blur-md transition-all duration-700 ease group-hover:scale-125 opacity-0 group-hover:opacity-100"></span>
                        <span className="absolute bottom-0 left-0 w-40 h-40 -ml-10 bg-[#EA4234] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                        <span className="absolute bottom-0 left-0 w-40 h-40 -ml-10 bg-[#8CCBF9] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                        <span className="absolute bottom-0 right-0 w-40 h-40 -mr-10 bg-gradient-to-r to-[#EA4234] via-[#8CCBF9] from-purple-950 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                      </span>
                      <span className="relative text-black">
                        Download the App today
                      </span>
                    </button>
                  </a>
                </div>

                <img
                  src={PlayStoreImg}
                  alt=" playstore-image"
                  className="w-8 md:w-14 lg:w-16 xl:w-32 2xl:w-32 object-contain  mb-1 xl:mb-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Banner2 */}
        <div
          className="bg-gradient-to-r to-[#181717] via-[#3b3724] from-[#131212] bg-opacity-5 rounded-3xl  h-[200px] md:h-[330px] flex items-center justify-center "
          style={{
            boxShadow:
              "0 2px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="flex flex-row  justify-around">
            <img
              src={ChromeImg}
              alt="playstore-image"
              className="w-8 md:w-20 lg:w-24 xl:w-32 2xl:w-28 object-contain"
            />
            <p className="text-md md:text-2xl lg:text-3xl xl:text-4xl  text-[#F6B63E] font-bold pt-6 md:pt-14">
              Polink Wallet Extension
            </p>
            <img
              src={PolinkExtensionImg}
              alt="polink-image"
              className="w-8 md:w-16 lg:w-20 xl:w-28 2xl:w-24 object-contain"
            />
          </div>

          <div className="text-center ">
            <p className="text-[10px] md:text-[16px] lg:text-lg xl:text-xl font-semibold text-[#f7f4f4] pt-2">
              Manage your Tokens effortlessly with the Polink browser extension.
              <br />
              Fast, secure, and built for Web3 transactions.
            </p>
          </div>

          <div className="flex flex-row  justify-evenly ml-12 mr-12 ">
            <img
              src={PolinkExtensionImg}
              alt="polink-image"
              className="w-6 md:w-16 lg:w-16 xl:w-20 2xl:w-20 object-contain"
            />
            <div className="text-center ">
              <p className="text-sm md:text-xl font-semibold text-[#f7f4f4] pt-3 md:pt-8 2xl:pt-4">
                Click Here
              </p>
              <a href=" https://chromewebstore.google.com/detail/polink/afeibjjgfjfphjedhdjgbgbhpomolbjm">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center bg-gradient-to-r to-[#272317] via-[#6D684C] from-[#847E55] leading-4 md:leading-0 bg-opacity-5 px-6 py-0 md:px-14 md:py-2 rounded-full text-xs md:text-xl font-semibold mt-2 md:mt-4 border-[1px] border-gray-500 text-white overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full transition duration-700 ease group-hover:rotate-180 ">
                    <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 bg-gradient-to-r to-[#6B8BFC] via-[#B692C2] from-[#E3A5C7] rounded-full blur-md transition-all duration-700 ease group-hover:scale-125 opacity-0 group-hover:opacity-100"></span>
                    <span className="absolute bottom-0 left-0 w-40 h-40 -ml-10 bg-[#FFFED3] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                    <span className="absolute bottom-0 left-0 w-40 h-40 -ml-10 bg-[#FFDFD6] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                    <span className="absolute bottom-0 right-0 w-40 h-40 -mr-10 bg-gradient-to-r to-[#3098FE] via-[#B692C2] from-[#E3A5C7] rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></span>
                  </span>
                  <span className="relative text-[#f7f4f4]">
                    Add Polink Extension Now
                  </span>
                </button>
              </a>
            </div>

            <img
              src={ChromeImg}
              alt="playstore-image"
              className="w-7  md:w-20 lg:w-16 xl:w-24 2xl:w-20 object-contain"
            />
          </div>
        </div>
      </Slider>
    </>
  );
};

export default SliderBanner;
