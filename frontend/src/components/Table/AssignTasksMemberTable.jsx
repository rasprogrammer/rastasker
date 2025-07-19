import AssignTaskRow from "@/components/Member/AssignTaskRow";

export default function AssignTasksMemberTable() {
  const tasks = [
    { taskid: "4644", title: "What is your name", description: "My name is rajiv kuamr like most people", progress: "pending"},
    { taskid: "7845", title: "What is your name", description: "My name is rajiv kuamr like most people", progress: "pending"},
    { taskid: "7884", title: "What is your name", description: "My name is rajiv kuamr like most people", progress: "pending"},
  ];

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Progress
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <AssignTaskRow
                key={index}
                taskid={task.taskid}
                title={task.title}
                description={task.description}
                progress={task.progress}
              />
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}
