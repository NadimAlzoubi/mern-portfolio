import React, {useState, useEffect} from 'react'
import axios from 'axios'
function Tit() {
    const [aboutInfo, setAboutInfo] = useState([])
    useEffect(()=>{
        axios.get(`https://nadim.onrender.com/aboutData`)
        .then((result)=>{
          setAboutInfo(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
  return (
    <React.Fragment>
        {
            aboutInfo.map((info) => {
              document.title = info.firstName
            })
        }
    </React.Fragment>
  )  
}

export default Tit;