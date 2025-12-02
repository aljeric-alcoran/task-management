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
import { toast } from "sonner";
import { format } from "date-fns";
import { useTaskFormSchema, TaskFormSchema } from "@/schema/task.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/lib/services";

export default function TaskForm({ 
   task,
   setOpen
}: { 
   task?: any; 
   setOpen: (value: boolean) => void;
}) {
   const form = useTaskFormSchema();
   const queryClient = useQueryClient();

   const addTask = useMutation({
      mutationFn: createTask,
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
         toast.success("Success!", { description: "Task created successfully." });
         setOpen(false);
      },
      onError: (error) => {
         toast.error("Error!", { description: error.message});
      }
   });

   async function onSubmit(values: TaskFormSchema) {
      const payload = {
         ...values,
         due_date: values.due_date.toISOString(),
      };
      
      if (!task) {
         const result = await addTask.mutateAsync(payload);
         console.log(result);
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-5 mb-8">
               <FormField
                  control={form.control}
                  name="task_title"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Task title</FormLabel>
                        <FormControl>
                           <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs"/>
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <Textarea rows={6} {...field} />
                        </FormControl>
                        <FormMessage className="text-xs"/>
                     </FormItem>
                  )}
               />
               
               <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                           <Select
                              onValueChange={field.onChange}
                              value={field.value ?? ""}
                           >
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
                        </FormControl>
                        <FormMessage className="text-xs" />
                     </FormItem>
                  )}
               />

               <div className="grid gap-2">
                  <FormField
                     name="due_date"
                     control={form.control}
                     render={({ field }) => (
                        <div className="flex gap-3">
                           <div className="flex flex-col gap-2 w-full">
                              <Popover>
                                 <Label>Due date</Label>
                                 <PopoverTrigger asChild>
                                    <Button
                                       variant="outline"
                                       data-empty={!field.value}
                                       className="data-[empty=true]:text-muted-foreground justify-between font-normal"
                                    >
                                       {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                       <CalendarIcon className="mr-2 h-4 w-4" />
                                    </Button>
                                 </PopoverTrigger>

                                 <PopoverContent className="w-auto p-0">
                                    <Calendar
                                       mode="single"
                                       selected={field.value}
                                       onSelect={
                                          (date) => {
                                             if (!date) return;
                                         
                                             const current = field.value || new Date();
                                             date.setHours(current.getHours());
                                             date.setMinutes(current.getMinutes());
                                             date.setSeconds(current.getSeconds());
                                         
                                             field.onChange(date);
                                          }
                                       }
                                       disabled={{ before: new Date() }}
                                       captionLayout="dropdown"
                                    />
                                 </PopoverContent>
                              </Popover>
                           </div>
                           <div className="flex flex-col gap-2 w-full">
                              <Label htmlFor="time-picker" className="px-1 text-white">Time</Label>
                              <Input
                                 id="time-picker"
                                 type="time"
                                 step="1"
                                 defaultValue="10:30:00"
                                 className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                 onChange={(e) => {
                                    const time = e.target.value;
                                    const [hours, minutes, seconds] = time.split(":").map(Number);

                                    if (!field.value) return;
                                
                                    const newDate = new Date(field.value);
                                    newDate.setHours(hours);
                                    newDate.setMinutes(minutes);
                                    newDate.setSeconds(seconds ?? 0);
                                
                                    field.onChange(newDate);
                                 }}
                              />
                           </div>
                        </div>
                     )}
                  />
               </div>
            </div>

            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DialogClose>
               <Button 
                  disabled={addTask.isPending}
                  type="submit" 
                  className="bg-teal-600"
               >
                  {task ? "Update" : "Add"} task
               </Button>
            </DialogFooter>
         </form>
      </Form>
   );
}
