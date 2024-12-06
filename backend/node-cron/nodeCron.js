import cron from 'node-cron';
import taskModel from '../models/taskModel.js';
import sendMail from './sendMail.js';

cron.schedule('0 * * * *', async () => {
  const now = new Date();
  const threshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                          
  try {

const overdueTasks = await taskModel.find({ completed: false, createdAt: { $lt: threshold } }).populate('userId');

const tasksWithOwners = overdueTasks.map(task => ({
  taskId: task._id,
  title: task.title,
  description: task.description,
  ownerId: task.userId, 
  ownerEmail: task.userId.email 
}));

tasksWithOwners.forEach(async (task) => {
  const subject = 'Reminder: Incomplete Task';
  const message = `You have the following overdue task:\n\n` + 
                  `Title: ${task.title}\nDescription: ${task.description}`;

  await sendMail(task.ownerEmail, subject, message);
});

  } catch (error) {
    console.error('Error checking for overdue tasks:', error);
  }
});
