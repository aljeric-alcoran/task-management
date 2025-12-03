"use client"

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
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
import { createTask, updateTask } from "@/lib/services";
import { useEffect } from "react";
import { Task } from "@/lib/model";
import { isObjectSharedKeyMatched } from "@/lib/helpers";

export default function TaskForm({ 
   task,
   setOpen
}: { 
   task?: Task; 
   setOpen: (value: boolean) => void;
}) {
   const form = useTaskFormSchema(task);
   const queryClient = useQueryClient();

   const addTaskAction = useMutation({
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

   const updateTaskAction = useMutation({
      mutationFn: updateTask,
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
         toast.success("Success!", { description: data.message });
         setOpen(false);
      },
      onError: (error) => {
         toast.error("Error!", { description: error.message});
      }
   });

   async function onSubmit(values: TaskFormSchema): Promise<void> {
      console.log('clicked');
      const payload = {
         ...values,
         due_date: values.due_date.toISOString(),
      };
      
      if (!task) {
         const result = await addTaskAction.mutateAsync(payload);
         console.log(result);
      } else {
         const updatedTask = {
            ...task,
            ...values, 
            due_date: values.due_date.toISOString()
         }
         if (!isObjectSharedKeyMatched(updatedTask, task)) {
            const result = await updateTaskAction.mutateAsync(updatedTask);
            console.log(result);
            return;
         }
         toast.warning("Oops!", { description: "No changes has been made." })
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
                           <Input {...field} autoComplete="off"/>
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
                           <Textarea rows={10} {...field} />
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
                              value={field.value}
                           >
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Set priority" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem className="text-amber-500" value="high">High</SelectItem>
                                 <SelectItem className="text-blue-600" value="medium">Medium</SelectItem>
                                 <SelectItem className="text-gray-600" value="low">Low</SelectItem>
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
                     render={({ field }) => {
                        const selectedDate = field.value ? new Date(field.value) : new Date();
                        const timeString = format(selectedDate, "HH:mm");

                        return (
                        <div className="flex gap-3">
                           <div className="flex flex-col gap-2 w-full">
                              <Popover>
                                 <FormItem>
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
                                       onSelect={(date) => {
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
                                 <FormMessage className="text-xs" />
                              </FormItem>
                              </Popover>
                           </div>
                           <div className="flex flex-col gap-2 w-full">
                              <FormItem>
                                 <Label htmlFor="time-picker" className="px-1 text-white">Time</Label>
                                 <Input
                                    id="time-picker"
                                    type="time"
                                    step="60"
                                    value={timeString}
                                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    onChange={(e) => {
                                       const [hours, minutes] = e.target.value.split(":").map(Number);

                                       const newDate = selectedDate ? new Date(selectedDate) : new Date();
                                       newDate.setHours(hours);
                                       newDate.setMinutes(minutes);

                                       field.onChange(newDate);
                                    }}
                                 />
                                 <FormMessage className="text-xs" />
                              </FormItem>
                           </div>
                        </div>
                     )}}
                  />
               </div>
            </div>

            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DialogClose>

               <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="bg-teal-600"
               >
                  {task ? "Update" : "Add"} task
               </Button>
            </DialogFooter>
         </form>
      </Form>
   );
}
