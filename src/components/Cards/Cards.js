import './Cards.css'
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"

const CardsComponent = (props) => {
    const states = { "AN":"Andaman and Nicobar Islands", "AP": "Andhra Pradesh", "AR": "Arunachal Pradesh", "AS": "Assam", "BR": "Bihar", "CG": "Chandigarh", "CH": "Chhattisgarh", "DH": "Dadra and Nagar Haveli", "DD": "Daman and Diu", "DL": "Delhi", "GA": "Goa", "GJ": "Gujarat", "HR": "Haryana", "HP": "Himachal Pradesh", "JK": "Jammu and Kashmir", "JH": "Jharkhand", "KA": "Karnataka", "KL": "Kerala", "LA": "Ladakh", "TG": "Telangana", "LD": "Lakshadweep", "MP": "Madhya Pradesh", "MH": "Maharashtra", "MN": "Manipur", "ML": "Meghalaya", "MZ": "Mizoram", "NL": "Nagaland", "OR": "Odisha", "PY": "Puducherry", "PB": "Punjab", "RJ": "Rajasthan", "SK": "Sikkim", "TN": "Tamil Nadu", "TS": "Telangana", "TR": "Tripura", "UP": "Uttar Pradesh", "UT": "Uttarakhand", "WB": "West Bengal" }


    const navigate = useNavigate();
    const [dist, setdist] = useState()
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    function extractKeyValue(obj, value) {
        return Object.keys(obj)[Object.values(obj).indexOf(value)];
    }

    const dList = () => {
        if (props.districts != undefined) {
            return (
                <select class="form-select" aria-label="Default select example" onChange={e => setdist(e.target.value)}>
                    <option selected>Districts</option>
                    {Object.keys(props.districts).map(key => {
                        return (<option value={key}>{key}</option>)
                    })}
                </select>
            )
        }
    }

     useEffect(() =>{
        if(props.dateInput){
            setdist('')
        }
     },[props.dateInput])

    return (
        <div className="col-lg-4 top_card">
            <div className="card_set">
                   {console.log(props.data)}
                <h6>{props.state}</h6>
                {dList()}

            </div>
            <Slider {...settings}>
                <div className="cardDetails">
                    <h6>Total</h6>
                    {props.data != undefined && props.data.total ?
                        <ul>
                            {
                                dist && props.districts[dist] !=undefined && props.districts[dist].total != undefined ? <>
                                    <li><span>Confirmed :</span> <span> {props.districts[dist].total.confirmed ? props.districts[dist].total.confirmed : 0}</span></li>
                                    <li><span>Recovered :</span> <span> {props.districts[dist].total.recovered ? props.districts[dist].total.recovered : 0}</span></li>
                                    <li><span>Deceased :</span> <span> {props.districts[dist].total.deceased ? props.districts[dist].total.deceased : 0}</span></li>
                                </> : <>
                                    <li><span>Confirmed :</span> <span> {props.data.total.confirmed ? props.data.total.confirmed : 0}</span></li>
                                    <li> <span>Recovered :</span> <span>{props.data.total.recovered ? props.data.total.recovered : 0}</span></li>
                                    <li><span>Deceased :</span> <span>{props.data.total.deceased ? props.data.total.deceased : 0}</span></li>
                                </>
                            }
                        </ul> : <ul>
                            <li><span>Confirmed :</span> <span> 0</span></li>
                            <li> <span>Recovered :</span> <span>0</span></li>
                            <li><span>Deceased :</span> <span>0</span></li>
                        </ul>}
                </div>

                <div className="cardDetails">
                    <h6>Delta</h6>
                    {props.data != undefined && props.data.delta ?
                        <ul>
                            {
                                dist && props.districts[dist] !=undefined && props.districts[dist].delta != undefined ? <>
                                    <li><span>Confirmed :</span> <span> {props.districts[dist].delta.confirmed ? props.districts[dist].delta.confirmed : 0}</span></li>
                                    <li><span>Recovered :</span> <span> {props.districts[dist].delta.recovered ? props.districts[dist].delta.recovered : 0}</span></li>
                                    <li><span>Deceased :</span> <span> {props.districts[dist].delta.deceased ? props.districts[dist].delta.deceased : 0}</span></li>
                                </> : <>
                                    <li><span>Confirmed :</span> <span> {props.data.delta.confirmed ? props.data.delta.confirmed : 0}</span></li>
                                    <li> <span>Recovered :</span> <span>{props.data.delta.recovered ? props.data.delta.recovered : 0}</span></li>
                                    <li><span>Deceased :</span> <span>{props.data.delta.deceased ? props.data.delta.deceased : 0}</span></li></>
                            }
                        </ul> : <ul>
                            <li><span>Confirmed :</span> <span> 0</span></li>
                            <li> <span>Recovered :</span> <span>0</span></li>
                            <li><span>Deceased :</span> <span>0</span></li>
                        </ul>}
                </div>

                <div className="cardDetails">
                    <h6>Delta 7</h6>
                    {props.data != undefined && props.data.delta7 ?
                        <ul>
                            {
                                dist && props.districts[dist] !=undefined && props.districts[dist].delta7 != undefined ? <>
                                    <li><span>Confirmed :</span> <span> {props.districts[dist].delta7.confirmed ? props.districts[dist].delta7.confirmed : 0}</span></li>
                                    <li><span>Recovered :</span> <span> {props.districts[dist].delta7.recovered ? props.districts[dist].delta7.recovered : 0}</span></li>
                                    <li><span>Deceased :</span> <span> {props.districts[dist].delta7.deceased ? props.districts[dist].delta7.deceased : 0}</span></li>
                                </> : <>
                                    <li><span>Confirmed :</span> <span> {props.data.delta7.confirmed ? props.data.delta7.confirmed : 0}</span></li>
                                    <li> <span>Recovered :</span> <span>{props.data.delta7.recovered ? props.data.delta7.recovered : 0}</span></li>
                                    <li><span>Deceased :</span> <span>{props.data.delta7.deceased ? props.data.delta7.deceased : 0}</span></li></>
                            }
                        </ul> : <ul>
                            <li><span>Confirmed :</span> <span> 0</span></li>
                            <li> <span>Recovered :</span> <span>0</span></li>
                            <li><span>Deceased :</span> <span>0</span></li>
                        </ul>}
                </div>
            </Slider>
            <div id="align_button">
                <button type="button" class="btn btn-secondary" onClick={()=>navigate(`/${extractKeyValue(states, props.state)}/details`)}>View Details</button>
            </div>
        </div>
    )
}

export default CardsComponent