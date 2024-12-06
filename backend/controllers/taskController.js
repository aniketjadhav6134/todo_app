import dotenv from "dotenv";
import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
dotenv.config();

const addTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    const user = await userModel.find({_id: userId});
    const newTask = new taskModel({ title, description, completed: false, userId })
    newTask.save()
        .then(() => {
            sendMail(user[0].email, "Task Added", title, description)
            return (res.status(200).json({ message: "Task added successfully" }))
        })
        .catch((error) => {
            return (
                res.status(500).json({ message: error.message })
            )
        }
        )
}
const removeTask = async (req, res) => {
        try {
          const taskId = req.params.id;
          const task = await taskModel.findOneAndDelete({_id: taskId});
          console.log(task);
          
          if (!task) {
            return res.status(404).json({ message: "Task not found" });
          }
      
          res.status(200).json({ message: "Task removed successfully" });
        } catch (error) {
          console.error("Error deleting task:", error);
          res.status(500).json({ message: "Server error" });
        }
}

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body;

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(taskId, { completed }, { new: true });
    res.json(updatedTask);
    console.log(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
}
const getTask = (req, res) => {
    taskModel.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}
export { addTask, getTask, removeTask, updateTask };

