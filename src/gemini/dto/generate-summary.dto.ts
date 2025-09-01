import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const transcript = [
  {
    speaker: 'Facilitator',
    text: 'Began by reviewing updated designs based on last week’s feedback and queries from Nolan. Objective was to validate updates on working hours, employee rosters, PTO handling, overrides, and schedule configurations.',
  },
  {
    speaker: 'Nolan',
    text: "Teams are defined as Field, Warehouse, and Office. We should standardize to 'Field' instead of 'On Field'.",
  },
  {
    speaker: 'Neetu',
    text: 'Employees assigned roles now also link to a team with one of three working hour types: Team Standard Hours, Role Standard Hours, or Customized Hours per employee/day. Company Standard Hours should be removed as redundant.',
  },
  {
    speaker: 'Facilitator',
    text: 'Key agreement: hierarchy will be Team → Role → Employee-specific overrides. Standard hours must include days plus start/end times, not just hours.',
  },
  {
    speaker: 'Team Member',
    text: 'Employee profiles should display individual standard hours by day, defaulted from their role or team.',
  },
  {
    speaker: 'HR Lead',
    text: 'PTO statuses must show directly in the roster. If an employee informs late arrival in advance, scheduler can update manually.',
  },
  {
    speaker: 'Ops Manager',
    text: 'Attendance deviations like late arrival or early leave must sync automatically to the roster. Day-end workflow should capture GPS in/out times and logged hours, with employees submitting notes for discrepancies.',
  },
  {
    speaker: 'Facilitator',
    text: 'Mismatch handling will require notifications to admins when roster ≠ GPS log. Admins can override hours but must provide a note. Employees can correct hours once post-day.',
  },
  {
    speaker: 'Tech Lead',
    text: 'For partial-day absences like dentist appointments, technicians should have a Pause option, while managers have an Override option requiring notes.',
  },
  {
    speaker: 'UI Designer',
    text: 'The All Employees tab is still useful but must show team membership and hours explicitly. If hours are TSH or RSH, roster should display actual times not just labels.',
  },
  {
    speaker: 'Facilitator',
    text: 'Final structure: Team Standard Hours, Role Standard Hours, Employee Standard Hours, and Customized Hours. Company Standard Hours are removed.',
  },
  {
    speaker: 'HR Lead',
    text: 'Each role will now include standard working hours per day in the Role Management Tab, e.g., HR Manager 8:00–4:30, Delivery Driver 7:00–3:30.',
  },
  {
    speaker: 'Ops Manager',
    text: 'Each team will have its own schedule, validation, and publish flow. For overlap cases, Field takes precedence, and special job cards will be created for true split days.',
  },
  {
    speaker: 'Payroll Lead',
    text: 'Payroll integration in Phase 2 will require pulling time card records. Special jobs like vehicle service should allow cost coding instead of warehouse overhead.',
  },
  {
    speaker: 'Admin',
    text: 'Holiday calendar must allow new holidays and special days. Extreme weather: full-day closure covered; early release handled via alerts and manual edits.',
  },
  {
    speaker: 'Facilitator',
    text: 'Decisions finalized: Remove Company Standard Hours, adopt Team → Role → Employee → Custom hierarchy, overrides always require notes, create distinct job cards for crossover work, and redesign All Employees tab.',
  },
  {
    speaker: 'Facilitator',
    text: 'Action items: Neetu’s team to update designs with role-specific hours and employee profile details, add GPS vs. logged time notifications, support holiday adjustments, BCEW to catalog new job codes, and define payroll/weather handling in Phase 2.',
  },
];

export class GenerateSummaryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: JSON.stringify(transcript),
    description: 'The transcript of the meeting',
  })
  transcript: string;
}
