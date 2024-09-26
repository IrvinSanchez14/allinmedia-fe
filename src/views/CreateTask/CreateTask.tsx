import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask } from '../../api/tasks/tasks';

const CreateTask = () => {
const navigate = useNavigate();
const { id } = useParams();
  const [task, setTask] = useState({
    title: '',
    completed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
        e.preventDefault();
        const create = await createTask(task)
        console.log("create", create)
        navigate(-1)
    } catch(error){
        console.log(error)
    }
  };

  return (
    <div className="h-screen">
        <div className=" max-w-lg mx-auto p-4 ">
        <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          Back
        </button>
        </div>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
                
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título de la tarea</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="completed" className="block text-gray-700 font-bold mb-2">Completado</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={task.completed}
          onChange={(e) => setTask((prevTask) => ({
            ...prevTask,
            completed: e.target.checked,
          }))}
          className="mr-2 leading-tight"
        />
        <span className="text-gray-700">Sí</span>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
    </div>

  );
};

export default CreateTask;
