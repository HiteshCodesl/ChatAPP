import axios from "axios";

 export const getUserDetails = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        const data = response.data.data;
        console.log("user", data);
        return data;
    } 