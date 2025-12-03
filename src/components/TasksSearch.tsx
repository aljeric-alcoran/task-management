"use client";

import { RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "./hooks/debounce-hook";
import { toast } from "sonner";
import { searchTasks } from "@/lib/services";

export default function TasksSearch() {
   const queryClient = useQueryClient();
   const firstRender = useRef(true);
   const [searchTerm, setSearchTerm] = useState("");

   const debouncedSearchTerm = useDebounce(searchTerm, 300);
   
   const searchAction = useMutation({
      mutationFn: searchTasks,
      onSuccess: (data) => {
         queryClient.setQueryData(["tasks"], { tasks: data });
      },
      onError: (error: any) => {
        toast.error("Error", { description: error.message });
      },
   });

   useEffect(() => {
      if (firstRender.current) {
         firstRender.current = false;
         return;
      }
      searchAction.mutate(debouncedSearchTerm);
   }, [debouncedSearchTerm]);

   return (
      <div>
         <div className="relative flex gap-3">
            <Input 
               className="pl-9"
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search task..."
            />
            <Search className="absolute top-2 left-2 text-gray-500" size="20"/> 

            { searchAction.isPending ? <RefreshCw className="absolute top-2 right-3 text-gray-500 animate-spin" size="20"/> : "" }
            
         </div>
      </div>
   );
}