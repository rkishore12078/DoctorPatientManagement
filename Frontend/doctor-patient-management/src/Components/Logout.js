import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout()
{

    var navigate=useNavigate();

    useEffect(() => {
        let ignore = false;

        if (!ignore) Logout()
        return () => { ignore = true; }
    }, []);

    var Logout=()=>
    {
        localStorage.clear("token");
        localStorage.clear("role");
        localStorage.clear("userId");
        navigate('/login');
    }

    return(
        <div>

        </div>
    )
}

export default Logout;