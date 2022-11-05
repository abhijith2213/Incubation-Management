import { createContext,useState } from "react";
import { useCookies } from "react-cookie";


export const UserContext = createContext('')

function User({children})

{

    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'))


    const [userDetails,setUserDetails] = useState(user)
    const [cookies,setCookie,removeCookie] = useCookies(null);
    const [adminDetails,setAdminDetails] = useState(admin)

    return(
        <UserContext.Provider value={{userDetails,setUserDetails,adminDetails,setAdminDetails,cookies,setCookie,removeCookie}}>
          {children}
        </UserContext.Provider>
    )
}

export default User;