import Blog1Img from "../assets/Blog1.png";
import Blog2Img from "../assets/Blog2.png";
import BackgroundImg from "../assets/BGImage.png";

const BlogsPage = () => {
  return (
    <div>
      {/* Blogs */}
      <div className="bg-black  w-full h-full relative px-6 xl:px-40 pb-20">
        <img
          src={BackgroundImg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 "
        />

        <div className="relative z-10">
          <p className="text-center text-white pt-8 text-3xl font-bold  relative z-10">
            Blogs{" "}
          </p>
          <p className="text-[#CBD5E1] text-center pt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            bibendum.
          </p>

          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 w-full mt-10 xl:mt-12">
            <div className=" w-full md:w-[22%] bg-[#1B1B1B] text-white h-auto border-[1px] border-white border-opacity-15 rounded-3xl">
              <img src={Blog1Img} alt="blog1-image " className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor{" "}
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>

            <div className=" w-full md:w-[22%] bg-[#1B1B1B] text-white h-auto border-[1px] border-white border-opacity-15 rounded-3xl">
              <img src={Blog2Img} alt="blog1-image " className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor{" "}
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>

            <div className=" w-full md:w-[22%] bg-[#1B1B1B] text-white h-auto border-[1px] border-white border-opacity-15 rounded-3xl">
              <img src={Blog1Img} alt="blog1-image " className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor{" "}
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>

            <div className=" w-full md:w-[22%] bg-[#1B1B1B] text-white h-auto border-[1px] border-white border-opacity-15 rounded-3xl">
              <img src={Blog2Img} alt="blog1-image " className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor{" "}
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0  w-full mt-20">
            <div className=" w-full md:w-[22%] bg-[#1B1B1B] text-white h-auto border-[1px] border-white border-opacity-15 rounded-3xl">
              <img src={Blog1Img} alt="blog1-image " className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor{" "}
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>

            <div className=" w-full md:w-[22%] bg-[#1B1B1B] text-white h-auto border-[1px] border-white border-opacity-15 rounded-3xl">
              <img src={Blog2Img} alt="blog1-image " className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor{" "}
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>

            <div className=" w-full md:w-[22%] bg-[#1B1B1B] text-white h-auto border-[1px] border-white border-opacity-15 rounded-3xl">
              <img src={Blog1Img} alt="blog1-image " className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor{" "}
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>

            <div className=" w-full md:w-[22%] bg-[#1B1B1B] text-white h-auto border-[1px] border-white border-opacity-15 rounded-3xl">
              <img src={Blog2Img} alt="blog1-image " className="" />
              <p className="text-center text-lg font-semibold pt-4">
                Lorem ipsum dolor{" "}
              </p>
              <p className="text-center text-[#9CA3AF] pt-2">
                April 24, 2022 - 5 min
              </p>
              <p className="text-center pt-2 pb-8 leading-5">
                Nunc non posuere consectetur, justo <br />
                erat semper enim, non hendrerit dui <br /> odio id enim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
