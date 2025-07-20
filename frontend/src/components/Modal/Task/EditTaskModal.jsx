import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import InputField from "@/components/Input/InputField";
import AssignMemberInput from "@/components/Input/Custom/AssignMemberInput";
import InputFilesField from "@/components/Input/InputFilesField";
import SelectField from "@/components/Input/SelectField";

export default function EditTaskModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const status = [
    {key: '', value: 'Select Status'},
    {key: '1', value: 'Incomplete'},
    {key: '2', value: 'Dev team working'},
    {key: '3', value: 'Pending'},
    {key: '4', value: 'Success'},
  ];

  const taskTypes = [
    {key: '', value: 'Select Task Type'},
    {key: '1', value: 'Issue'},
    {key: '2', value: 'Complain'},
    {key: '3', value: 'Requirement'},
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
                Update Task
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
              <div className="mb-6">
                <InputField label="Title" type={"text"} id={"title"}/>
              </div>
              <div className="mb-6">
                <InputField label="Description" type={"text"} id={"description"}/>
              </div>
              <div className="mb-6">
                <InputField label="Remarks" type={"text"} id={"remarks"}/>
              </div>
              <div className="mb-6">
                <SelectField label="Task Type" type={"text"} id={"tasktype"} options={taskTypes} />
              </div>
              <div className="mb-6">
                <SelectField label="Status" type={"text"} id={"status"} options={status} />
              </div>
              <div className="mb-6">
                <InputField label="Expiry Date" type={"date"} id={"expire_date"}/>
              </div>
              <div className="mb-6">
                <AssignMemberInput label={"Assign Member"} id={"assign_member"} memberName={""} />
              </div>
              <div className="mb-6">
                <InputFilesField />
              </div>
            </div>
            
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <PrimaryButton>Save</PrimaryButton>
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
