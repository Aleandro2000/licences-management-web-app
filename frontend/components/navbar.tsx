import type { NextPage } from 'next'
import Link from "next/link"
import { isLogin } from "../utils"

const Navbar: NextPage = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <span className="navbar-brand">LICENCE APP</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="true" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ms-auto text-center">
          <Link href="/" passHref={true}>
            <li className="nav-item nav-link" style={{cursor: "pointer"}}>
              Home
            </li>
          </Link>
          {
              !isLogin() ? (
                <>
                  <Link href="/login" passHref={true}>
                    <li className="nav-item nav-link" style={{cursor: "pointer"}}>
                      Login
                    </li>
                  </Link>
                  <Link href="/login" passHref={true}>
                    <li className="nav-item nav-link" style={{cursor: "pointer"}}>
                      Register
                    </li>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard" passHref={true}>
                  <li className="nav-item nav-link" style={{cursor: "pointer"}}>
                    Dashboard
                  </li>
                </Link>
              )
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar