export interface IStudent {
  _id: string;
  id: string;
  user: IUser;
  name: IName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  academicSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  profileImage: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IUser {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IName {
  firstName: string;
  middleName: string;
  lastName: string;
}

interface IGuardian {
  father: IFather;
  mother: IMother;
}

interface IFather {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
}

interface IMother {
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
}
