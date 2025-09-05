// Main functions for UC Merced Data Scraping
import ky from "ky";
import type {
  CodeDescriptionResponse,
  InstructorMeetingTimesResponse
} from '@/types/ucmerced';

const api = ky.create({
  prefixUrl: "https://reg-prod.ec.ucmerced.edu/StudentRegistrationSsb/ssb",
  headers: { 'User-Agent': 'course-planner-ai' }
});

// Additional parameters when getting academic terms
export async function getAcademicTerms() {
  const searchParams = new URLSearchParams();
  searchParams.set('searchTerm', '');
  searchParams.set('offset', '1');
  searchParams.set('max', '5');

  return api
    .get('classSearch/getTerms', { searchParams })
    .json<CodeDescriptionResponse>();
}

// Additional parameters when getting instructor meeting times
export function getInstructorMeetingTimes(term: string) {
  const searchParams = new URLSearchParams();
  searchParams.set('term', term);
  
  return api
    .get('classSearch/getMeetingTimes', { searchParams })
    .json<InstructorMeetingTimesResponse>();
}

