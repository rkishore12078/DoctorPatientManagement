import { useState } from "react";
import '../../Css/PatientDoctor.css'

function PatientDoctor(props)
{
    const[doctor,setDoctor]=useState(props.path);


    return(
        <tr className="tbl-row">
            <td className="tbl-col">{doctor.name}</td>
            <td className="tbl-col">{doctor.age}</td>
            <td className="tbl-col">{doctor.gender}</td>
            <td className="tbl-col">{doctor.phone}</td>
            <td className="tbl-col">{doctor.specialization}</td>
            <td className="tbl-col">{doctor.qualification}</td>
            <td className="tbl-col">{doctor.yearsOfExperience}</td>
        </tr>
    )
}

export default PatientDoctor;