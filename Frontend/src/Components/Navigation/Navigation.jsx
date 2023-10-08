import React, { useState } from 'react'
import styles from './navigation.module.css'
import Options from './Options'
import Donate from './Donate'
import { useAuth } from '../../Contexts/AuthContext'
import img from '../../images/logowecare.png'
import img1 from '../../images/Loader.png'

function Navigation() {
    const {user, isLoading} = useAuth();
    console.log(user)
    const [optionsOpen, setOptionsOpen] = useState(false)
    const [donateOpen, setDonateOpen] = useState(false)
    const [loaderOpen, setLoaderOpen] = useState(true)
    const [blinkerOpen, setBlinkerOpen] = useState(true)

    const toggleOptions = (e) => {
        setOptionsOpen(e)
      }

    const toggleDonate = (e) => {
        setDonateOpen(e)
    }
    if (isLoading){
        return "Loading..."
    }
      
  return (
    <div className={styles.navDiv} style={{height:"68px", borderBottom:"solid 1px #212225", display:"flex", justifyContent:"space-between"}}>
        <div className={styles.btn} style={{display:"flex", alignItems:"center"}}>
            <img src={img} style={{width:"50px", height:"50px", marginLeft:"10px", borderRadius:"50%", backgroundColor:"#121316", cursor:"pointer", border:"solid 1px #565656"}} onClick={()=>{setOptionsOpen(true)}} alt=""></img>
            {blinkerOpen === true && !loaderOpen &&<div onLoad={()=>{
                setTimeout(() => {
                    setBlinkerOpen(false)
                }
                , 2000);
            }} className={styles.typewriter}>
            <h1 style={{color:"white", marginLeft:"10px"}} >WeCare</h1>
            </div>}
            {blinkerOpen === false && !loaderOpen &&<div>
            <h1 style={{color:"white", marginLeft:"10px"}} >WeCare</h1>
            </div>}
        </div>
        
        <div className={styles.btn} style={{ display:"flex", alignItems:"center"}}>
            <div style={{color:"#fff", marginRight:"10px", fontSize:"14px"}}>{"Hello, "+ user?.name+"!"}</div>
{         user?.isOrganization &&   <button style={{padding:"9px 14px", margin:"0 10px", backgroundColor:"#3498db", outline:"none", border:"none", color:"#fff", fontSize:"12px", fontWeight:"600"}} onClick={()=>{setDonateOpen(true)}}>Post New Donation</button>
}        </div>
       
        {optionsOpen && <div style={{width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.4)", position:"absolute", zIndex:"998", top:"0", left:"0", transition:"all 0.25s ease-in-out", overflow:"none"}}>
            <Options setoptionsOpen={toggleOptions} />
        </div>}
        { donateOpen && <div style={{width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.4)", position:"absolute", zIndex:"998", top:"0", left:"0", transition:"all 0.25s ease-in-out", overflow:"none", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Donate setoptionsOpen={toggleDonate} />
        </div>}

        { loaderOpen && <div onLoad={()=>{
            // After 2 seconds, set the show value to false
            // setLoaderOpen(false);
            setTimeout(() => {
                setLoaderOpen(false)
            }, 2000);
        }} style={{width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.8)", position:"absolute", zIndex:"998", top:"0", left:"0", transition:"all 0.25s ease-in-out", overflow:"none", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <img className={styles.imgDiv} src={img} style={{width:"250px", height:"250px"}} alt=""></img>
        </div>}
    </div>
  )
}

export default Navigation