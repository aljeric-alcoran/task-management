"use client"

import DeleteDialog from "./DeleteDialog";
import FormDialog from "./FormDialog";
import { ArrowDown, ArrowRight, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Task } from "@/lib/model";
import { formatDateWithOrdinal } from "@/lib/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTask } from "@/lib/services";
import { toast } from "sonner";

export default function TaskCard({ task }: { task: Task; }) {
   const priorityClasses = {
      high: "border-amber-500 text-amber-500 bg-amber-50",
      medium: "border-blue-500 text-blue-500 bg-blue-50",
      low: "border-gray-700 text-gray-700 bg-gray-50"
   } as const;

   const priorityIcon = {
      high: ArrowUpRight,
      medium: ArrowRight,
      low: ArrowDown
   } as const;
   
   const Icon = priorityIcon[task.priority as "high" | "medium" | "low"];
   const classes = priorityClasses[task.priority as "high" | "medium" | "low"]
   
   const [open, setOpen] = useState<boolean>(false);
   const [update, setUpdate] = useState<boolean>(false);
   const [isCompleted, setIsCompleted] = useState<boolean>(task.completed);

   const queryClient = useQueryClient();
   
   type Payload  = { taskId: number; completed: boolean };

   const completeTaskAction = useMutation({
      mutationFn: ({ taskId, completed }: Payload) => completeTask(taskId, completed),
      onSuccess: (data) => {
         setIsCompleted(data.task.completed);
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
         toast.success("Success!", { description: `Task marked as ${!isCompleted ? "completed"  : "incomplete"}.` });
      },
      onError: (error: any) => {
         toast.error("Error!", { description: error.message });
      },
   });

   async function onCompleteTask(event: boolean) {
      const result = await completeTaskAction.mutateAsync({ taskId: task.id!, completed: event });
      console.log(result);
   }

   return(
      <Item variant="outline" size="sm" asChild>
         <div>
            <ItemMedia>
               <Checkbox 
                  disabled={completeTaskAction.isPending}
                  onCheckedChange={onCompleteTask}
                  className="data-[state=checked]:bg-teal-600" 
                  id={`terms-${task.id}`} 
                  checked={isCompleted}
               />
            </ItemMedia>
            <ItemContent>
               <ItemTitle className={`${task.completed ? "line-through" : ""}`}>{task.task_title}</ItemTitle>
               <ItemDescription className={`line-clamp-none text-wrap ${task.completed ? "line-through" : ""}`}>
                  {task.description}
               </ItemDescription>
               <div className="flex items-center gap-3 mt-3 text-sm">
                  <Badge className={`rounded-sm capitalize ${classes}`} variant="outline">
                     <Icon/>
                     {task.priority}
                  </Badge>
                  <span>Deadline: {formatDateWithOrdinal(task.due_date)}</span>
               </div>
            </ItemContent>
            <ItemActions>
               {task.completed ? 
                  <div className="border border-green-400 bg-green-50 text-green-600 px-3 py-1 rounded-sm text-xs">Completed</div> 
               : (
                  <>
                     <Button onClick={() => setUpdate(true)} className="bg-blue-600" size="sm">
                        <Pencil/>
                     </Button>
                     <Button onClick={() => setOpen(true)} className="bg-red-500" size="sm">
                        <Trash2/>
                     </Button>
                  </>
               )}
            </ItemActions>

            <FormDialog open={update} setOpen={setUpdate} task={task}/>
            <DeleteDialog task={task} open={open} setOpen={setOpen} />
         </div>
      </Item>
   );
}