"use client"

import { Card, CardContent, CardHeader } from "./ui/card";
import TasksSearch from "./TasksSearch";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import FormDialog from "./FormDialog";
import { useState } from "react";

export default function AppTasks() {
   const [open, setOpen] = useState<boolean>(false);
   return (
      <div className="m-10 w-full">
         <Card className="w-full">
            <CardHeader>
               <TasksSearch/>
            </CardHeader>
            <CardContent className="space-y-3">
               <Button className="bg-teal-600" onClick={() => setOpen(true)}>
                  <Plus/>
                  Add Task
               </Button>
               <TaskCard/>

               <FormDialog 
                  open={open} 
                  setOpen={setOpen}
               />
            </CardContent>
         </Card>
      </div>
   );
}