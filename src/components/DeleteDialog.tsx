import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { deleteTask } from "@/lib/services";
import { toast } from "sonner";
import { Task } from "@/lib/model";

export default function DeleteDialog({
   task,
   open,
   setOpen
}: {
   task: Task;
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
   const queryClient = useQueryClient();
   
   const removeTask = useMutation({
      mutationFn: deleteTask,
      onSuccess: (data) => {
         setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Success!", { description: data.message });
      },
      onError: (error: any) => {
        toast.error("Error!", { description: error.message });
      },
   });

   async function onDeleteTask() {
      const result = await removeTask.mutateAsync(task.id!);
      console.log(result);
   }
    
   return (
      <>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Delete Task</DialogTitle>
                  <DialogDescription className="flex flex-col">
                     <span>Are you sure you want to delete this task?</span>
                     <span className="font-semibold">"{task.task_title}"</span>
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter className="mt-6">
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                     onClick={onDeleteTask}
                     disabled={removeTask.isPending}
                     type="button" 
                     className="bg-red-600"
                  >
                     {removeTask.isPending ? "Deleting" : "Delete"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}