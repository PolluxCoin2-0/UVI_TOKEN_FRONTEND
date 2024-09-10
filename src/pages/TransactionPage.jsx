import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTransactions, getUserTransactions } from "../utils/axios";
import { useSelector } from "react-redux";
import { TimeFormat } from "../utils/TimeFormat";

const TransactionPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const [text, setText] = useState("");
  const [transactionArray, setTransactionsArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pathname === "/transaction" || pathname === "/transaction/alllivetransaction") {
          setText("Live")
          const allTransactions = await getAllTransactions();
          console.log("all", allTransactions?.data?.transactions);
          setTransactionsArray(allTransactions?.data?.transactions);
        } else {
          setText("My")
            const userTransactions = await getUserTransactions(token);
            console.log("user",userTransactions?.data?.transactions);
            setTransactionsArray(userTransactions?.data?.transactions);

        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pathname, token]);
  return (
    <div>
      {/* Transaction content */}
      <div
        className="bg-[#0E0E0E] w-full min-h-screen pt-10 relative px-2 xl:px-12 pb-20"
        style={{
          boxShadow:
            "0 2px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="px-2 md:px-12 relative z-10">
          <p className="text-white text-2xl font-semibold mb-6 ">
            {text} Transactions
          </p>

          {/* Transaction table */}
          {transactionArray && transactionArray.map((data, index) => {
            const isFirst = index === 0;
            const isLast = index === transactionArray.length - 1;

            return (
              <div
                key={index}
                className={`bg-[#141414] w-full flex flex-row justify-between p-4 md:p-7 border-b-[1px]  border-[#2A2A2A] 
                ${isFirst ? "rounded-t-3xl " : ""} 
                ${isLast ? "rounded-b-3xl" : ""}
                `}
              >
                <div>
                  <p className="text-lg font-semibold text-white">
                    {data?.walletAddress}{" "}
                  </p>

                  <p className="text-[#8C8B8B] text-lg font-normal ">
                    {data?.trxId}{" "}
                  </p>
                  </div>

                <div className="flex flex-col items-end">
                  <p className="text-[#FFC121] text-lg font-semibold">
                     {data?.amount}{" "} UVI
                  </p>
                  <p className="text-[#8C8B8B] pt-1">{data?.createdAt && TimeFormat(data?.createdAt)}</p>
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
