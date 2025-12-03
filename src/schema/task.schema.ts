import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/lib/model";

export const taskFormSchema = z.object({
   task_title: z.string().trim().min(1, "Task title is required."),
   description: z.string().min(1, "Description is required."),
   priority: z.enum(["high", "medium", "low"]).describe("Please select task priority."),
   due_date: z.date(),
   completed: z.boolean(),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;

export function useTaskFormSchema(task?: Task): UseFormReturn<TaskFormSchema> {
   return useForm<TaskFormSchema>({
      resolver: zodResolver(taskFormSchema),
      defaultValues: {
         task_title: task?.task_title ?? "",
         description: task?.description ?? "",
         priority: task?.priority ?? "medium",
         due_date: task?.due_date ? new Date(task.due_date.replace(" ", "T")) : new Date(),
         completed: task?.completed ?? false,
      },
   });
}