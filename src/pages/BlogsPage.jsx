import Blog1Img from "../assets/Blog1.png";
import Blog2Img from "../assets/Blog2.png";
import BackgroundImg from "../assets/BGImage.png";

const BlogsPage = () => {
  return (
    <div className="bg-black w-full h-full relative px-6 xl:px-8 pb-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full mt-10 xl:mt-12">
          {[Blog1Img, Blog2Img, Blog1Img, Blog2Img].map((img, index) => (
            <div
              key={index}
              className="w-full bg-[#1B1B1B] text-white h-auto border border-white border-opacity-15 rounded-3xl"
            >
              <img src={img} alt={`blog${index + 1}-image`} className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 w-full mt-20">
          {[Blog1Img, Blog2Img, Blog1Img, Blog2Img].map((img, index) => (
            <div
              key={index}
              className="w-full bg-[#1B1B1B] text-white h-auto border border-white border-opacity-15 rounded-3xl"
            >
              <img src={img} alt={`blog${index + 5}-image`} className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
