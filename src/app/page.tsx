import CourseForm from "@/components/course-form";

export default function Home() {
  return (
    <main className="container flex max-w-2xl flex-col items-center justify-center gap-4">
      <h1 className="text-4xl pt-16">Course Planner AI</h1>
      <CourseForm />
    </main>
  )
}
