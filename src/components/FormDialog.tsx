import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskForm from "./forms/TaskForm";

export default function FormDialog({ 
   open,
   setOpen,
   task
}: { 
   open: boolean; 
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   task?: any
}) {
   const descText = task ? "update the" : "create a new";
   return (
      <>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
               className="sm:max-w-[425px]"
               onInteractOutside={(e) => e.preventDefault()}
               onEscapeKeyDown={(e) => e.preventDefault()}
            >
               <DialogHeader>
                  <DialogTitle>{task ? "Update" : "Add New"} Task</DialogTitle>
                  <DialogDescription>
                     Fill in the details below to { descText } task.
                  </DialogDescription>
               </DialogHeader>
               <TaskForm setOpen={setOpen}/>
            </DialogContent>
         </Dialog>
      </>
   );
}