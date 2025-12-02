import Image from "next/image";

export default function AppHeader() {
   return (
      <div className="flex justify-center">
         <div className="w-full pb-10 pt-6 flex flex-col justify-center items-center gap-3 bg-teal-500 rounded-b-lg uppercase font-bold text-2xl">
            <Image src="/clipboard-img.png" className="w-auto h-auto" width="90" height="90" alt="clipboard-image" loading="eager"/>
            Task Management System
         </div>
      </div>
   );
}