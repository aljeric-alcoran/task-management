import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeleton() {
   return (
      <>
         {Array.from({ length: 2 }).map((_, i) => (
            <Item key={i} variant="outline" size="sm" asChild>
               <div>
                  <ItemMedia>
                     <Skeleton className="h-6 w-6 -mt-19"/>
                  </ItemMedia>
                  <ItemContent>
                     <ItemTitle>
                        <Skeleton className="h-4 w-90"/>
                     </ItemTitle>
                     <div className="flex flex-col gap-2 mt-1">
                        <Skeleton className="h-3 w-100"/>
                        <Skeleton className="h-3 w-80"/>
                        <span className="flex items-center gap-3 mt-2 text-sm">
                           <span><Skeleton className="h-4 w-20"/></span>
                           <span><Skeleton className="h-4 w-50"/></span>
                        </span>
                     </div>
                  </ItemContent>
                  <ItemActions>
                     <Skeleton className="h-9 w-9"/>
                     <Skeleton className="h-9 w-9"/>
                  </ItemActions>
               </div>
            </Item>
         ))}
      </>
   );
}