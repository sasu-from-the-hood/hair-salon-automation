import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

export default function Form() {
    const [Id, setId] = useState("");
    const [Name, setName] = useState("");
    const [Amount, setAmount] = useState("");
    const [UsageAmount, setUsageAmount] = useState("");
    const [Action, setAction] = useState("Necessary");

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = { Id, Name, Amount, UsageAmount, Action };

      try {
        const response = await fetch("http://localhost:5001/insertItem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Form submitted successfully");
        } else {
          console.log("Form submission failed");
        }
      } catch (error) {
        console.error("Submission failed", error);
      }
    };

  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-6 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faClipboardList}
              className="mr-2 text-center"
            />
            Item Registration Table
          </h1>
          <hr className="mb-6" />

          <div className="mb-4 flex flex-col md:flex-row items-center">
            <label
              htmlFor="id"
              className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
            >
              ID:
            </label>
            <input
              type="text"
              id="id"
              value={Id}
              onChange={(event) => setId(event.target.value)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-center">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={Name}
              onChange={(event) => setName(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-center">
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
            >
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={Amount}
              onChange={(event) => setAmount(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-center">
            <label
              htmlFor="usageAmount"
              className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
            >
              Usage Amount:
            </label>
            <input
              type="number"
              id="usageAmount"
              value={UsageAmount}
              onChange={(event) => setUsageAmount(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="mb-4 flex flex-col md:flex-row items-center">
            <label
              htmlFor="action"
              className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3"
            >
              Action:
            </label>
            <select
              id="action"
              value={Action}
              onChange={(event) => setAction(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            >
              <option value="Necessary">Necessary</option>
              <option value="Unnecessary">Unnecessary</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
