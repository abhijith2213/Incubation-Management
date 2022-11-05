import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function BookingSlots() {

    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [applicationList, setApplicationList] = useState([]);
    const [sloatBooking, setSloatBooking] = useState([]);
    const Navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState({id: '',index: ''});

    useEffect(() => {
        let userData = localStorage.getItem('admin')
        if (userData) {
            Navigate('/admin/book_slot')
        } else Navigate("/adminLogin")
        axios.get("http://localhost:4000/admin/slots").then((response => {
            if (response) setSloatBooking(response.data)
            console.log("kjghkja");
            console.log(response.data);

        })).catch(error => console.log(error))

        axios.get("http://localhost:4000/admin/approved").then((response => {
            if (response) setApplicationList(response.data)
            console.log(response.data);
        })).catch(error => console.log(error))
    }, [Navigate, reducerValue]);

    const fullDetails = (slotNo) => {
        setSelected({
            ...selected,
            index: slotNo
        })
        setShowModal(true)
    }
    const bookSloat = ()=>{
        console.log('in slot book function');
        axios.get(`http://localhost:4000/admin/slotBooking?slotId=${selected.index}&companyId=${selected.id}`).then((response => {
            forceUpdate()
            setShowModal(false)
        })).catch(error => console.log(error))
        
    }
  return (
    <div className='w-screen'>
               <h1 className='text-purple-500 font-bold text-3xl p-7 text-center'>Book Slots</h1>
                <div className='ml-7'>
                    <div className='flex'>
                    <p className='p-4 w-4 mb-3 bg-red-300'></p>
                    <p className='ml-3'>Not Available</p>
                    </div>
                    <div className='flex'>
                    <p className='p-4 w-4 bg-green-300'></p>
                    <p className='ml-3'>Available</p>
                    </div>
                </div>
                   <div className='grid grid-cols-5 m-7 gap-2 justify-items-center'>

                   {
                    sloatBooking.map((item)=>{
                        return(
                            <div className={` p-10 w-25 h-25 cursor-pointer  rounded-xl ${item.status ? "hover:bg-red-500 bg-red-300" : "bg-green-300 hover:bg-green-500"}`} onClick={() => item.status ? alert("This slot is Already Booked"): fullDetails(item.slotNo)}>{item.slotNo}</div>

                                )
                        })
                     }
        
                   </div>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full min-w-[400px] bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Choose Company
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex justify-center">
                                    <select label="Select Version border-solid border-2 border-gray " onChange={(e) => { setSelected({
                                        ...selected,
                                        id: e.target.value,
                                    }) }}>
                                        <option hidden selected>Select</option>
                                        {
                                            applicationList.map((forms, index)=>{
                                                return(
                                                    <option value={forms._id} >{forms.company_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)} >
                                        Close
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => selected.id ? bookSloat() : ''}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

          

    </div>
  )
}

export default BookingSlots