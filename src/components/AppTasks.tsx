"use client"

import { Card, CardContent, CardHeader } from "./ui/card";
import TasksSearch from "./TasksSearch";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import FormDialog from "./FormDialog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/services";
import { Task } from "@/lib/model";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyList from "./EmptyItem";

export default function AppTasks() {
   const { data, isLoading, error } = useQuery({
      queryKey: ["tasks"],
      queryFn: getTasks,
      refetchOnWindowFocus: false,
   });

   const hasTasks = data?.tasks.length > 0;
   const tasks = data?.tasks ?? [];
   const [open, setOpen] = useState<boolean>(false);

   return (
      <div className="md:m-10 w-full">
         <Card className="w-full rounded-none md:rounded-lg h-full md:h-auto">
            <CardHeader className="px-3 md:px-6">
               <TasksSearch/>
            </CardHeader>
            <CardContent className="space-y-3 px-3 md:px-6">
               <Button disabled={isLoading} className="bg-teal-600" onClick={() => setOpen(true)}>
                  <Plus/>
                  Add Task
               </Button>

               {isLoading && <LoadingSkeleton />}

               {!isLoading && !hasTasks && <EmptyList/>}

               {!isLoading && hasTasks && (
                  <>
                     {tasks.map((task: Task) => (
                        <TaskCard key={task.id} task={task} />
                     ))}
                  </>
               )}

               <FormDialog 
                  open={open} 
                  setOpen={setOpen}
               />
            </CardContent>
         </Card>
      </div>
   );
}