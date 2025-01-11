import { useEffect, useState, useSyncExternalStore } from "react";
import { emergencyFund } from "../../controllers/features";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function EmergencyFund() {
  const [formData, setFormData] = useState({
    monthlySalary: "",
    monthsCount: "",
  });
  const [emergencyFund, setEmergencyFund] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setEmergencyFund(formData.monthlySalary * formData.monthsCount);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-200">
      <article className="p-6 flex flex-col gap-8">
        <Link to='/wallet'>
          <div className="returnBtn bg-gray-800">
            <i className="fa-solid fa-arrow-left text-white"></i>
          </div>
        </Link>
        <div>
          <p className="text-small font-semibold">
            Recommended emergency fund:
          </p>
          <div className="relative flex">
            <p className="text-heading-2 font-bold">₱</p>
            <h3 className="text-heading-2 font-bold pl-5 break-words overflow-auto">
              {emergencyFund}
            </h3>
          </div>
        </div>
      </article>
      <article className="bg-gradient-to-r from-gray-400 to-gray-300 py-16 w-full h-[calc(50vh+300px)] lg:h-[calc(50vh+500px)] px-6 rounded-t-[30px] flex flex-col gap-4">
        <h2 className="text-heading-3 font-bold text-gray-800 tracking-f-small py-5">
          Emergency<span className="text-gray-600"> Fund</span>
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="amount">
              MONTHLY SALARY <span className="text-gray-800">*</span>
            </label>
            <div className="relative">
              <input
                className="primary-input pl-8 text-gray-800 bg-gray-200"
                name="amount"
                type="number"
                min="0"
                value={formData.monthlySalary}
                onChange={(e) =>
                  setFormData({ ...formData, monthlySalary: e.target.value })
                }
                required
              />
              <p className="absolute left-2 top-2 text-gray-800">₱</p>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="month">
              Number Of Months <span className="text-gray-800">*</span>
            </label>
            <input
              className="primary-input text-gray-800 bg-gray-200"
              type="number"
              placeholder="Number months you wish to cover"
              min="1"
              value={formData.monthsCount}
              onChange={(e) =>
                setFormData({ ...formData, monthsCount: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="primary-btn bg-gray-800 text-white">
            Calculate
          </button>
        </form>
      </article>
    </section>
  );
}

export default EmergencyFund;
