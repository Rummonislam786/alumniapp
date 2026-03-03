import React, { useState } from "react";
// import { CreateTaskDto } from "@monorepo/types";
// import { taskApi } from "../services/api";

interface CreateTaskFormProps {
  userId: number;
  onTaskCreated: () => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = (
  {
    // userId,
    // onTaskCreated,
  },
) => {
  // const [formData, setFormData] = useState<Omit<CreateTaskDto, "userId">>({
  //   title: "",
  //   description: "",
  // });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // try {
    //   await taskApi.create({
    //     // ...formData,
    //     userId,
    //   });
    //   // setFormData({ title: "", description: "" });
    //   onTaskCreated();
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : "Failed to create task");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <h3>Create New Task</h3>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          // value={formData.title}
          // onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          // value={formData.description}
          // onChange={(e) =>
          //   setFormData({ ...formData, description: e.target.value })
          // }
          required
          placeholder="Enter task description"
          rows={4}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};
