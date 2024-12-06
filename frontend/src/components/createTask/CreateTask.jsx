import React, { useContext, useState } from 'react';
import axios from "../../Axios/axios.js";
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import "./createTask.css";
function CreateTask() {
    const { dispatch } = useContext(TaskContext)
    const {userToken} = useContext(TokenContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/task/addTask", {title, description},{
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            })
                console.log(res)
          } catch (error) {
            console.log(error);
          }
        dispatch({
            type: "ADD_TASK",
            title,
            description
        })
        setTitle("")
        setDescription("")
    }

    return (
        <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center items-center">
            <div className='w-11/12'>
                <form onSubmit={handleAdd}>
                    <div>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            placeholder = "Eneter title here..."
                            onChange={(e) => setTitle(e.target.value)}
                            className=' border text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    <div className='my-5'>
                        <textarea
                            rows={7}
                            name="description"
                            id="description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                            placeholder = "Eneter description here..."
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className=' bg-blue-600 rounded-md text-white px-5 py-1 '
                        >Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;