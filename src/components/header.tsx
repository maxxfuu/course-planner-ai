import Image from "next/image";
import Link from "next/link";
import {User, Calendar, List } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "./theme-selector";

export default function Header() {
  return (
    <header className="sticky z-40 w-full border-b border-foreground/10 border-background/25">
      <div className="container flex items-center justify-between h-16">
        <div className="min-w-0 flex flex-row items-center gap-4">
          <Image
            src= "/calendar.png"
            alt="calendar"
            width={35}
            height={35}
            draggable={false}
          />
          <span className="truncate text-lg">
            Course Planner AI
          </span>
        </div>
        <nav className="flex items-center gap-2">
          <Link 
            href="/" 
            target="_blank" 
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
          >
            <Calendar className="size-5" />
            <span className="sr-only">Calendar</span>
          </Link>


          <Link 
            href="https://github.com/maxxfuu?tab=repositories" 
            target="_blank" 
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
          >
            <List className="size-5" />
            <span className="sr-only">Activity Log</span>
          </Link>

          <Link 
            href="/login" 
            target="_blank" 
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
          >
            <User className="size-5" />
            <span className="sr-only">Profile</span>
          </Link>

          <ModeToggle />
        </nav>
      </div>
    </header>    
  )
}