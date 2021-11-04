import type { NextPage } from 'next'
import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from "../components/navbar"

const Home: NextPage = () => {
  return (
    <>
      <Head>
          <title>
              LICENCES APP
          </title>
      </Head>
      <Navbar/>
    </>
  )
}

export default Home