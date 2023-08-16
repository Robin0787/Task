import axios from "axios";

const SaveUserToDatabase = async (email, userInfo) => {

  const url = `${import.meta.env.VITE_BASE_URL}/save-user/${email}`;
  const res = await axios.put(url, { ...userInfo });
  return res.data;
};

export default SaveUserToDatabase;
