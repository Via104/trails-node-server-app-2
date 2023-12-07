// import model from "./model.js";
// import axios from "axios";

// export const fetchTrails = async () => {
//   const options = {
//     method: "GET",
//     url: "https://trailapi-trailapi.p.rapidapi.com/trails/explore/",
//     params: {
//       lat: "38.79908",
//       lon: "-104.88353",
//     },
//     headers: {
//       "X-RapidAPI-Key": "d102ce3527mshc4b1f040aa83cb1p137adbjsn3f7e380a5e93",
//       "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
//     },
//   };
//   try {
//     const response = await axios.request(options);
//     console.log("response data: " + response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const findAllTrails = () => model.find(fetchTrails());
