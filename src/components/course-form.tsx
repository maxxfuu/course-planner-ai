'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormEvent, useState,
  type PropsWithChildren,
} from 'react'
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarArrowDown, Minus, Plus, Trash } from "lucide-react"
import { toast } from 'sonner'

// import { PromptInputBasic } from "./prompt-input"

export function CourseForm({ children }: PropsWithChildren) {
  const [crns, setCrns] = useState<string[]>([""])
  const [generating, setGenerating] = useState(false);

  const addCrn = () => {
    setCrns([...crns, ""])
  }

  const updateCrn = (index:number, value:string) => {
    setCrns(prev => prev.map((val, i) => i === index ? value : val))
  }

  const removeCrn = (index: number) => {
    setCrns(prev =>
      prev.length > 1
        ? prev.filter((_, i) => i !== index) // remove the selected index
        : [""]                               // reset to a single empty input
    )
  }

  const removeAllCrns = () => {
    setCrns([""])
  }

  const submitCrns = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent full page reload
    setGenerating(true);

    fetch('/api/generate', {
      headers: { 'Content-Type': 'applications/json' },
      method: 'POST',
      body: JSON.stringify({
        term: e.currentTarget.term.value,
        condense: e.currentTarget.condense.checked,
        crns: crns.filter((crn) => !! crn)
      })
    }) .then((response) => 
      response.json().then((result) => {
        if (result.error) {
          return toast.error(result.error);
        }

        const blob = new Blob([result.data, {type: 'text/calendar'}]);

        const link = document.createElement('a');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', 'calendar.ics');

        document.body.appendChild(link);
        link.click();

        toast.success('Calender Generate!');
      })
      .catch(() => toast.error('An unexpected error occurred!'))
    )
  };

  return (
    <form onClick={submitCrns}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Course Schedule Generator</CardTitle>
          <CardDescription>Enter your 5-digit course reference numbers (CRNs) below to generate an importable iCalendar file.</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
          <div className="grid grid-cols-2 py-2 gap-2">
            {crns.map((value, idx) => (
              <div key={idx} className={crns.length == 1 ? "col-span-2" : "col-span-1"}>
                <Label htmlFor={`crn-${idx}`}>CRN #{idx + 1}</Label>
                <div className="mt-1 mb-1 flex items-center gap-2">
                  <Input
                    id={`crn-${idx}`}
                    type="number"
                    placeholder="00000"
                    value={value}
                    onChange={(e) => updateCrn(idx, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeCrn(idx)}
                    aria-label={`Remove CRN ${idx + 1}`}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        <div className="flex items-center space-x-2 pt-2">
          <Switch defaultChecked/>
          <div className="items-baseline space-x-2 sm:flex">
            <Label htmlFor="condense-course-names">
              Condense course names
            </Label>
            <p className="text-xs text-muted-foreground">
              e.g.: Organic Chemistry &rarr; CHEM 100
            </p>
          </div>
        </div>
        {/* <PromptInputBasic />   */}
        <div className="flex w-full gap-2 pt-4">
          <Button className="flex-1" onClick={removeAllCrns}><Minus />Remove Courses</Button>
          <Button className="flex-1" onClick={addCrn}><Plus />Add Course</Button>
        </div>
        <div className="pt-4">
          <Button className="w-full text-black dark:text-white bg-white dark:bg-black border dark:border-[#27272A] hover:bg-[#E5E5E5] dark:hover:bg-[#232326]">
            <CalendarArrowDown />Export Calendar
          </Button>
        </div>
        </CardContent>
     </Card>
    </form>
  )
}