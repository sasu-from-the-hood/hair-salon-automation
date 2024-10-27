import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
}

const initialEmployees: Employee[] = [
  { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', phone: '123-456-7890', role: 'Developer', is_active: true },
  { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', phone: '098-765-4321', role: 'Designer', is_active: true },
  { id: 3, first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', phone: '555-555-5555', role: 'Manager', is_active: false },
];

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [formData, setFormData] = useState<Omit<Employee, 'id' | 'is_active'>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedEmployee) {
      // Edit existing employee
      setEmployees(employees.map((emp: Employee) => 
        emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
      ));
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...formData,
        id: Math.max(...employees.map(e => e.id)) + 1,
        is_active: true,
      };
      setEmployees([...employees, newEmployee]);
    }
    setShowModal(false);
    setSelectedEmployee(null);
    setFormData({ first_name: '', last_name: '', email: '', phone: '', role: '' });
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
    });
    setShowModal(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would verify the password here
    if (adminPassword === 'admin123') { // This is a placeholder password
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee?.id));
      setShowPasswordModal(false);
      setAdminPassword('');
      setSelectedEmployee(null);
    } else {
      alert('Incorrect password. Deletion cancelled.');
    }
  };

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setFormData({ first_name: '', last_name: '', email: '', phone: '', role: '' });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={handleAddNew}
        >
          <FaPlus className="mr-2" /> Add Employee
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">First Name</th>
              <th className="py-2 px-4 border-b text-left">Last Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{employee.id}</td>
                <td className="py-2 px-4 border-b">{employee.first_name}</td>
                <td className="py-2 px-4 border-b">{employee.last_name}</td>
                <td className="py-2 px-4 border-b">{employee.email}</td>
                <td className="py-2 px-4 border-b">{employee.phone}</td>
                <td className="py-2 px-4 border-b">{employee.role}</td>
                <td className="py-2 px-4 border-b">
                  {employee.is_active ? 'Active' : 'Inactive'}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEdit(employee)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(employee)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
                  First Name:
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  {selectedEmployee ? 'Save Changes' : 'Add Employee'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this employee?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Enter Admin Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="adminPassword" className="block text-gray-700 text-sm font-bold mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Confirm Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setAdminPassword('');
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;