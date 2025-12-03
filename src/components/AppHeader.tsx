import Image from "next/image";

export default function AppHeader() {
   return (
      <div className="flex justify-center">
         <div className="w-full pb-6 md:pb-10 pt-6 flex flex-col justify-center items-center gap-3 bg-teal-500 md:rounded-b-lg uppercase font-bold text-lg md:text-2xl">
            <Image 
               src="/clipboard-img.png" 
               className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
               width={90}
               height={90} 
               alt="clipboard-image" 
               loading="eager"
            />
            Task Management System
         </div>
      </div>
   );
}