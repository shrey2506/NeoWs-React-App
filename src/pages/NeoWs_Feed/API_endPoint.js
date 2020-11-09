
import Axios from "axios";

export const getNeoFeed = async (startDate, endDate) => {
  const data = await Axios.get(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.REACT_APP_NEOWS_API_KEY}`
  );

  return data;
};
