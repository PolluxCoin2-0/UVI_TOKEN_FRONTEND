import { Link } from "react-router-dom";
import BackgroundImg from "../assets/BGImage.png";
import Blog1Img from "../assets/Blog1Img.jpg";

const BlogsPage = () => {
  return (
    <div className="bg-black w-full min-h-screen relative px-6 xl:px-8 pb-20">
      <img
        src={BackgroundImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      <div className="relative z-10">
        <p className="text-center text-white pt-8 text-3xl font-bold relative z-10">
          Blogs
        </p>
        <p className="text-[#CBD5E1] text-center pt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          bibendum.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full mt-10 xl:mt-12 cursor-pointer"
        >
          {[Blog1Img].map((img, index) => (
            <>            <Link to={`/blogdetail/${index}`}>
            <div
              key={index}
              className="w-full bg-[#1B1B1B] text-white h-auto border border-white border-opacity-15 rounded-3xl"
              style={{ 
                boxShadow: "0 0 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 1)"
              }}
            >
              <img src={img} alt={`blog${index + 1}-image`} className=" rounded-t-3xl" />
              <p className="text-center text-lg font-semibold pt-4 px-4">
              Introducing UVI Token: The Pulse of Uviswap and GamFi
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                Sept 02, 2024 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-7 px-4 ">
              Discover a revolutionary token that powers the seamless Uviswap ecosystem and the thriving world of Gamified Finance (GamFi).
              </p>
            </div>
            </Link>
            </>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogsPage;
