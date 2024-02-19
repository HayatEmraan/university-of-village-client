export type TFaculty = {
  name: Name;
  _id: string;
  id: string;
  user: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyNo: string;
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: string;
  academicFaculty: string;
  designation: string;
  profileImage: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
}
