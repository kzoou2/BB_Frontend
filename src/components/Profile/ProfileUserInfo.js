// import { useEffect, useState } from "react";
// import { PC, Mobile } from '../components/Responsive';
// import axios from "axios";

// function ProfilUserInfo (){
//     const [user, setUser] = useState("");
//     const [formData, setFormData] = useState({
//         email:"",
//         userName:"",
//         nickName:"",
//         imgSrc:"",
//         gender:"",
//         birth:"",
//     })
    
//     useEffect (()=>{
//         axios.get(`https://34ae-39-124-165-135.ngrok-free.app/api/v1/users/info`)
//         .then(response => {
//             setFormData(response.data);
//         })
//         .catch
//     })
//     return(
//         <div>
//             <PC>

//             </PC>
//             <Mobile></Mobile>
//         </div>

//     );
// }

// export default ProfilUserInfo;