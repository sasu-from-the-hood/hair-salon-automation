import { useState } from 'react';
import bookingImage from '../images/cover/booking.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form';
// eslint-disable-next-line react/prop-types
function CustomInput({ value, onClick }) {
    return (
        <div className=''>
            <input
            placeholder='Choose Your Date'
            className='max-h-9 w-[21rem] sm:w-[18.5rem] md:w-[23rem] lg:w-[35rem] 2xl:w-[33.5rem] text-[12px] 
            font-montserrat p-6 rounded-[5px]
            bg-[#1E1E1EF2] border border-white-500
            placeholder:text-white relative' 
            type="text" 
            value={value} 
            onClick={onClick} 
            readOnly/>
            <div>
                <span className='cursor-pointer absolute top-4 right-4'><FaCalendarAlt/></span>
            </div>
        </div>
    );
}
export default function Booking() {
    const[selectDate, setSelectDate] = useState(null)
    const {register, handleSubmit, setValue, reset} = useForm();
    const minDate = new Date('2024-10-16')//this dates are dynamic so you can fethc from the database
    const maxDate = new Date('2024-10-30')//this dates are dynamic so you can fethc from the database
    const HandleBookingFormSubmit = (getAllFormData) => {
        console.log(getAllFormData);
        reset()
    }

    function handleDatePicker(date){
        setSelectDate(date);
        setValue("date", date, { shouldValidate: true, shouldDirty: true });     }
    return (
        <div>
            <div className='
                shadow-md relative m-auto 
                w-[100%] h-[100vh] bg-cover
                bg-center'
                style={{ backgroundImage: `url(${bookingImage})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-white p-10">
                    <div className=' bg-[#1E1E1EF2] w-[100%] p-5 absolute top-0 pb-14 left-0 2xl:w-[70%] 2xl:left-[15%] 2xl:px-10 2xl:top-10' action="">
                        <div className='text-center'>
                            <h1 className='font-syne text-[27px]'>Makeup Appointment Form</h1>
                            <p className='text-[12px] mt-2 pb-12'>please fill the form below, it will only take 3 minutes</p>
                        </div>
                        <form onSubmit={handleSubmit(HandleBookingFormSubmit)}>
                            <div className='grid gap-10 grid-cols-1 sm:grid-cols-2'>
                            <input
                                className=' max-h-9 text-[12px] font-montserrat p-6 text-white rounded-[5px] bg-[#1E1E1EF2] border border-[#C4C4C4] placeholder:text-white'
                                type='text'
                                placeholder='Your Name'
                                {...register("name")}
                            />
                            <input
                                className=' max-h-9 text-[12px] font-montserrat p-6 text-white rounded-[5px] bg-[#1E1E1EF2] border border-[#C4C4C4] placeholder:text-white'
                                type='text'
                                placeholder='Choose Your time'
                                {...register("time")}
                            />
                            </div>
                            
                            {/* second div */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 mt-6'>
                                <input
                                    className='max-h-9 text-[12px] font-montserrat p-6   
                                    text-whiterounded-[5px] bg-[#1E1E1EF2] border border-white-500 placeholder:text-white'type='text'
                                    placeholder='Phone Number'
                                    {...register("phoneNumber")}
                                />
                                <select
                                    name="style"
                                    className='h-12 text-[12px] font-montserrat cursor-pointer rounded-[5px] pl-6 text-white border border-white-500 bg-[#1E1E1EF2] placeholder:text-white'
                                    {...register("hairStyle", {required: true})}
                                    id="">
                                    <option className='bg-white text-black' value="">Hair Style</option>
                                    <option className='bg-white text-black' value="sleek-and-straight">Sleek and Straight</option>
                                    <option className='bg-white text-black' value="the-pixie-cut">The Pixie Cut</option>
                                    <option className='bg-white text-black' value="bangs">Bangs</option>
                                    <option className='bg-white text-black' value="bob-cut">Bob Cut</option>
                                    <option className='bg-white text-black' value="braid">Braid</option>
                                    
                                </select>
                            </div>
                            
                            {/* third div */}
                            <div className='grid grid-cols-1 sm:grid-cols-2  gap-10 mt-6'>
                                <div>
                                    <label>
                                        <DatePicker
                                            selected={selectDate}
                                            onChange={handleDatePicker}
                                            dateFormat="dd/MM/yyyy"
                                            minDate={minDate}
                                            maxDate={maxDate}
                                            placeholderText='enter your appointment date'
                                            customInput={<CustomInput/>}
                                        />
                                    </label>
                                </div>
                                <select
                                    {...register("hairColor", {
                                        required: true
                                    })}
                                    className='h-12 text-[12px] font-montserrat cursor-pointer pl-6 rounded-[5px] text-white  border border-white-500 bg-[#1E1E1EF2] placeholder:text-white'>
                                    <option className='bg-white text-black' value="none">Hair Color</option>
                                    <option className='bg-white text-black' value="sleekandstraight">Sleek and Straight</option>
                                    <option className='bg-white text-black' value="thepixiecut">The Pixie Cut</option>
                                    <option className='bg-white text-black' value="bangs">Bangs</option>
                                    <option className='bg-white text-black' value="bobcut">Bob Cut</option>
                                    <option className='bg-white text-black' value="Braid">Braid</option>
                                </select>
                            </div>
                        <textarea
                            {...register("notes", {
                                required: false
                            })}
                            placeholder='Any Notes For Us'
                            className='w-[21rem] h-[7rem] sm:w-[39rem] md:w-[48.8rem] lg:w-[65rem] 2xl:h-[10rem] 2xl:w-[70rem] text-[12px] mt-6 font-montserrat rounded-[5px] resize-none border border-white-500 p-6 text-white  bg-[#1E1E1EF2] border-1px-white placeholder:text-white' >
                        </textarea>
                        
                        <button className='
                            rounded-[2px] py-4 px-8 mt-6
                            font-montserrat font-semibold 
                            text-[12px] hover:bg-blue-500 transition duration-300 ease-in-out bg-white text-[#1E1E1E] 
                            ' >Book Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}