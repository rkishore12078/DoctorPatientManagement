import { Navigate } from "react-router-dom";

function AdminProtected({token,children})
{
    if(token!=null)
        return children;
    return <Navigate to='/'/>
}

export default AdminProtected;