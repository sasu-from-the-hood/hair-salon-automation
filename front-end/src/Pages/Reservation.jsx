import { useState } from "react";
import { XCircle } from "lucide-react";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    phone: "",
    hairStyle: "",
    date: "",
    hairColor: "",
    note: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  const handleDelete = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: "",
    }));
  };

  const renderSelectedItems = () => {
    const items = [];
    if (formData.hairStyle)
      items.push({ field: "hairStyle", value: formData.hairStyle });
    if (formData.hairColor)
      items.push({ field: "hairColor", value: formData.hairColor });

    return items.map((item, index) => (
      <span
        key={index}
        className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
      >
        {item.value}
        <button
          type="button"
          onClick={() => handleDelete(item.field)}
          className="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900"
          aria-label={`Remove ${item.value}`}
        >
          <XCircle size={14} />
        </button>
      </span>
    ));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://media6.ppl-media.com/mediafiles/blogs/8_Trendy_and_Easy_Hairstyle_for_Girls_2aacb11dc4.jpg')",
      }}
    >
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">
          Hair Salon Appointment Form
        </h1>
        <p className="text-center text-gray-600 mb-2">
          Please fill the form below, it will only take 3 minutes.
        </p>

        <div className="mb-4 min-h-[1.5rem] flex flex-wrap">
          {renderSelectedItems()}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Choose Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="hairStyle"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Choose Hair Style
              </label>
              <select
                id="hairStyle"
                name="hairStyle"
                value={formData.hairStyle}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a style</option>
                <option value="sleek">Sleek</option>
                <option value="bangs">Bangs</option>
                <option value="bobCut">Bob Cut</option>
                <option value="braid">Braid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Choose Your Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="hairColor"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Hair Color
              </label>
              <select
                id="hairColor"
                name="hairColor"
                value={formData.hairColor}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a color</option>
                <option value="black">Black</option>
                <option value="brown">Brown</option>
                <option value="red">Red</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="note"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Any note for us?
            </label>
            <textarea
              id="note"
              name="note"
              placeholder="Any note for us"
              value={formData.note}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[5rem]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
