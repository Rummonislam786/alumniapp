import { useEffect, useState } from "react";
import { users, 
  // alumni
 } from "@monorepo/types";
import { userApi } from "./services/api";
import { TaskList } from "./components/TaskList";
import { CreateTaskForm } from "./components/CreateTaskForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState<users[]>([]);
  // const [alumni, setAlumni] = useState<alumni[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [refreshTasks, setRefreshTasks] = useState(0);

  useEffect(() => {
    loadUsers();
    // loadAlumni();
  }, []);

  // const loadAlumni = async () => {
  //   try {
  //     const data = await alumniApi.getAll();
  //     setAlumni(data);
  //   } catch (err) {
  //     console.error("Failed to load alumni:", err);
  //   }
  // };
  const loadUsers = async () => {
    try {
      const data = await userApi.getAll();
      setUsers(data);
      if (data.length > 0 && !selectedUserId) {
        setSelectedUserId(data[0].user_id);
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
                  key={user.user_id}
                  className={selectedUserId === user.user_id ? "active" : ""}
                  onClick={() => setSelectedUserId(user.user_id)}
                >
                  <div className="user-avatar">
                    {user.user_id.toString().charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    {/* <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div> */}
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
