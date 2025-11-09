import useFetch from "../useFetch"
import { useParams } from "react-router-dom"
import Header from "../components/Header"

const MeetDetails = () => {
  const meetID = useParams()
  const {data, loading, error} = useFetch("https://backend-meets.vercel.app/meets")
  let meetDetails 
  if(data){
    meetDetails = data.find((meet) => meet._id === meetID.meetID)
  }
  const keyRequirements = meetDetails ? meetDetails.requirements.split(", ") : []
  const keySpeakers = meetDetails ? meetDetails.speakers.split(", ") : []
  const speakersPhotos = meetDetails? meetDetails.photos.slice(0,4).map((photo) => photo): []
  let speakersObject
  if(keySpeakers){
     speakersObject = keySpeakers.reduce(( acc, curr, index) => {
      acc.push({
          name: curr,
          img: speakersPhotos[index]
        })
         return acc
    }, [])
  }
  return(
    <>
    <Header/>
    <main>
    <div className="container my-2">
     {loading && <p className="fs-3 m-4">loading...</p> }
    {error && <p className="fs-3 m-4">error while fetching the data</p> }
      <div className="row">
      {
        meetDetails && (
          <div>
   <div className="card mb-3 p-4" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={`${meetDetails.photos[7]}`} className="img-fluid rounded" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
              <h5 className="card-title display-5 text-primary-emphasis fw-bold">{meetDetails.title}</h5>
              <div className="row">
                <div className="col">
              <p className="card-text text-info-emphasis fs-5 fw-normal my-3 "><span className="bi bi-clock">  {meetDetails.startTime} - {meetDetails.endTime}</span></p>
              <p className="card-text bi bi-calendar-event text-info-emphasis fs-5 fw-normal my-3" > {meetDetails.date}</p>
              <p className="card-text bi bi-geo-alt text-info-emphasis fs-5 fw-normal my-3">  {meetDetails.address}</p>
              </div>
              </div>
            </div>
          </div> 
           <span className="fw-semibold"><hr /></span>
              <div className="row">
              <div className="col-md-8">
              <p className="card-text text-primary-emphasis fs-3 fw-semibold">Description:</p>
              <p className="card-text text-info-emphasis fs-5">{meetDetails.description}</p>
              <p className="card-text text-primary-emphasis fs-3 fw-semibold">Key requirements:</p>
              <div className="card-text text-info-emphasis fs-5">{keyRequirements.map((requirements, index) => {
                return(
                  <ul key={index + 1} >
                    <li>{requirements}</li>
                  </ul>
                ) 
              })}</div>
                <div className="card-text text-primary-emphasis fs-3 fw-semibold">Tags: <br /><p className=" badge text-bg-success fw-normal fs-6 rounded-pill ">{meetDetails.tags}</p></div>
              </div>
              <div className="col-md-4">
              <p className="card-text text-primary-emphasis fs-3 fw-semibold">Speakers:</p>
              <div className="card-text text-info-emphasis fs-5">
                    {speakersObject.map((speaker, index) => {
                      return(
                        <div key={index + 1} className="row">
                        <div className="col-md-2 mb-3">
                          <div>
                          <img className="rounded-circle" src={`${speaker.img}?crop=faces&fit=crop&h=50&w=50`} alt={speaker.name} />
                          </div>
                        </div>
                          <div className="col-md-8">
                            <p className="">{speaker.name}</p>
                          </div>
                      </div>
                      )
                    })}
              </div>
              <p className="card-text text-primary-emphasis fs-3 fw-semibold">
                Price:
                 </p>
              <p className="card-text text-primary-emphasis fs-5 fw-normal">
                Standerd Pass:  <span className="card-text text-info-emphasis fs-5" >₹{meetDetails.price}</span>
                 </p>
            
              </div>
          </div>
          </div> 
          </div> 
          </div> 
        )
      }
    </div>
      </div>
      </main>
      </>
  )
}

export default MeetDetails
