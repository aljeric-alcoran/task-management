import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

export default function DeleteDialog({
   open,
   setOpen
}: {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
   return (
      <>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Delete Task</DialogTitle>
                  <DialogDescription>
                     Are you sure you want to delete this task?.
                  </DialogDescription>
               </DialogHeader>
               {/* {error ? (
                  <Alert className="bg-red-50 text-red-700">
                     <CircleX />
                     <AlertTitle className="text-xs mt-0.5 -ml-1">{error}</AlertTitle>
                  </Alert>
               ) : null} */}
               <DialogFooter className="mt-6">
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="button" className="bg-red-600">Delete</Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}