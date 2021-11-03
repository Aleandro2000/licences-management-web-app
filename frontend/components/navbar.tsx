import type { NextPage } from 'next'
import { isLogin } from "../utils"

const Navbar: NextPage = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <span className="navbar-brand">LICENCE APP</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ms-auto text-center">
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          {
              !isLogin() ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Register</a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="#">Dashboard</a>
                </li>
              )
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar