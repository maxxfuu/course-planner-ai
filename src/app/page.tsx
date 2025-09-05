import { CourseForm } from "@/components/course-form";
import { TermSelector } from "@/components/term-selector";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container flex max-w-2xl flex-col items-center justify-center gap-4">
      <h1 className="text-4xl pt-16 tracking-tight">Course Planner AI</h1>
      <CourseForm>
        <Suspense>
          <TermSelector />
        </Suspense>
      </CourseForm>
    </main>
  )
}
 