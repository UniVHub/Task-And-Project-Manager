import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-5">
      <div>
        <Image
          src="/logo.png"
          width={500}
          height={500}
          alt="Logo"
          // className="hidden md:block w-20"
          className="hidden w-20"
        />
      </div>
      <h1 className="text-center text-4xl font-bold capitalize tracking-tighter">
        Project and Task Managament
      </h1>
    </header>
  );
};
