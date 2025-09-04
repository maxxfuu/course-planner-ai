import ky from "ky";
import type {
  CodeDescriptionResponse,
  InstructorMeetingTimesResponse
} from '@/types/ucmerced';

const api = ky.create({
  prefixUrl: "https://reg-prod.ec.ucmerced.edu/StudentRegistrationSsb/ssb/term/termSelection?mode=search",
  headers: { 'User-Agent': 'course-planner-ai' }
});

export function getAcademicTerms() {
  const searchParams = new URLSearchParams();
  searchParams.set('searchTerm', '');
  searchParams.set('offset', '1');
  searchParams.set('max', '5');
  return api
    .get('classSearch/getTerms', { searchParams })
    .json<CodeDescriptionResponse>();
}

export function getInstructorMeetingTimes(term: string) {
  const searchParams = new URLSearchParams();
  searchParams.set('term', term);
  return api
    .get('classSearch/getMeetingTimes', { searchParams })
    .json<InstructorMeetingTimesResponse>();
}