import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// SIGNUP
export const postSignup = async (walletAddress, email, referredBy) => {
  try {
    const res = await axios.post(BASE_URL + "/signUp", {
      walletAddress: walletAddress,
      email: email,
      referredBy: referredBy,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// OTP
export const postOTPVerify = async (email, otp) => {
  try {
    const res = await axios.post(BASE_URL + "/VerifyOtp", {
      email: email,
      otp: otp,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// referral verification
export const postVerifyReferral = async (token, walletAddress, referralCode) => {
  try {
    const res = await axios.post(
      BASE_URL + "/verifyReferralCode",
      {
        walletAddress: walletAddress,
        referralCode: referralCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Set Referrer
 export const postSetReferrer = async (walletAddress, referrer) => {
  try {
    const res = await axios.post(
      BASE_URL + "/setReferrer",
      {
         "referrer": referrer,
         "walletAddress": walletAddress
      },
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Login
export const postLogin = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/login", {
      walletAddress: walletAddress,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Logout
export const postLogout = async (token) => {
  try {
    const res = await axios.get(BASE_URL + `/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// MINT USER
export const postMintUser = async (walletAddress, token) => {
  try {
    const res = await axios.post(
      BASE_URL + "/mint",
      {
        walletAddress: walletAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// USER AMOUNT
export const postUserAmount = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/getTotalMintedUser", {
      walletAddress: walletAddress,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// GET VOTE POWER
export const getVotePower = async (walletAddress) => {
  try {
    const res = await axios.post(BASE_URL + "/getStakeBalance",
      {
        "address": walletAddress,
        "visible": true,
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// GET COUNT OF ALL REGISTERED USERS
export const getCountOfUsers = async () => {
  try {
    const res = await axios.get(BASE_URL + "/getAllUserCount");
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// GET LEADERBOARD STATS
export const getLeaderboardStats = async () => {
  try {
    const res = await axios.get(BASE_URL + "/getLeaderBoard");
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

export const getProfileDetails = async(token)=>{
  try {
    const res = await axios.get(BASE_URL + "/getProfileById",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// GET REFERRAL REWARD DATA
export const getReferralBalance = async(walletAddress)=>{
  try {
    const res = await axios.post(BASE_URL + "/getReferralRewards",{
      "walletAddress":walletAddress
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

export const getTransactionResult = async (transactionId) => {
  try {
    const res = await axios.post(BASE_URL + `/chaintransactionById`, {
      value: transactionId,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Save create mining data to database
export const saveUserMinigData = async(token, trxId, walletAddress, status)=>{
  try {
    const res = await axios.post(BASE_URL + "/createMint",{
      "trxId": trxId,
      "walletAddress": walletAddress,
      "to": "PAxZmTCTKAbSvc4Y2H4WdZrtWWwsHsbUzg",
      "amount": 25,
      "status": status
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// Distribute referral rewards
export const postDistributeReferralRewards = async(walletAddress)=>{
  try {
    const res = await axios.post(BASE_URL + "/distributeReferralRewards", {
      "walletAddress": walletAddress
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// Get all transaction
export const getAllTransactions = async()=>{
  try {
    const res = await axios.get(BASE_URL + "/getAllMintTransactions");
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// Get users transactions 
export const getUserTransactions = async(token)=>{
  try {
    const res = await axios.get(BASE_URL + `/getAllUserTransactions?search=`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// Update token Balance
export const updateBalance = async(token)=>{
  try {
    const res = await axios.put(BASE_URL + "/updateTokenBalance",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// Get Referrals
export const getAllReferrals = async(walletAddress)=>{
  try {
    const res = await axios.post(BASE_URL + "/getReferrals",{
      "walletAddress": walletAddress,
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

// Singup Bonus
export const getSignupBonus = async(token)=>{
  try {
    const res = await axios.get(BASE_URL + "/getReferralBonus",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

