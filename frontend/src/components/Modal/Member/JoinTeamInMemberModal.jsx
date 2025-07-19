import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";

import SelectField from "@/components/Input/SelectField";


export default function JoinTeamInMemberModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const options = [
    { key: "", value: "Select Team" },
    { key: "1", value: "Team 1" },
    { key: "2", value: "Team 2" },
    { key: "3", value: "Team 3" },
    { key: "4", value: "Team 4" },
    { key: "5", value: "Team 5" },
  ];

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
                Join Member In Team
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

            <div className="p-4 md:p-5 space-y-4">
              <div className="w-full d-flex">
                <SelectField label={"Team"} id="team" options={options} />
                <PrimaryButton>Join</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
