import { ArrowRight } from "lucide-react";

const services = [
  {
    image:
      "https://media6.ppl-media.com/mediafiles/blogs/shutterstock_1717814998_2adffb2fe5.jpg",
    type: "Makeup",
    price: "500 ETB",
  },
  {
    image:
      "https://images.everydayhealth.com/images/skin-beauty/what-are-natural-skin-care-products-alt-1440x810.jpg",
    type: "Skin Care",
    price: "700 ETB",
  },
  {
    image:
      "https://www.glamnails.in/wp-content/uploads/2024/04/Feature-Image-1024x585.jpg",
    type: "Nail Art",
    price: "600 ETB",
  },
  {
    image: "https://www.edubrain.in/image/Hair-styling.jpg",
    type: "Hair Style",
    price: "300 ETB",
  },
  {
    image:
      "https://content.latest-hairstyles.com/wp-content/uploads/pink-hair-color-ideas-1200x900.jpg",
    type: "Hair Coloring",
    price: "400 ETB",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnFlnJJtXOM7BFtbGTzTMVV2Wzm8nUv7-Tw&s",
    type: "Cut & Style",
    price: "800 ETB",
  },
];

export default function ServiceGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Services We Provide
        </h2>
        <button className="bg-black text-white rounded-lg px-4 py-2">
          Explore More
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
            <div className="p-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">
                {service.type}
              </span>
              <span className="text-lg font-bold text-primary">
                {service.price}
              </span>
            </div>
            <div className="flex items-center text-primary cursor-pointer hover:underline text-orange-500 px-4 pb-4">
              <button className="mr-1">Book Now</button>
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
