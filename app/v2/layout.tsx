import V2Nav from "@/components/V2Nav";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#080810]">
      <V2Nav />
      {children}
    </div>
  );
}
