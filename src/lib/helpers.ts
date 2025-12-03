export function formatDateWithOrdinal(date: string) {
   const d = new Date(date);

   const month = d.toLocaleString("en-US", { month: "long" });
   const day = d.getDate().toString().padStart(2, "0");
   const year = d.getFullYear();

   let hours = d.getHours();
   const minutes = d.getMinutes().toString().padStart(2, "0");
   const ampm = hours >= 12 ? "PM" : "AM";

   hours = hours % 12;
   hours = hours === 0 ? 12 : hours; // convert 0 to 12
   const hoursStr = hours.toString().padStart(2, "0");

   return `${month} ${day}, ${year} ${hoursStr}:${minutes}${ampm}`;
}

export const isObjectSharedKeyMatched = <
   T extends Record<string, any>,
   U extends Record<string, any>
>(obj1: T, obj2: U): boolean => {
   const sharedKeys = Object.keys(obj1).filter((key) => key in obj2);
   return sharedKeys.every(key => obj1[key] === obj2[key]);
}