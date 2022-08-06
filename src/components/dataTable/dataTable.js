import { useEffect, useState } from "react";
import Pagination from '../pagination/pagination'
const DataTable = (props) => {

    const { filteredResults , dateInput } = props
    const [cArray, setcArray] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(25);


    useEffect(() => {
        if (filteredResults) {
            setcArray([])
            Object.entries(filteredResults).map(([key, value], index) => {
                setcArray(cArray => [...cArray, { [key]: value }])
            });
        }
    }, [filteredResults])

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = cArray.slice(indexOfFirstRecord, indexOfLastRecord);
    const filteredData = currentRecords.filter((item) => {
        return Object.keys(item).includes(dateInput)
    })
    const nPages = Math.ceil(dateInput.length > 1 ? filteredData.length : cArray.length / recordsPerPage)



    return (
        <>
            <table class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Date</th>
                        <th scope="col">Confirmed</th>
                        <th scope="col">Recovered</th>
                        <th scope="col">Deceased</th>
                        <th scope="col">Delta</th>
                        <th scope="col">Delta7</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dateInput.length > 1 ? <>
                        { filteredData.length > 0 ? filteredData.map((element , keyindex) =>
                            Object.entries(element).map(([key, value], index) => (
                                <tr> 
                                    {/* <th scope="row">{keyindex + 1}</th> */}
                                    <td>{key}</td>
                                    <td>{value.total.confirmed ? value.total.confirmed : 0}</td>
                                    <td>{value.total.recovered ? value.total.recovered : "0"}</td>
                                    <td>{value.total.deceased ? value.total.deceased : "0"}</td>
                                    <td>
                                        <p><span>Confirmed :</span><span>{value.delta ? value.delta.confirmed ? value.delta.confirmed : 0 : 0}</span></p>
                                        <p><span>Recovered :</span><span>{value.delta ? value.delta.recovered ? value.delta.recovered : 0 : 0}</span></p>
                                        <p><span>Deceased :</span><span>{value.delta ? value.delta.deceased ? value.delta.deceased : 0 : 0}</span></p>
                                    </td>
                                    <td>
                                        <p><span>Confirmed :</span><span>{value.delta7 ? value.delta7.confirmed ? value.delta7.confirmed : 0 : 0}</span></p>
                                        <p><span>Recovered :</span><span>{value.delta7 ? value.delta7.recovered ? value.delta7.recovered : 0 : 0}</span></p>
                                        <p><span>Deceased :</span><span>{value.delta7 ? value.delta7.deceased ? value.delta7.deceased : 0 : 0}</span></p>
                                    </td>
                                </tr>
                            ))
                        ): <tr>
                            <td colSpan={6}><h5 style={{"padding":"10px 0px" , "border-right":'0px'}}>No Results Found</h5></td>
                          </tr>}
                        </>:
                        currentRecords.map((element , keyindex) =>
                            Object.entries(element).map(([key, value], index) => (
                                <tr> 
                                    {/* <th scope="row">{keyindex + 1}</th> */}
                                    <td>{key}</td>
                                    <td>{value.total.confirmed ? value.total.confirmed : 0}</td>
                                    <td>{value.total.recovered ? value.total.recovered : "0"}</td>
                                    <td>{value.total.deceased ? value.total.deceased : "0"}</td>
                                    <td>
                                        <p><span>Confirmed :</span><span>{value.delta ? value.delta.confirmed ? value.delta.confirmed : 0 : 0}</span></p>
                                        <p><span>Recovered :</span><span>{value.delta ? value.delta.recovered ? value.delta.recovered : 0 : 0}</span></p>
                                        <p><span>Deceased :</span><span>{value.delta ? value.delta.deceased ? value.delta.deceased : 0 : 0}</span></p>
                                    </td>
                                    <td>
                                        <p><span>Confirmed :</span><span>{value.delta7 ? value.delta7.confirmed ? value.delta7.confirmed : 0 : 0}</span></p>
                                        <p><span>Recovered :</span><span>{value.delta7 ? value.delta7.recovered ? value.delta7.recovered : 0 : 0}</span></p>
                                        <p><span>Deceased :</span><span>{value.delta7 ? value.delta7.deceased ? value.delta7.deceased : 0 : 0}</span></p>
                                    </td>
                                </tr>
                            ))
                        )

                    }

                </tbody>
            </table>
            {nPages > 1 ? <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            /> : null}
            
        </>
    )
}


export default DataTable