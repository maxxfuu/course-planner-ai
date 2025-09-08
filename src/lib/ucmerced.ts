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
export function getInstructorMeetingTimes(term: string, crn: string) {
  const searchParams = new URLSearchParams();
  searchParams.set('term', term);
  
  return api
    .get('classSearch/getMeetingTimes', { searchParams })
    .json<InstructorMeetingTimesResponse>();
}

export async function getSubjects(term: string) {
  const searchParams = new URLSearchParams();
  searchParams.set('searchTerm', '');
  searchParams.set('term', term);
  searchParams.set('offset', '1');
  searchParams.set('max', '999');
  return api
    .get('classSearch/get_subject', { searchParams })
    .json<CodeDescriptionResponse>();
}

export async function getClassDetails(term: string, crn: string) {
  const formData = new FormData();
  formData.append('term', term);
  formData.append('courseReferenceNumber', crn);
  formData.append('first', 'first');
  return api.post('searchResults/getClassDetails', { body: formData }).text();
}