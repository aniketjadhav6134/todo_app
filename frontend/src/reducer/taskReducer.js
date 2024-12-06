function taskReducer(tasks, action) {
    console.log("taskreducer");
    switch (action.type) {
        case "ADD_TASK": {
            return [
                ...tasks,
                {
                    title: action.title,
                    description: action.description,
                    completed: false
                }
            ]
        }
        case "SET_TASK": {
            return action.payload
        }
        case "REMOVE_TASK": {
            console.log('Task Removed!');
            return tasks.filter((task, index) => index !== action.id)
        }
        case "MARK_DONE": {
            return tasks.map((task, index) => {
                if (index === action.id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }
                return task
            })
        }
        default: {
            throw Error("Unknown Action" + action.type)
        }
    }
}

export default taskReducer;