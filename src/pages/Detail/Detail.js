import DataTable from '../../components/dataTable/dataTable'
import { useParams } from 'react-router-dom';
import { getdatabydate } from '../../ApiService'
import { useEffect, useState } from 'react'
import './detail.css'
const DetailsPage = () => {
    const [dateInput, setdateInput] = useState('')
    let { id } = useParams();
    const [filteredResults, setFilteredResults] = useState({});
    useEffect(() => {
        getdatabydate().then((result) => {
            Object.entries(result.data[id]).map(([key, value], index) => {
                setFilteredResults(value)
            });
        })
    }, [])

    // useEffect(() =>{
    //     if(dateInput.length > 1){
    //         const filteredData = filteredResults.filter((item) => {
    //             return Object.keys(item).join('').toLowerCase().includes(dateInput.toLowerCase())
    //         })
    //         console.log(filteredData)
    //     }
    // },[dateInput])

    return (
        <div className='container-fluid d_page'>
            <div className='container'>
                <div className='d_date'>
                    <input type="date" id="date_filter" name="birthday" onChange={e => setdateInput(e.target.value)} />
                </div>
                <DataTable filteredResults={filteredResults}  dateInput={dateInput}/>
            </div>
        </div>
    )
}
export default DetailsPage