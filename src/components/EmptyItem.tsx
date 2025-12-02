import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Clipboard } from "lucide-react";

export default function EmptyList() {
   return (
      <div className="mt-6">
         <Empty className="border border-dashed bg-gray-50 rounded-sm">
            <EmptyHeader>
               <EmptyMedia variant="icon">
                  <Clipboard />
               </EmptyMedia>
               <EmptyTitle>No tasks for you</EmptyTitle>
               <EmptyDescription>
                  No tasks are available for you right now. Add a task to begin.
               </EmptyDescription>
            </EmptyHeader>
         </Empty>
      </div>
   );
}