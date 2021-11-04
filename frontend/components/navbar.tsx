import type { NextPage } from 'next'
import Link from "next/link"
import Script from "next/script"
import { isLogin } from "../utils"
import 'bootstrap/dist/css/bootstrap.css'

const Navbar: NextPage = () => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"/>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">LICENCES APP</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
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
        </div>
      </nav>
    </>
  )
}

export default Navbar