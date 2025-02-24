import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTransactions, getUserTransactions } from "../utils/axios";
import { useSelector } from "react-redux";
import { TimeFormat } from "../utils/TimeFormat";
import { shortenString } from "../utils/shortenString";
import Pagination from "../components/Pagination";

const TransactionPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const [text, setText] = useState("");
  const [transactionArray, setTransactionsArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          pathname === "/transaction" ||
          pathname === "/transaction/alllivetransaction"
        ) {
          setText("Live");
          const allTransactions = await getAllTransactions();
          setTransactionsArray(allTransactions?.data?.transactions);
        } else {
          setText("My");
          const userTransactions = await getUserTransactions(token);
          setTransactionsArray(userTransactions?.data?.transactions);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pathname, token]);

    // Get the paginated data for the current page
   // Ensure transactionArray exists and has a length before slicing
const paginatedData = transactionArray && transactionArray.length
? transactionArray.slice((currentPage - 1) * 20, currentPage * 20)
: [];


  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div>
      {/* Transaction content */}
      <div
        className="bg-[#0E0E0E] w-full min-h-screen pt-10 relative px-2 xl:px-12 pb-20 overflow-x-scroll md:overflow-x-hidden  min-w-[280px] md:min-w-[400px] lg:min-w-[600px] xl:min-w-[1000px]"
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
          {transactionArray ?
            paginatedData.map((data, index) => {
              const isFirst = index === 0;
              const isLast = index === paginatedData.length - 1;

              return (
                <div
                  key={index}
                  className={`bg-[#141414] w-full flex flex-row justify-between p-4 md:p-7 border-b-[1px]  border-[#2A2A2A] 
                ${isFirst ? "rounded-t-3xl " : ""} 
                ${isLast ? "rounded-b-3xl" : ""}
                `}
                >
                  <div>
                    {/* for mobile device- wallet address */}
                    <p className="block md:hidden text-xs md:text-lg font-semibold text-white">
                      {data?.walletAddress &&
                        shortenString(data?.walletAddress, 10)}{" "}
                    </p>

                    {/* for devices above mobile-wallet address  */}
                    <p className="hidden md:block text-xs md:text-lg font-semibold text-white">
                      {data?.walletAddress}{" "}
                    </p>

                    {/* For mobile and tablet devices - shortened transaction ID */}
                    <a href={`https://poxscan.io/transactions-detail/${data?.trxId}`}>
                    <p className="block  xl:hidden text-[#8C8B8B] text-xs md:text-lg font-normal">
                      {data?.trxId && shortenString(data?.trxId, 12)}
                    </p>
                    </a>
                    
                    {/* For devices larger than tablet - full transaction ID */}
                    <a href={`https://poxscan.io/transactions-detail/${data?.trxId}`}>
                    <p className="hidden xl:block text-[#8C8B8B] text-xs md:text-lg font-normal">
                      {data?.trxId}
                    </p>
                    </a>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-[#FFC121] text-xs md:text-lg font-semibold">
                      {data?.amount} UVI
                    </p>
                    <p className="text-[#8C8B8B] text-xs md:text-lg pt-1">
                      {data?.createdAt && TimeFormat(data?.createdAt)}
                    </p>
                  </div>
                </div>
              );
            }):
            <p className="text-center font-bold text-white text-xl py-6">
                No data found . . .
              </p>
            }
        </div>
        {
          transactionArray?.length >0 && 
          <Pagination totalRecords={transactionArray?.length || 0} setPageNo={handlePageChange} />
        }
      </div>
    </div>
  );
};

export default TransactionPage;
