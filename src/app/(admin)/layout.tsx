import Menubar from "@/components/Menubar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="flex flex-col w-full h-full items-center">
          <Menubar />          
        </div>
        {children}
    </>
  );
}
