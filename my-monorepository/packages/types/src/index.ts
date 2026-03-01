// // Domain Entities
// export interface User {
//   id: number;
//   email: string;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Task {
//   id: number;
//   title: string;
//   description: string;
//   status: TaskStatus;
//   userId: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export enum TaskStatus {
//   TODO = "TODO",
//   IN_PROGRESS = "IN_PROGRESS",
//   DONE = "DONE",
// }

// // DTOs (Data Transfer Objects)
// export interface CreateUserDto {
//   email: string;
//   name: string;
//   password: string;
// }

// export interface UpdateUserDto {
//   email?: string;
//   name?: string;
// }

// export interface CreateTaskDto {
//   title: string;
//   description: string;
//   userId: number;
// }

// export interface UpdateTaskDto {
//   title?: string;
//   description?: string;
//   status?: TaskStatus;
// }

// // API Response types
// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
//   message?: string;
// }

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface departments {
  dept_id: number;
  dept_code: string;
  dept_name: string;
}
export interface alumni {
  alumni_id: number;
  student_id: number;
  first_name: string;
  last_name: string;
  gender: Gender;
  date_of_birth: Date;
  email: string;
  phone: string;
  current_city: string;
  current_country: string;
  profile_picture_url: string;
  bio: string;
  dept_id: number;
  graduation_year: number;
  cgpa: number;
  account_status: AccountStatus;
  created_at: Date;
  updated_at: Date;
}

export interface education {
  education_id: number;
  alumni_id: number;
  institution: string;
  degree_title: string;
  field_of_study: string;
  start_year: number;
  end_year: number;
  is_current: boolean;
}

export interface employment {
  employment_id: number;
  alumni_id: number;
  company_name: string;
  job_title: string;
  industry: string;
  city: string;
  country: string;
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
}

export interface events {
  event_id: number;
  event_name: string;
  event_type: EventType;
  description: string;
  event_date: Date;
  event_time: string;
  venue: string;
  city: string;
  country: string;
  is_virtual: boolean;
  virtual_link?: string;
  max_capacity: number;
  created_at: Date;
}

export interface event_registration {
  reg_id: number;
  event_id: number;
  alumni_id: number;
  registered_at: Date;
  attended: boolean;
}

export interface mentorship {
  mentorship_id: number;
  mentor_id: number;
  mentee_name: string;
  mentee_alumni_id: number;
  focus_area: string;
  start_date: Date;
  end_date?: Date;
  status: MentorshipStatus;
}

export interface users {
  user_id: number;
  alumni_id: number;
  password_hash: string;
  last_login: Date;
  created_at: Date;
}

export enum MentorshipStatus {
  Active = "Active",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export declare enum AccountStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum EventType {
  Reunion = "Reunion",
  Networking = "Networking",
  Workshop = "Workshop",
  Seminar = "Seminar",
}

// // API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CRAlumniDto {
  student_id: number;
  first_name: string;
  last_name: string;
  gender: Gender;
  date_of_birth: Date;
  email: string;
  phone: string;
  current_city: string;
  current_country: string;
  profile_picture_url: string;
  bio: string;
  dept_id: number;
  graduation_year: number;
  cgpa: number;
  account_status: AccountStatus;
}

export interface CRUserDto {
  alumni_id: number;
  password: string;
}

export interface CRMentorshipDto {
  mentor_id: number;
  mentee_name: string;
  mentee_alumni_id: number;
  focus_area: string;
  start_date: Date;
  end_date?: Date;
  status: MentorshipStatus;
}

export interface CRDepartmentDto {
  dept_code: string;
  dept_name: string;
}

export interface CREducationDto {
  alumni_id: number;
  institution: string;
  degree_title: string;
  field_of_study: string;
  start_year: number;
  end_year: number;
  is_current: boolean;
}

export interface CReventsDto {
  event_name: string;
  event_type: EventType;
  description: string;
  event_date: Date;
  event_time: string;
  venue: string;
  city: string;
  country: string;
  is_virtual: boolean;
  virtual_link?: string;
  max_capacity: number;
}

export interface CRRegistrationDto {
  event_id: number;
  alumni_id: number;
  attended: boolean;
}

export interface CREmploymentDto {
  alumni_id: number;
  company_name: string;
  job_title: string;
  industry: string;
  city: string;
  country: string;
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
}
export interface employmentStatusChangeDto {
  end_date?: Date;
  is_current: boolean;
}
