import React, { useEffect, useState } from 'react';
import { getTaks, ITaskNew } from '../../api/tasks/tasks';
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';

const ListTask = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<ITaskNew[]>([]);
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Completed', accessor: 'completed' },
    { Header: 'Date Created', accessor: 'date_created' },
  ];

  const getLis = async () => {
    try {
      const tasks = await getTaks();
      setTasks(tasks)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const navigateCreate = () => {
    navigate('/create-task')
  }

  const navigateUpdate = (id: string) => {
    navigate(`/update-task/${id}`)
  }

  const deleteTask = (id: number) => {
  }

  useEffect(() => {
    getLis()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-baseline mb-5">
        <h1 className="text-2xl font-bold mb-4">Task Table</h1>
        <button onClick={navigateCreate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Create Task
        </button>
      </div>
      <Table columns={columns} data={tasks} onEdit={navigateUpdate} onDelete={deleteTask} />
    </div>
  );
};

export default ListTask;
