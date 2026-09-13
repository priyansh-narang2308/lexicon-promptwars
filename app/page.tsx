import { ThemeToggle } from "@/components/motion/theme-toggle";

export default function Home() {
  return (
    <div>
      <h1>Promptwars</h1>
      <ThemeToggle
        variant={"rectangle"}
        start="bottom-up"
        className="rounded-xl cursor-pointer border border-border bg-background p-2.5"
        iconClassName="h-5 w-5"
      />
    </div>
  );
}
