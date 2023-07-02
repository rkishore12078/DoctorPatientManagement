import { useState } from "react";

function PatientDoctor(props)
{
    const[doctor,setDoctor]=useState(props.path);


    return(
        <tr>
            <td>{doctor.name}</td>
            <td>{doctor.age}</td>
            <td>{doctor.gender}</td>
            <td>{doctor.phone}</td>
            <td>{doctor.specialization}</td>
            <td>{doctor.qualification}</td>
            <td>{doctor.yearsOfExperience}</td>
        </tr>
    )
}

export default PatientDoctor;