"use client"

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { format } from "date-fns";

export default function TaskForm({ task }: { task?: any; }) {
   const [date, setDate] = useState<Date | undefined>(undefined)
   return (
      <>
         <form>
            <div className="grid gap-5 mb-8">
               <div className="grid gap-2">
                  <Label htmlFor="name-1">Task title</Label>
                  <Input id="name-1" name="name" />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="username-1">Description</Label>
                  <Textarea rows={6} />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="username-1">Priority</Label>
                  <Select>
                     <SelectTrigger className="w-full">
                        <SelectValue placeholder="Set priority" />
                     </SelectTrigger>
                     <SelectContent>
                     <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="high" className="text-amber-500">High</SelectItem>
                        <SelectItem value="medium" className="text-blue-600">Medium</SelectItem>
                        <SelectItem value="low" className="text-gray-600">Low</SelectItem>
                     </SelectGroup>
                     </SelectContent>
                  </Select>
               </div>

               <div className="grid gap-2">
                  <Popover>
                     <Label>Due date</Label>
                     <PopoverTrigger asChild>
                        <Button
                           variant="outline"
                           className="data-[empty=true]:text-muted-foreground w-full justify-between font-normal"
                        >
                           {date ? format(date.toLocaleDateString(), "PPP") : <span>Pick a date</span>}
                           <CalendarIcon className="mr-2 h-4 w-4" />
                        </Button>
                     </PopoverTrigger>

                     <PopoverContent className="w-auto p-0">
                        <Calendar
                           mode="single"
                           selected={date}
                           onSelect={setDate}
                           disabled={(date) => 
                              new Date(date).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)
                           }
                           captionLayout="dropdown"
                        />
                     </PopoverContent>
                  </Popover>
               </div>
            </div>

            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DialogClose>
               <Button 
                  type="submit" 
                  className="bg-teal-600"
               >
                  {task ? "Update" : "Add"} task
               </Button>
            </DialogFooter>
         </form>
      </>
   );
}