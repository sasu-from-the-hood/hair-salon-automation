import bookingImage from '../images/cover/booking.jpg'
export default function Booking() {
    return (
        <div>
            <div className='
                shadow-md relative m-auto 
                my-10 w-[80%] h-[80vh] bg-cover
                bg-center ' 
                style={{backgroundImage: `url(${bookingImage})`}}
            >
            <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
            <div className="relative z-10 text-white p-10">
            </div>
            </div>
        </div>
    )
}
