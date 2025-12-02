export interface Task {
   id?: number;
   task_title: string;
   description: string;
   priority: string;
   due_date: string;
   completed: boolean;
   created_at?: string;
}