import React, { useEffect, useState } from "react";
// import { Task, TaskStatus } from "@monorepo/types";
// import { taskApi } from "../services/api";

interface TaskListProps {
  userId?: number;
}

export const TaskList: React.FC<TaskListProps> = ({ userId }) => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, [userId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      // const data = await taskApi.getAll(userId ? { userId } : undefined);
      // setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // const handleStatusChange = async (taskId: number, status: TaskStatus) => {
  //   console.log(`Updating task ${taskId} to status ${status}`);
  //   try {
  //     await taskApi.update(taskId, { status });
  //     loadTasks();
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Failed to update task");
  //   }
  // };

  // const handleDelete = async (taskId: number) => {
  //   if (!window.confirm("Are you sure you want to delete this task?")) return;

  //   try {
  //     await taskApi.delete(taskId);
  //     loadTasks();
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Failed to delete task");
  //   }
  // };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {/* {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-meta">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task.id, e.target.value as TaskStatus)
                  }
                  className="status-select"
                >
                  <option value={TaskStatus.TODO}>To Do</option>
                  <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                  <option value={TaskStatus.DONE}>Done</option>
                </select>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};
