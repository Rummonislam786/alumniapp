import { useEffect, useState } from "react";
import { User } from "@monorepo/types";
import { userApi } from "./services/api";
import { TaskList } from "./components/TaskList";
import { CreateTaskForm } from "./components/CreateTaskForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [refreshTasks, setRefreshTasks] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userApi.getAll();
      setUsers(data);
      if (data.length > 0 && !selectedUserId) {
        setSelectedUserId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  const handleTaskCreated = () => {
    setRefreshTasks((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p>N-Tier Monorepo Architecture Demo</p>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <h2>Users</h2>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul className="user-list">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={selectedUserId === user.id ? "active" : ""}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className="content">
          {selectedUserId ? (
            <>
              <CreateTaskForm
                userId={selectedUserId}
                onTaskCreated={handleTaskCreated}
              />
              <TaskList key={refreshTasks} userId={selectedUserId} />
            </>
          ) : (
            <p>Select a user to view tasks</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
