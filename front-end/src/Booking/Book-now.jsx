import { useState } from 'react';
import bookingImage from '../images/cover/booking.jpg';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form';
function CustomInput({ value, onClick }) {
    return (
        <div className='flex'>
            <input 
            placeholder='Choose Your Date'
            className=' max-h-9 w-[23rem] text-[12px] 
            font-montserrat p-3 text-white rounded-[5px]
            bg-[#1E1E1EF2] border border-white-500
            placeholder:text-white relative'  type="text" value={value} onClick={onClick} />
            <div>
                <span className=' cursor-pointer absolute left-[93%] top-2'><FaCalendarAlt/></span>
            </div>
        </div>
    );
}
export default function Booking() {
    const [selectedDate, setDate] = useState(null);
    const {register, handleSubmit, formState: {errors}, clearErrors, setValue} = useForm()
    function BookingFormHandler(getAllBookingData){
        console.log(getAllBookingData);
    }
    const handleDateChange = (date) => {
        setDate(date);
        setValue('date', date);
        clearErrors('date');
    };
    return (
        <div>
            <div className='
                shadow-md relative m-auto 
                my-10 w-[80%] h-[87vh] bg-cover
                bg-center '
                style={{ backgroundImage: `url(${bookingImage})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
                <div className="relative z-10 text-white p-10">

                    {/* all booking form */}
                    <div className=' bg-[#1E1E1EF2] p-10 max-w-[55rem] absolute left-28 top-8 ' action="">
                        <div className='text-center'>
                            <h1 className='font-syne text-[28px] line'>Makeup Appointment Form</h1>
                            <p className='text-[11px] mt-2 pb-6'>please fill the form below, it will only take 3 minutes</p>
                        </div>
                        <form onSubmit={handleSubmit(BookingFormHandler)} >
                            <div className='grid grid-cols-2 gap-10'>
                            <input
                                className=' max-h-9 text-[12px] font-montserrat p-3 text-white rounded-[5px] bg-[#1E1E1EF2] border border-[#C4C4C4] placeholder:text-white'
                                type='text'
                                placeholder='Your Name'
                                {...register("name", {
                                    required: true
                                })}
                            />
                            <input
                                className=' max-h-9 text-[12px] font-montserrat p-3 text-white rounded-[5px] bg-[#1E1E1EF2] border border-[#C4C4C4] placeholder:text-white'
                                type='text'
                                placeholder='Choose Your time'
                                {...register("time", {
                                    required: true
                                })}
                            />
                            </div>
                            <div className='grid grid-cols-2 gap-16 py-2'>
                            {errors.name && errors.name.type === "required"? 
                                <small className=' text-[10px] text-red-600'>name is required</small>
                            :null}
                            {errors.time && errors.time.type === "required"? 
                                <small className='fixed text-[10px] text-red-600 left-[52%]'>time is required</small>
                            :null}
                            </div>

                            {/* second div */}
                            <div className='grid grid-cols-2 gap-10 mt-2'>
                                <input
                                    className='max-h-9 text-[12px] font-montserrat p-3   
                                    text-whiterounded-[5px] bg-[#1E1E1EF2] border border-white-500 placeholder:text-white'type='text'
                                    placeholder='Phone Number'
                                    {...register("number", {
                                        required: true,
                                        minLength: 10
                                    })}
                                />
                                <select
                                    {...register("style", {
                                        required: true
                                    })}
                                    onChange={(e) => {
                                        clearErrors('style');
                                        setValue('style', e.target.value);
                                    }}
                                    name="style"
                                    className='max-h-9 text-[12px] font-montserrat cursor-pointer rounded-[5px] p-3 text-white border border-white-500 bg-[#1E1E1EF2] placeholder:text-white'
                                    id="">
                                    <option value="">Hair Style</option>
                                    <option value="">Sleek and Straight</option>
                                    <option value="">The Pixie Cut</option>
                                    <option value="">Bangs</option>
                                    <option value="">Bob Cut</option>
                                    <option value="">Braid</option>
                                    
                                </select>
                            </div>
                            <div className='grid grid-cols-2 gap-16 py-2'>
                                <div>
                                    {errors.number && errors.number.type === "required"?
                                        <small className='text-[10px] text-red-600'>phone number is required</small>
                                    :null}
                                    {errors.number && errors.number.type === "minLength" ?
                                        <small className='text-[10px] text-red-600'>phone number is at least 10 character</small>
                                    :null}
                                </div>
                                <div>
                                    {errors.style && errors.style.type === "required"? 
                                        <small className='text-[10px] text-red-600'>hair-Style is required</small>
                                    :null}
                                </div>
                            </div>
                            {/* third div */}
                            <div className='grid grid-cols-2 gap-10'>
                                <div className=''>
                                    <label className=''>
                                        <Datepicker placeholderText='Choose Your Date' 
                                        selected={selectedDate} 
                                        customInput={<CustomInput />} 
                                        onChange={handleDateChange}                                        {...register("date", {
                                    })}
                                        />
                                    </label>
                                </div>
                                <select
                                    {...register("hairColor", {
                                        required: true
                                    })}
                                    onChange={(e) => {
                                        clearErrors('hairColor');
                                        setValue('style', e.target.value);
                                    }}
                                    className=' max-h-9 text-[12px] font-montserrat cursor-pointer p-3 rounded-[5px] text-white  border border-white-500 bg-[#1E1E1EF2] placeholder:text-white'><option value="">Hair Color</option>
                                    <option value="">Sleek and Straight</option>
                                    <option value="">The Pixie Cut</option>
                                    <option value="">Bangs</option>
                                    <option value="">Bob Cut</option>
                                    <option value="">Braid</option>
                                </select>
                            </div>
                            <div className='grid grid-cols-2 gap-16 py-2'>
                            {errors.date && errors.date.type === "required"? 
                                    <small className='text-[10px] text-red-600'>Date is required</small>
                                :null
                            }
                            {errors.hairColor && errors.hairColor.type === "required"? 
                                    <small className='text-[10px] text-red-600'>hair-color is required</small>
                                :null
                            }
                            </div>
                        <textarea
                            placeholder='Any Notes For Us'
                            className='text-[12px]  font-montserrat rounded-[5px] resize-none w-[45rem] h-[7rem] border border-white-500 ml-10 p-3 text-white  bg-[#1E1E1EF2] border-1px-white placeholder:text-white' >
                        </textarea>
                        
                        <button type='submit' className='
                            rounded-[2px] py-2 px-6
                            font-montserrat font-semibold 
                            text-[12px] bg-white text-[#1E1E1E] 
                            relative left-10 top-4' >Book Now</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}