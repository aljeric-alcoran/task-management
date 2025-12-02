import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TasksSearch() {
   return (
      <div className="flex gap-3">
         <Input placeholder="Search task..."/>
         <Button className="bg-teal-600">
            <Search/>
            Search
         </Button>
      </div>
   );
}