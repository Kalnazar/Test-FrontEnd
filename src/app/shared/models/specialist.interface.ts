export interface Specialist {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: Date | null;
  location: string | null;
  education: string;
  occupation: string | null;
  professionalSkills: string[] | null;
  phoneNumber: string | null;
  password: String;
}
