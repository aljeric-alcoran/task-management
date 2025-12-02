import { Task } from "./model";

export async function getTasks() {
   const res = await fetch("/api/tasks");
 
   if (!res.ok) throw new Error("Failed to fetch tasks");
 
   return res.json();
}

export async function createTask(taskData: Task) {
   const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
   });
 
   if (!res.ok) throw new Error("Failed to create task");
 
   return res.json();
}

export async function deleteTask(taskId: number) {
   const res = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
   });
 
   if (!res.ok) throw new Error("Failed to delete task");
 
   return res.json();
}

export async function completeTask(taskId: number, completed: boolean) {
   const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({completed}),
   });
 
   if (!res.ok) throw new Error("Failed to delete task");
 
   return res.json();
}