import Menubar from "@/components/Menubar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-screen h-screen bg-sky-950">
      <Menubar />
      {children}

    </div>
  );
}