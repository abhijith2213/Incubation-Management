import React, {useState} from 'react'
import axios from 'axios'

function CreateSlot() {
    const initialValues = {slotCode:'',slotNo:'',status:''}
    const [formValues,setFormvalues] = useState(initialValues)
    const [errorMsg,setErrroMsg] = useState('')

    const handleChange =(e)=>{
        const {name,value}=e.target
        setFormvalues({...formValues, [name]:value})
    }

    const handleSubmit =(e)=>{
        console.log('hii ha');
        console.log(formValues,'kkk');
        e.preventDefault()
        if(!formValues.slotCode){
            setErrroMsg('SlotCode required')
        }else if(!formValues.slotNo){
            setErrroMsg('Slot No. required')
        }else{
            axios.post('http://localhost:4000/admin/create_slot',{...formValues}).then((response)=>{
                console.log(response.data);
                alert('Slot Added Successfully')
                setFormvalues(initialValues)
            }).catch((err)=>
            {
                console.log(err.response,'tttttt');
                alert(err.response.data)
                setFormvalues(initialValues)
            })
        }
    }
  return (
    <>
    <div className='border  flex flex-col justify-center items-center h-screen w-screen '>
    <form onSubmit={handleSubmit}>

        <h2 className='mb-9 text-2xl font-semibold'>Create Slot</h2>
        <div class="mb-6">
        {errorMsg && <p className=" p-2 mb-4 bg-red-200 text-sm text-red-700  rounded-lg  dark:text-red-800" role="alert">{errorMsg}</p>}

        <label htmlFor="username-success" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Slot Code</label>
        <input type="text" name='slotCode' value={formValues.slotCode} onChange={handleChange} id="username-success" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Slot Code.."/>
        </div>
        <div>
        <label htmlFor="username-error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">SlotNo</label>
        <input type="text" name='slotNo' value={formValues.slotNo} onChange={handleChange}  id="username-error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" placeholder="Slot No."/>
        </div>
        <button  className='w-40 my-5 py-2 bg-blue-700 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SUBMIT</button>
    </form>
        </div>
    </>
  )
}

export default CreateSlot