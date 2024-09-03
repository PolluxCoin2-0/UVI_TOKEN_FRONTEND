import UviLogo from "../assets/UvitokenLogo.png";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-black z-50 flex flex-wrap flex-row justify-between items-center mt-10 px-12 py-10 lg:px-24 mb-0 ">
      {/* for left section */}
      <div>
        <Link to="/">
          {" "}
          <img src={UviLogo} alt="" className="w-48 cursor-pointer" />
        </Link>

        <a
          href="https://play.google.com/store/apps/details?id=com.app.PoLink"
          className="pl-0"
        >
          <p className="text-white text-lg font-semibold">
            Download the POLINK{" "}
          </p>
          <button
            type="button"
            className="flex items-center justify-center w-48  text-black bg-white rounded-lg h-12 border-[1px] border-yellow-500"
          >
            <div className="mr-3">
              <svg viewBox="30 336.7 120.9 129.2" width="30">
                <path
                  fill="#FFD400"
                  d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                ></path>
                <path
                  fill="#FF3333"
                  d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                ></path>
                <path
                  fill="#48FF48"
                  d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                ></path>
                <path
                  fill="#3BCCFF"
                  d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                ></path>
              </svg>
            </div>
            <div>
              <div className="text-xs text-left">GET IT ON</div>
              <div className="-mt-1 font-sans text-xl font-semibold">
                Google Play
              </div>
            </div>
          </button>
        </a>
      </div>

      {/* for right section */}

      {/* Blogs */}
      <div className="pt-8 pb-5 md:pb-0">
        <ul>
         <Link to="/blogs"><li className="text-white cursor-pointer">Blogs</li></Link>
          <li className="text-white pt-4 cursor-pointer">LightPaper</li>
          <li className="text-white pt-4 cursor-pointer">WhitePaper</li>
          <li className="text-white pt-4 cursor-pointer">Tokenomics</li>
        </ul>
      </div>

      {/* Legals */}
      <div>
        <p className="text-white text-2xl font-semibold">Legals</p>
        <div>
          <ul>
            <li className="text-white pt-4 md:pt-8 cursor-pointer">
              Terms Of Use
            </li>
            <li className="text-white pt-4 cursor-pointer">Cookie Policy</li>
            <li className="text-white pt-4 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div className="">
        <p className="text-white text-2xl font-semibold pt-8 ">Socials</p>
        <div>
          <ul>
            <Link to="https://www.instagram.com/uvi_swap/">
            <div className="flex flex-row space-x-2 items-center cursor-pointer">
              <p className="text-white pt-8">
                <FaInstagram />
              </p>
              <li className="text-white pt-8"> Instagram</li>
            </div>
            </Link>

            <Link to="https://discord.gg/BMA9sKma">
            <div className="flex flex-row space-x-2 items-center cursor-pointer">
              <p className="text-white pt-4">
                <FaDiscord />
              </p>
              <li className="text-white pt-4">Discord</li>
            </div>
            </Link>

            <Link to="https://x.com/uvi_swap">
            <div className="flex flex-row space-x-2 items-center cursor-pointer">
              <p className="text-white pt-4">
              <FaTwitter />
              </p>
              <li className="text-white pt-4">Twitter</li>
            </div>
            </Link>

            <Link to="https://t.me/uviswap">
            <div className="flex flex-row space-x-2 items-center cursor-pointer">
              <p className="text-white pt-4">
                <FaTelegramPlane />
              </p>
              <li className="text-white pt-4">Telegram</li>
            </div>
            </Link>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
