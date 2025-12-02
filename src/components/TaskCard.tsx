"use client"

import { ArrowDown, ArrowRight, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item";
import { Badge } from "./ui/badge";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";
import FormDialog from "./FormDialog";

export default function TaskCard() {
   const highPriorityClass = "border-amber-500 text-amber-500 bg-amber-50";
   const mediumPriorityClass = "border-blue-500 text-blue-500 bg-blue-50";
   const lowPriorityClass = "border-gray-700 text-gray-700 bg-gray-50";
   
   const [open, setOpen] = useState<boolean>(false);
   const [update, setUpdate] = useState<boolean>(false);
   return(
      <Item variant="outline" size="sm" asChild>
         <div>
            <ItemMedia>
               <Checkbox id="terms" />
            </ItemMedia>
            <ItemContent>
               <ItemTitle>Your profile has been verified.</ItemTitle>
               <ItemDescription className="flex flex-col gap-2">
                  This is a sample task for this person.
                  <span className="flex items-center gap-3 mt-1 text-sm">
                     <Badge className={`rounded-sm ${highPriorityClass}`} variant="outline">
                        <ArrowUpRight/>
                        High
                     </Badge>
                     <span>Deadline: 11/26/2026 10:00AM</span>
                  </span>
               </ItemDescription>
            </ItemContent>
            <ItemActions>
               <Button onClick={() => setUpdate(true)} className="bg-blue-600" size="sm">
                  <Pencil/>
               </Button>
               <Button onClick={() => setOpen(true)} className="bg-red-500" size="sm">
                  <Trash2/>
               </Button>
            </ItemActions>

            <FormDialog open={update} setOpen={setUpdate} />
            <DeleteDialog open={open} setOpen={setOpen} />
         </div>
      </Item>
   );
}