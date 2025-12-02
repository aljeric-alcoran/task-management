import { Card, CardContent, CardHeader } from "./ui/card";
import TasksSearch from "./tasks-search";
import TaskCard from "./task-card";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function AppTasks() {
   return (
      <div className="m-10 w-full">
         <Card className="w-full">
            <CardHeader>
               <TasksSearch/>
            </CardHeader>
            <CardContent className="space-y-3">
               <Button className="bg-teal-600">
                  <Plus/>
                  Add Task
               </Button>
               <TaskCard/>
            </CardContent>
         </Card>
      </div>
   );
}