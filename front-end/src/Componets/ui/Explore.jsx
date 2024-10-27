// import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    image:
      "https://image-marketing.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/02/04232637/50-Simple-Bridal-Hairstyles-For-Curly-Hair-2.jpg",
    type: "Hair Salon Heaven",
  },
  {
    image:
      "https://i.pinimg.com/474x/1a/5d/73/1a5d731440f3cfe57f79583094d9791c.jpg",
    type: "Deep Cleaning Facial",
  },
  {
    image:
      "https://debonairafrik.com/wp-content/uploads/2022/05/haircut-23-1.jpg",
    type: "SkinCare Salon Heaven",
  },
];

export default function Explore() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left mb-4 md:mb-0 max-w-xl">
          Enhance Your Inner Radiance at Our
          <span className="text-orange-500"> Beauty Sanctuary</span> and Let
          Your True Beauty Shine
        </h2>
        <button className="bg-black text-white rounded-lg px-4 py-2">
          Explore All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={service.image}
              alt={`${service.type} service`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col">
              <span className="text-lg font-semibold text-gray-700 mb-2">
                {service.type}
              </span>
              <div className="flex items-center text-primary cursor-pointer hover:underline text-orange-500">
                <span className="mr-1">Explore</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
