import React,{useEffect} from 'react'
import Layout from '../components/Layout/Layout'

const Home = () => {
 
  useEffect(()=> {
    console.log("hiithere")
  },[]);
  return ( 
    <Layout>
      <>
        <h1 className='text-center'>Home page</h1>
      </>
    </Layout> 
  )
}

export default Home