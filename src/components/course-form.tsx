'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { FormEvent, useState,
  type PropsWithChildren,
} from 'react'
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarArrowDown, Minus, Plus, Trash, RotateCw} from "lucide-react"
import { toast } from 'sonner'

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent full page reload
    setGenerating(true);

    fetch('/api/generate', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        term: e.currentTarget.term.value,
        condense: e.currentTarget.condense.checked,
        crns: crns.filter((crn) => !! crn)
      })
    }) .then((response) => 
      response.json().then((result) => {
        if (result.error) {
          setGenerating(false); 
          return toast.error(result.error);
        }

        const blob = new Blob([result.data], { type: 'text/calendar' });

        const link = document.createElement('a');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', 'calendar.ics');

        document.body.appendChild(link);
        link.click();

        setGenerating(false);
        toast.success('Calender Generate!');
      })
      .catch(() => {
        setGenerating(false);
        return toast.error('An unexpected error occurred!')
      })
    )
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full min-w-lg max-w-lg">
        <CardHeader>
          <CardTitle>Course Schedule Generator</CardTitle>
          <CardDescription>Enter your 5-digit course reference numbers (CRNs) below to generate an importable iCalendar file.</CardDescription>
        </CardHeader>
        <CardContent> 
          {children}
          <div className={cn(
            "grid gap-3 grid-cols-1",            // always 1 column by default
            crns.length > 1 && "sm:grid-cols-2"  // switch to 2 cols at ≥640px when >1 CRN
          )}> 
            {crns.map((value, idx) => (
              <div key={idx} className="grid w-full items-center gap-2">
                <Label htmlFor={`crn-${idx}`}>CRN #{idx + 1}</Label>
                <div className="mt-1 mb-1 flex items-center gap-2">
                  <Input
                    onChange={(e) => updateCrn(idx, e.target.value)}
                    id={`crn-${idx}`}
                    placeholder="00000"
                    inputMode="numeric"
                    minLength={5}
                    maxLength={5}
                    value={value}
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
          <Switch id="condense-course-names" name="condense" defaultChecked />
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
          <Button className="flex-1 cursor-pointer" onClick={removeAllCrns} type="button"><Minus />Remove Courses</Button>
          <Button className="flex-1 cursor-pointer" onClick={addCrn} type="button"><Plus />Add Course</Button>
        </div>
        <div className="pt-4">
          <Button className="w-full text-black dark:text-white bg-white dark:bg-black border dark:border-[#27272A] hover:bg-[#E5E5E5] dark:hover:bg-[#232326] cursor-pointer" disabled={generating}>
            {generating ? (
              <RotateCw className="animate-spin"/>
            ) : (
            <CalendarArrowDown />
            )}{' '}
            Export Calendar
          </Button>
        </div>
        </CardContent>
     </Card>
    </form>
  )
}