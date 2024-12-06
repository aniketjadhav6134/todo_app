import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import axios from "../../Axios/axios.js";
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import "./task.css";
function Task({ task, id }) {
    const {userToken} = useContext(TokenContext)
    const { dispatch } = useContext(TaskContext);
    
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    };
    const [done, setDone] = useState(task.completed);
    let taskId = task._id;
    
    const handleRemove = (e) => {
        e.preventDefault();
        const removeTask = async () => {
            try {
              console.log("Remove");
              const res = await axios.get(`/task/removeTask/${taskId}`,config);
              console.log(res);
              dispatch({
            type: "REMOVE_TASK",
            id
        })
            } catch (error) {
              console.log(error);
            }
        }
        removeTask();
    }
    
    const handleMarkDone = async () => {
        try {
            const response = await axios.put(`/task/updateTask/${task._id}`,{ completed: !done },config,{new: true});
            console.log("data : ",response);
            setDone(response.data.completed);
            dispatch({
                type: "MARK_DONE",
                completed: !done
            })
        } catch (error) {
            console.error('Error updating task!', error);
        }
        };
    return (
        <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done w-[10px] h-[10px]">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={done} />
            </div>
            <div className="task-info text-slate-900 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <div className=' italic opacity-60'>
                    {
                        task?.createdAt ? (
                            <p>{moment(task.createdAt).fromNow()}</p>
                        ) : (
                            <p>just now</p>
                        )
                    }
                </div>
            </div>
            <div className="remove-task text-sm text-white">
                <DeleteIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    size="large"
                    onClick={handleRemove}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" />
            </div>
        </div>
    );
}

export default Task;