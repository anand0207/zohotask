import { useEffect, useState } from "react";
import { basicData, getdatabydate } from '../../ApiService'
import CardsComponent from '../../components/Cards/Cards'
import NoResults from '../../components/Noresults/noresult';

import './Home.css'

const states = { "AN": "Andaman and Nicobar Islands", "AP": "Andhra Pradesh", "AR": "Arunachal Pradesh", "AS": "Assam", "BR": "Bihar", "CG": "Chandigarh", "CH": "Chhattisgarh", "DH": "Dadra and Nagar Haveli", "DD": "Daman and Diu", "DL": "Delhi", "GA": "Goa", "GJ": "Gujarat", "HR": "Haryana", "HP": "Himachal Pradesh", "JK": "Jammu and Kashmir", "JH": "Jharkhand", "KA": "Karnataka", "KL": "Kerala", "LA": "Ladakh", "TG": "Telangana", "LD": "Lakshadweep", "MP": "Madhya Pradesh", "MH": "Maharashtra", "MN": "Manipur", "ML": "Meghalaya", "MZ": "Mizoram", "NL": "Nagaland", "OR": "Odisha", "PY": "Puducherry", "PB": "Punjab", "RJ": "Rajasthan", "SK": "Sikkim", "TN": "Tamil Nadu", "TS": "Telangana", "TR": "Tripura", "UP": "Uttar Pradesh", "UT": "Uttarakhand", "WB": "West Bengal" }

const HomePage = () => {
    const [initcovidbasicData, setinitcovidbasicData] = useState([]);
    const [covidbasicData, setcovidbasicData] = useState([]);
    const [sesrchfilteredResults, setsesrchFilteredResults] = useState([]);
    const [rawdata, setrawdata] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [sortby, setsortby] = useState('')
    const [dateInput, setdateInput] = useState('')



    useEffect(() => {
        setinitcovidbasicData([])
        setrawdata([])
        basicData().then((result) => { 
            Object.keys(result.data).map((key) => {
                const newKey = states[key] || key;
                setrawdata(rawdata => [...rawdata, { [newKey]: result.data[key] }])
                setinitcovidbasicData(initcovidbasicData => [...initcovidbasicData, { [newKey]: result.data[key] }])
            });
        })
    }, [])



    useEffect(() => {
        if (initcovidbasicData.length > 0) {
            getdatabydate().then((result) => {
                setcovidbasicData([])
                Object.entries(result.data).map(([key, value], index) => {
                    const newKey = states[key] || key;
                    var newobj = Object.assign(initcovidbasicData[index][newKey], { bydate: value.dates });
                    setcovidbasicData(covidbasicData => [...covidbasicData, { [newKey]: newobj }])
                });
            })
        }
    }, [initcovidbasicData])


    useEffect(() => {
        if (searchInput) {
            const filteredData = covidbasicData.filter((item) => {
                return Object.keys(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })

            setsesrchFilteredResults(filteredData)
        }
    }, [searchInput])

    useEffect(() => {
        if (searchInput.length == 0) {
            sortdata(sortby)
        }
    }, [searchInput])

    const sortdata = (value) => {
        setsortby(value)
        if (value == "confirmedcountdescending") {
            let obj = {}
            if (searchInput.length > 1) {
                sesrchfilteredResults.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const descending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => y[1].total.confirmed - x[1].total.confirmed)
                );

                setsesrchFilteredResults([])
                Object.entries(descending).map(([key, value], index) => {
                    setsesrchFilteredResults(sesrchFilteredResults => [...sesrchFilteredResults, { [key]: value }])
                })
            } else {
                covidbasicData.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const descending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => y[1].total.confirmed - x[1].total.confirmed)
                );

                setcovidbasicData([])
                Object.entries(descending).map(([key, value], index) => {
                    setcovidbasicData(covidbasicData => [...covidbasicData, { [key]: value }])
                })
            }
        } else if (value == "confirmedcountascending") {
            let obj = {}
            if (searchInput.length > 1) {

                sesrchfilteredResults.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const ascending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => x[1].total.confirmed - y[1].total.confirmed)
                );
                setsesrchFilteredResults([])
                Object.entries(ascending).map(([key, value], index) => {
                    setsesrchFilteredResults(sesrchFilteredResults => [...sesrchFilteredResults, { [key]: value }])
                })
            } else {
                covidbasicData.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const ascending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => x[1].total.confirmed - y[1].total.confirmed)
                );
                setcovidbasicData([])
                Object.entries(ascending).map(([key, value], index) => {
                    setcovidbasicData(covidbasicData => [...covidbasicData, { [key]: value }])
                })
            }
        } else if (value == "recoveredcountascending") {
            let obj = {}
            if (searchInput.length > 1) {

                sesrchfilteredResults.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const ascending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => x[1].total.recovered - y[1].total.recovered)
                );
                setsesrchFilteredResults([])
                Object.entries(ascending).map(([key, value], index) => {
                    setsesrchFilteredResults(sesrchFilteredResults => [...sesrchFilteredResults, { [key]: value }])
                })
            } else {
                covidbasicData.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const ascending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => x[1].total.recovered - y[1].total.recovered)
                );
                setcovidbasicData([])
                Object.entries(ascending).map(([key, value], index) => {
                    setcovidbasicData(covidbasicData => [...covidbasicData, { [key]: value }])
                })
            }
        }
        else if (value == "recoveredcountdescending") {
            let obj = {}
            if (searchInput.length > 1) {

                sesrchfilteredResults.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const descending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => y[1].total.confirmed - x[1].total.confirmed)
                );
                setsesrchFilteredResults([])
                Object.entries(descending).map(([key, value], index) => {
                    setsesrchFilteredResults(sesrchFilteredResults => [...sesrchFilteredResults, { [key]: value }])
                })
            } else {
                covidbasicData.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const descending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => y[1].total.confirmed - x[1].total.confirmed)
                );
                setcovidbasicData([])
                Object.entries(descending).map(([key, value], index) => {
                    setcovidbasicData(covidbasicData => [...covidbasicData, { [key]: value }])
                })
            }
        }
        else if (value == "deceasedcountascending") {
            let obj = {}
            if (searchInput.length > 1) {

                sesrchfilteredResults.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const ascending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => x[1].total.deceased - y[1].total.deceased)
                );
                setsesrchFilteredResults([])
                Object.entries(ascending).map(([key, value], index) => {
                    setsesrchFilteredResults(sesrchFilteredResults => [...sesrchFilteredResults, { [key]: value }])
                })
            } else {
                covidbasicData.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const ascending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => x[1].total.deceased - y[1].total.deceased)
                );
                setcovidbasicData([])
                Object.entries(ascending).map(([key, value], index) => {
                    setcovidbasicData(covidbasicData => [...covidbasicData, { [key]: value }])
                })
            }
        } else if (value == "deceasedcountdescending") {
            let obj = {}
            if (searchInput.length > 1) {

                sesrchfilteredResults.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const descending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => y[1].total.confirmed - x[1].total.confirmed)
                );
                setsesrchFilteredResults([])
                Object.entries(descending).map(([key, value], index) => {
                    setsesrchFilteredResults(sesrchFilteredResults => [...sesrchFilteredResults, { [key]: value }])
                })
            } else {
                covidbasicData.map((result) => {
                    Object.entries(result).map(([key, value], index) => {
                        obj[key] = value
                    })
                })
                const descending = Object.fromEntries(
                    Object.entries(obj).sort((x, y) => y[1].total.confirmed - x[1].total.confirmed)
                );
                setcovidbasicData([])
                Object.entries(descending).map(([key, value], index) => {
                    setcovidbasicData(covidbasicData => [...covidbasicData, { [key]: value }])
                })
            }
        }
    }

    const ClearResults =() =>{
       
        setSearchInput('')
        setdateInput('')
        setsortby('')
        setcovidbasicData([])
        rawdata.map((value) =>{
            setcovidbasicData(covidbasicData => [...covidbasicData , value ])
        })
    }

    return (
        <div className="container-fluid home">
            <div className="container">
                <div className="row filter_row">
                    <div className="filters_set">
                        <div style={{ "display": 'flex', "justifyContent": 'space-between', 'alignItems': "center" }}>
                            <span>States</span>&nbsp;&nbsp;<span><form>
                                <div class="form-group">
                                    <input type="text" class="form-control" value={searchInput} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter states" onChange={e => setSearchInput(e.target.value)} />
                                </div></form></span>
                        </div>
                        <div style={{ "display": 'flex', "justifyContent": 'space-between', 'alignItems': "center" }}>
                            <input type="date" id="date_filter" value={dateInput} name="birthday" onChange={e => setdateInput(e.target.value)} />
                        </div>
                        <div style={{ "display": 'flex', "justifyContent": 'space-between', 'alignItems': "center" }}>
                            <select class="form-select" aria-label="Default select example" value={sortby} onChange={e => sortdata(e.target.value)}>
                                <option selected>Sort By</option>
                                <option value="confirmedcountascending">Confirmed count Ascending</option>
                                <option value="confirmedcountdescending">Confirmed count Descending</option>
                                <option value="recoveredcountascending">Recovered count Ascending</option>
                                <option value="recoveredcountdescending">Recovered count Descending</option>
                                <option value="deceasedcountascending">Deceased count Ascending</option>
                                <option value="deceasedcountdescending">Deceased count Descending</option>
                            </select>
                        </div>
                        {
                            searchInput || dateInput || sortby ?<div id="clear_button" style={{ "display": 'flex', "justifyContent": 'space-between', 'alignItems': "center" }}>
                            <button type="button" class="btn btn-secondary" onClick={e => ClearResults(e)}>Clear</button>
                        </div> : null 
                        }
                        
                    </div>
                </div>
                <div className="row">

                    {searchInput.length > 1 ? <>
 
                        {sesrchfilteredResults.length > 0 ? sesrchfilteredResults.map((value) => (
                            Object.entries(value).map(([key, value], index) => (
                                <CardsComponent state={key} districts={value.districts} data={dateInput.length > 1 ? value.bydate[dateInput] : value} />
                            ))
                        )) : <NoResults />}
                    </> : dateInput.length > 1 ? <>
                        {covidbasicData.length > 0 ? covidbasicData.map((value) => (
                            Object.entries(value).map(([key, value], index) => (
                                <CardsComponent state={key} data={value.bydate[dateInput] !=undefined ? value.bydate[dateInput] : undefined} dateInput={dateInput !=undefined ? dateInput:null} />
                            ))
                        )) : <NoResults />}
                    </> : <>
                        { covidbasicData.map((value) => (
                            Object.entries(value).map(([key, value], index) => (
                                <CardsComponent state={key} districts={value.districts} data={value} />
                            ))
                        ))}</>}

                </div>
            </div>
        </div>
    )
}
export default HomePage