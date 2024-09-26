import apiClient from "../config";

interface ITask {
    id: number
    title: string
    completed: number
    date_created: string
}

export interface ITaskNew {
    id: number
    title: string
    completed: string
    date_created: string
}

export interface RequestTask {
    title: string
    completed: boolean
}



const getTaks = async (): Promise<ITaskNew[]> => {
  try {
    const response = await apiClient.get<ITask[]>('/tasks')
    const changeData = response.data.map((task) => {
      return {
        ...task,
        completed: task.completed === 0 ? 'Not completed' : 'Completed'
      }
    })
    return changeData
  } catch(error){
      throw error;
  }
}

const createTask = async (body: RequestTask) => {
    try {
        const response = await apiClient.post('/tasks', { ...body })
        return response.data
    } catch(error){
        throw error
    }

}


export {
    getTaks,
    createTask
}