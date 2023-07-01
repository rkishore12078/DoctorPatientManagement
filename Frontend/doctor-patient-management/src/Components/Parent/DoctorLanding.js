import { useState } from "react";
import axios from 'axios';
import Doctor from "../Child/Doctor";
import '../../Css/DoctorLanding.css';

function DoctorLanding()
{

    const[doctors,setDoctors]=useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  getAllDoctors()
        return () => { ignore = true; }
        },[]);

    var getAllDoctors=()=>
    {
        axios.get('')
        .then( async (response) => 
        {
            setDoctors(await response.data);
        })
        .catch(error =>
        {
            setError(error.message);
        });
    }

    if (error) {
        return <div>Error: {error}</div>;
      }


    return(
        <div>
            <div className="GetAll">
                {
                    doctors.map((doctor,index)=>{
                        return(<Doctor key={index} path={doctor}/>)
                    })
                }
            </div>
        </div>
    )
}
export default DoctorLanding;