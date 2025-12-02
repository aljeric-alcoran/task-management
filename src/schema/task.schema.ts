import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/lib/model";

export const taskFormSchema = z.object({
   task_title: z.string().trim().min(1, "Task title is required."),
   description: z.string().min(1, "Description is required."),
   priority: z.string("Please select task priority."),
   due_date: z.date("Select the task's completion date."),
   completed: z.boolean(),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;

export function useTaskFormSchema(task?: Task): UseFormReturn<TaskFormSchema> {
   return useForm<TaskFormSchema>({
      resolver: zodResolver(taskFormSchema),
      defaultValues: {
         task_title: "",
         description: "",
         completed: false,
         priority: task?.priority ?? ""
      },
   });
}