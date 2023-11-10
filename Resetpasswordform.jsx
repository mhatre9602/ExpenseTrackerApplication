import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Resetpasswordform(){
    const tok = localStorage.getItem("token")
    const[password,setPassword] = useState([])
    const location = window.location.pathname
    const [pathName, setPathName] = useState(null) ;

useEffect(() => {
    if(location) {
        let tmp = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") , window.location.pathname.length) ;
        setPathName(tmp) ;
    }
}, [location])

    function updatePassword(){
        console.log(window.location.pathname)
        let data = JSON.stringify({
            password
          });

        let config = {
            method: "patch",
            maxBodyLength: Infinity,
            url: "http://localhost:3001/user/password/updatepassword"+pathName,
            headers: {
                "Authorization":tok,
              "Content-Type": "application/json",
            },
            data: data,
          };
      
          axios
            .request(config)
            .then((response) => {
              alert(response.data.message);
            })
            .catch((error) => {
              console.log(error);
            });
    }
    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="login-form">
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         
          <div className="col-12">
            <button className="btn btn-primary" onClick={updatePassword}>
              Reset Password
            </button>
          </div>
        </form>
      </div>
    );
}