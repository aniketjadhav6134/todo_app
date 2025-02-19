import React from 'react';
import { Outlet } from 'react-router-dom';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
function Layout() {
    return (
        <div>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <CreateTask />
                <div className='task-container w-auto mx-5 md:w-1/2 mt-3'>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                    <div className='indicator'>
                        <TaskIndicator />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Layout;