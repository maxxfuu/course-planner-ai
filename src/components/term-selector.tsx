import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TermSelector() {
  // const terms = await getAcademicTerms(); TODO: Get academic terms, 
  return (
    <div className="grid w-full items-center gap-2 pb-2">
      <Label>Academic Term</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a term..." />
        </SelectTrigger>
      </Select>
    </div>
  )
}