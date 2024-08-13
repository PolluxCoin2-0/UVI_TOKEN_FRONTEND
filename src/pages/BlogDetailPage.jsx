import BlogDetailImg from "../assets/Blogdetail.png";
import BackgroundImg from "../assets/BGImage.png";

const BlogDetailPage = () => {
  return (
    <div>
      {/* Blog Detail Page */}
      <div className="bg-black w-full h-full relative px-5 md:px-10 lg:px-14 xl:px-20 pb-20">
        <img
          src={BackgroundImg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 "
        />

        <div className="relative z-10">
          <p className="text-center text-white pt-8 text-2xl xl:text-3xl font-bold ">
            Blogs
          </p>

          {/* image */}
          <div className="w-[100%] h-[450px] border-[1px] border-white border-opacity-15 text-center mt-5 rounded-2xl">
            <img src={BlogDetailImg} alt="" className=" w-full  h-[450px]" />
          </div>

          {/* Blog Content */}
          <div>
            <p className="text-[#D9D9D9] mt-10 text-lg xl:text-xl font-bold">
              Lorem ipsum dolor{" "}
            </p>

            <p className="text-[#D9D9D9] mt-5 text-md xl:text-lg text-justify">
              Lorem ipsum dolor sit amet. Ut laudantium adipisci et animi
              dolorum et neque error aut maxime nesciunt. Vel recusandae ducimus
              At dolorem iste id magni quam id corrupti officiis At minus minus
              et quidem rerum! 33 nihil quas aut consequatur asperiores est sunt
              illo et sunt commodi.
            </p>

            <p className="text-[#D9D9D9] text-md xl:text-lg mt-5">
              Non magni quisquam ex possimus ducimus id fuga dicta et obcaecati
              blanditiis sed quidem sint est molestiae ea quam corrupti. Nam
              itaque quae et ratione error vel possimus sunt! Qui cupiditate
              quae ut magnam veritatis vel nemo dolores id aspernatur deleniti
              sed itaque aut odio placeat.
            </p>

            <p className="text-[#D9D9D9] text-lg xl:text-xl font-bold mt-5">
              Lorem ipsum dolor sit amet{" "}
            </p>

            <p className="text-[#D9D9D9] text-md xl:text-lg mt-5">
              Eum aperiam facilis aut deleniti ipsa At aspernatur nisi quo
              corporis assumenda non dolores rerum ad velit porro rem nulla
              reprehenderit. Non repudiandae harum ut harum laudantium et
              veritatis eaque et nesciunt voluptas ad aliquam aliquam non nemo
              voluptas. Sit molestiae doloribus At nemo repudiandae et
              reiciendis autem cum culpa optio ex ipsum eius et accusantium
              omnis At neque quaerat.
            </p>

            <ul className="list-disc list-insid mt-5 ml-5">
              <li className="text-[#D9D9D9]">Non magni quisquam</li>
              <li className="text-[#D9D9D9]">Eum aperiam facilis</li>
              <li className="text-[#D9D9D9]">
                Id quibusdam corporis et voluptate minus
              </li>
              <li className="text-[#D9D9D9]">Qui internos impedit vel unde</li>
            </ul>

            <p className="text-[#D9D9D9] text-lg xl:text-xl font-bold mt-5">
              Lorem ipsum dolor
            </p>

            <p className="text-[#D9D9D9] text-md xl:text-lg mt-5">
              Id quibusdam corporis et voluptate minus aut veniam quasi a magni
              incidunt in fuga distinctio et sunt autem et dolore dolor. Quo
              explicabo quidem aut esse suscipit ea inventore quia non nulla
              laborum non quia nemo est pariatur qui temporibus molestiae! Aut
              corporis distinctio ut aliquam eveniet et perferendis voluptate
              qui repellat quia. Est architecto assumenda cum ipsam architecto
              aut mollitia perferendis aut illum ullam ab praesentium animi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
