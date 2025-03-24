import { useInView } from "react-intersection-observer";
import CountdownTimer from "../../components/CountdownTimer";
import Timeline from "../../components/Timeline";
import Footer from "../../layout/Footer";
import SliderBanner from "./SliderBanner";
import Blocks from "./Blocks";
import MiningButton from "./MiningButton";
import HomeLeaderBoard from "./HomeLeaderBoard";

const Home = () => {
  const { ref: timerRef, inView: timerInView } = useInView({
    triggerOnce: true,
  });
  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div className="bg-[#0E0E0E] w-full min-h-screen relative pb-0">
      <div className=" relative z-10 pt-6 md:pt-8">
        <div className="px-5 md:px-8 lg:px-6">
          <SliderBanner />
          <p className="flex flex-col items-center text-white font-semibold text-2xl mt-4 md:mt-6">UVI NETWORK : Unlock Web3, Blockchain Innovation & Earnings</p>
          {/* CountDown Timer */}
          <div
            ref={timerRef}
            className={`flex flex-col items-center text-white font-bold text-2xl mt-4 md:mt-6 ${
              timerInView ? "animate-pop-in" : ""
            }`}
          >
            <p>Next Slot will be in:</p>
            <CountdownTimer />
          </div>

          {/* Time Slots */}
          <div
            ref={timelineRef}
            className={`
          ${timelineInView ? "animate-pop-in" : ""}
          `}
          >
            <Timeline />
          </div>

          {/* Start Mining */}
          <MiningButton />

          {/* Blocks */}
          <Blocks />

          {/* LeaderBoard */}
          <HomeLeaderBoard />
        </div>

        {/* Footer Section */}
        <div className="mx-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
