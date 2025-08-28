import Layout from '../../Components/Layout'
import Layout1 from '../../Components/Layout1'
import Dashboard from '../Dashboard'
import UpcomingMovies from '../UpcomingMovies'
import ViewMovie from "../viewmovie.js"
import "./Home.css"

function Home() {
  return (
    <>
        <Layout>
        <Layout1/>
        <Dashboard/>
        <UpcomingMovies/>
        </Layout>
        
    </>
  )
}

export default Home