import api from "../utils/axios";
const getCurrentUser = async () =>{
    try {
        const {data} = await api.get("/api/me");

        // put data to redux store 
        return data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

export default getCurrentUser;