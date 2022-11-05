import React ,{ useState, useContext } from 'react'
import control from '../../../assets/control.png'
import logo from '../../../assets/logo.png'
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from '../../../Context/UserContext'
import {BsFillChatRightQuoteFill, BsAwardFill ,BsCalendarX, BsCalculatorFill, BsCardText, BsClipboardData} from 'react-icons/bs'
import {confirmAlert} from 'react-confirm-alert'
function Sidebar() {
  

    const { setAdminDetails, removeCookie } =useContext(UserContext)
    const navigate = useNavigate()
    const [open, setOpen] = useState(true);

  const Menus = [
    { Dashboard: "Dashboard", src: <BsFillChatRightQuoteFill/> },
    { Approved: "Approved", src: <BsAwardFill/> },
    { Rejected: "Rejected", src: <BsCalendarX/> },
    { Booking_Slots : "Booking Slots ", src: <BsCalculatorFill/> },
    { Create_Slot: "Create Slot", src: <BsCardText/> },
    { Progress_Status: "Progress Status", src: <BsClipboardData/> },
    
  ];

  const logout = () => {
    confirmAlert({
      title: 'Reject Application',
      message: 'Are you sure to Reject this Application.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem('admin')
            setAdminDetails(null);
            removeCookie("AdminToken");
            navigate('/adminLogin');
    }
  },
  {
    label: 'No',
   
  }
]
    });
    
  }

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-purple-300 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-purple-400
            rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Incubation
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-700 text-l font-medium items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}>
              {Menu.src}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
                    <Link to ='/admin'>{Menu.Dashboard}</Link>
                    <Link to ='/admin/approved'>{Menu.Approved}</Link>
                    <Link to ='/admin/rejected'>{Menu.Rejected}</Link>
                    <Link to ='/admin/book_slot'>{Menu.Booking_Slots}</Link>
                    <Link to ='/admin/create_slot'>{Menu.Create_Slot}</Link>
                    <Link to ='/admin/progress'>{Menu. Progress_Status}</Link>
              </span>
            </li>
          ))}
        </ul>
       
        <button className='rounded-md bg-red-500 w-20 h-fit m-4 text-white p-2 hover:bg-red-700' onClick={logout}>Log out</button>
      </div>
      
     
     
    </div>
  )

}

export default Sidebar