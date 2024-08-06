import WalletImg from "../../assets/wallet.png";

const ConnectWallet = () => {
  return (
    <div className="bg-black  flex justify-center w-full h-screen ">
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800  w-[40%] h-[50%] mt-56 flex flex-col items-center ">
        {/* connect wallet image */}
        <div>
            <img src={WalletImg} className="mt-24" />
        </div>

        <p className="text-3xl font-bold text-[#FFBE2E] mt-5 ">Wallet</p>
        <button
        type="button"
        className="bg-white px-20 py-3 rounded-lg text-black text-lg font-bold mt-10"
        >Connect Wallet</button>
      </div>
    </div>
  )
}

export default ConnectWallet
