export function formatDateWithOrdinal(date: string) {
   const day = new Date(date).getDate();
   const month = new Date(date).toLocaleString("en-US", { month: "long" });
   const year = new Date(date).getFullYear();
 
   const ordinal =
      day % 10 === 1 && day !== 11
         ? "st"
         : day % 10 === 2 && day !== 12
         ? "nd"
         : day % 10 === 3 && day !== 13
         ? "rd"
         : "th";
 
   return `${month} ${day}${ordinal}, ${year}`;
}