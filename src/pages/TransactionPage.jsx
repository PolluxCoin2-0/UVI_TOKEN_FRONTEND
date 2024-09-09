import { TransactionData } from "../data/TransactionData";


const TransactionPage = () => {
  return (
    <div>
      {/* Transaction content */}
      <div
  className="bg-[#0E0E0E] w-full min-h-screen pt-10 relative px-2 xl:px-12 pb-20 "
 
>
        <div className="px-2 md:px-12 relative z-10">
          <p className="text-white text-2xl font-semibold mb-6 ">
            Live Transactions
          </p>

          {/* Transaction table */}
          {TransactionData.map((data, index) => {
            const isFirst = index === 0;
            const isLast = index === TransactionData.length - 1;

            return (

              <div
                key={index}
                className={`bg-[#141414] w-full flex flex-row justify-between p-4 md:p-7 border-b-[1px]  border-[#2A2A2A] 
        ${isFirst ? "rounded-t-3xl " : ""} 
        ${isLast ? "rounded-b-3xl" : ""}

        
        `}
        
        
              >
                
                <div className="">
                  <p className="text-white text-lg font-semibold ">
                    {data?.transactionId}{" "}
                  </p>
                  <p className="text-[#8C8B8B] pt-1 ">Rank: {data?.rank}</p>
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

          {/* <p className="text-center text-white font-bold text-3xl">Coming Soon . . .</p> */}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
