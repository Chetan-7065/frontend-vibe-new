import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"


export default function Header () {
const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return(
    <header  className="text-center text-light" >
      <div className="container text-center">
      <div className="navbar justify-content-center">
      <NavLink className="text-decoration-none display-2 fw-semibold text-primary-emphasis"  to="/" >Vibe</NavLink>
      </div>
      <div className="container py-3 ">
      <form onSubmit={handleSubmit} className="d-flex">
        <div className="input-group">
        <input className="form-control border-success rounded-start-4" placeholder="Search by title and tags" onChange={(event) => setMessage(event.target.value)} type="search"  />
       <Link className="btn btn-outline-success bi bi-search rounded-end-4" type="submit" to={`/${message}`}></Link>
        </div>
      </form>
      </div>
      </div>
    </header>
  )
}