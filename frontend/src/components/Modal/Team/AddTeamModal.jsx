import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import { useDispatch } from "react-redux";
import { addTeam } from "@/redux/team/actions";
import { useState } from "react";

export default function AddTeam({ isOpen, onClose }) {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTeamName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addTeam({ name: teamName }));
    onClose();
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create new team
              </h3>
              <SecondaryButton onClick={onClose}>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </SecondaryButton>
            </div>

            <div >
              <div className="p-4 md:p-5 space-y-4">
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={handleChange}
                    value={teamName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <PrimaryButton onClick={handleSubmit}>Save</PrimaryButton>
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
