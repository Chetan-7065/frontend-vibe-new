import useFetch from '../useFetch';
import Header from "../components/Header"
import { use, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Meets = () => {
  const [selectedMode, setSelectedMode] = useState("")
  const randomNo = Math.floor(Math.random() * 5)
  const meetUrl = "https://backend-meets.vercel.app/meets"
  const meetByModeUrl = `https://backend-meets.vercel.app/meets/mode/${selectedMode}`
  const url = selectedMode  ? meetByModeUrl : meetUrl
  const {data, loading, error} = useFetch(url)
  const searchValue = useParams()
  const [results, setResults] = useState(true)
  let meetData = []
  if(data){
    if(searchValue.searchValue){
     const filterData = data.filter((meet) =>  searchValue.searchValue == meet.title || searchValue.searchValue == meet.tags ? meet : "" )
     meetData = filterData
    }else{
      meetData = data
    }
  }

  return(
    <>
    <Header/>
    <div className="container my-2">
      <div className="row align-items-center  justify-content-between my-2">
      <div className="col-6">
        <p className="display-5 text-primary-emphasis">Find your next vibe</p>
      </div>
      <div className="col-3 mt-0">
      <select id="filterByMode" className="form-control text-primary-emphasis fs-5 border-primary" onChange={(event) => setSelectedMode(event.target.value)}>
        <option value="">Both</option>
        <option value="offline">offline</option>
        <option value="online">online</option>
      </select>
      </div>
      </div>
    {loading && <p className="fs-3 m-4">loading...</p> }
      <div className="row g-4">
    {meetData && meetData.length > 0 && (meetData.map((meet) => {
      return (
        <div key={meet._id} className="col-sm-4">
          <div className="card rounded-4 overflow-hidden  border-primary" style={{maxWidth: "30rem"}}>
              <img className="card-img-top img-fluid " src={`${meet.photos[7]}`} alt="" /> <span className="badge position-absolute top-0 start-0 text-bg-success fw-normal mt-3 ms-3 fs-6 rounded-pill ">{meet.tags  }</span>
            <div className="card-body p-4">
              <h5 className="card-title text-primary-emphasis">{meet.title}</h5>
              <p className="card-text text-info-emphasis fw-normal "><span className="bi bi-clock">  {meet.startTime} - {meet.endTime}</span></p>
              <p className="card-text bi bi-calendar-event text-info-emphasis fw-normal" > {meet.date}</p> 
              <p className="card-text bi bi-geo-alt text-info-emphasis fw-normal">  {meet.address}</p>
              <Link className="btn btn-primary" to={`/meets/${meet._id}`}>View details</Link>
            </div>
          </div>
        </div>
      )
    } ))
  }
  { !loading && meetData.length === 0 && <p className="fs-3 m-4">No Data Found</p>}
  </div>
    </div>
    </>
  )
}

export default Meets