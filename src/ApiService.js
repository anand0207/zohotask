import axios from "axios";
const baseUrl = "https://data.covid19india.org/v4/min/";

export const basicData=()=>{
    return  axios({
        method: "get",
        url: baseUrl+"data.min.json",
        headers: { "Content-Type": "application/json" },
    })
}


export const getdatabydate=()=>{
    return  axios({
        method: "get",
        url: baseUrl+"timeseries.min.json",
        headers: { "Content-Type": "application/json" },
    })
}