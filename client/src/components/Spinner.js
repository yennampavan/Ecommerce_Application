import React, { useEffect, useState } from 'react';
import './Spinner.css';
import { useNavigate , useLocation} from 'react-router-dom';

const Spinner = ({path='login'}) => {
    const [count,setCount]=useState(3);
    const navigate=useNavigate();
    const location = useLocation();


    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>--prevValue)
        },1000)
        
        if(count===0){
          navigate(`/${path}`,{
            state:location.pathname, });
            window.location.reload();
        }
        
        
        return ()=>clearInterval(interval);
    },[count,navigate,location])
    // window.location.reload()
  return (
    <div className="spinner-overlay">
        <h1>Redirecting to you in {count} seconds.....</h1><br />
      <div className="custom-spinner"></div>
    </div>
  );
};

export default Spinner;
