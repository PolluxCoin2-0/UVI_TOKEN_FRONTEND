import { TransactionData } from "../data/TransactionData";
import BackgroundImg from "../assets/BGImage.png";

const TransactionPage = () => {
  return (
    <div>
      {/* Transaction content */}
      <div className="bg-black w-full h-full pt-10 relative px-12 pb-20">
        <img
          src={BackgroundImg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 "
        />

        <div className="px-12 relative z-10">
          <p className="text-white text-2xl font-semibold mb-6 ">
            My Transactions
          </p>

          {/* Transaction table */}
          {TransactionData.map((data, index) => {
            const isFirst = index === 0;
            const isLast = index === TransactionData.length - 1;

            return (
              <div
                key={index}
                className={`bg-[#1B1B1B] w-full flex flex-row justify-between p-7 border-[1px] border-white border-opacity-15 
        ${isFirst ? "rounded-t-lg " : ""} 
        ${isLast ? "rounded-b-lg" : ""}`}
              >
                <div>
                  <p className="text-white text-lg font-semibold">
                    {data?.transactionId}{" "}
                  </p>
                  <p className="text-[#8C8B8B] pt-1">Rank: {data?.rank}</p>
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-[#FFC121] text-lg font-semibold">
                    {data?.payment}{" "}
                  </p>
                  <p className="text-[#8C8B8B] pt-1">{data?.LastDay} Day</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
