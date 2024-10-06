import bookingImage from '../images/cover/booking.jpg'
export default function Booking() {
    return (
        <div>
            <div className='
                shadow-md relative m-auto 
                my-10 w-[80%] h-[87vh] bg-cover
                bg-center ' 
                style={{backgroundImage: `url(${bookingImage})`}}
            >
            <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
            <div className="relative z-10 text-white p-10">

                {/* all booking form */}
                <form className=' bg-[#1E1E1EF2] p-10 max-w-[55rem]' action="">
                    <div className='text-center'>
                        <h1 className='font-syne text-[36px] line'>Makeup Appointment Form</h1>
                        <p className='text-[15px] mt-2'>please fill the form below, it will only take 3 minutes</p>
                    </div>
                    
                    <div className='grid grid-cols-2 gap-5  p-10' >
                        <input 
                        className=' font-montserrat p-3 text-white rounded-[5px] bg-[#1E1E1EF2] border border-[#C4C4C4] placeholder:text-white'
                        type='text'
                        placeholder='Your Name'

                        />
                        <input 
                        className='font-montserrat p-3 text-white rounded-[5px] bg-[#1E1E1EF2] border border-white-500 placeholder:text-white'
                        type='text'
                        placeholder='email'
                        />
                        <input 
                        className='font-montserrat p-3 text-white rounded-[5px] bg-[#1E1E1EF2] border border-white-500 placeholder:text-white'
                        type='email'
                        placeholder='Phone Number'
                        />
                        <select 
                        className='font-montserrat cursor-pointer rounded-[5px] p-3 text-white border border-white-500 bg-[#1E1E1EF2] placeholder:text-white'
                        name="" id="">
                        <option value="">Hair Style</option>
                        <option value="">Sleek and Straight</option>
                        <option value="">The Pixie Cut</option>
                        <option value="">Bangs</option>
                        <option value="">Bob Cut</option>
                        <option value="">Braid</option>
                        </select>

                        <input 
                        className='font-montserrat p-3 text-white rounded-[5px] bg-[#1E1E1EF2] border border-white-500 placeholder:text-white'
                        type='email'
                        placeholder='calender'
                        />

                        <select 
                        className='font-montserrat cursor-pointer p-3 rounded-[5px] text-white  border border-white-500 bg-[#1E1E1EF2] placeholder:text-white' name="" id="">
                        <option value="">Hair Color</option>
                        <option value="">Sleek and Straight</option>
                        <option value="">The Pixie Cut</option>
                        <option value="">Bangs</option>
                        <option value="">Bob Cut</option>
                        <option value="">Braid</option>
                        </select>
                    </div>
                    <textarea
                    
                    placeholder='Any Notes For Us'
                    className='font-montserrat rounded-[5px] resize-none w-[45rem] h-[8rem] border border-white-500 ml-10 p-3 text-white  bg-[#1E1E1EF2] border-1px-white placeholder:text-white' >
                    </textarea>
                    <button className='w-[200px] h-[60px] gap-[10px]
                    rounded-[2px] py-[10px] px-[20px]
                    font-montserrat text-[18px] bg-white text-[#1E1E1E]' >Book Now</button>
                </form>
            </div>
            </div>

        </div>
    )
}
