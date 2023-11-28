import config from '../../config';
import { Student } from '../student/student.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not WebGLActiveInfo, use default password
  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';
  //set  manually generated it
  userData.id = '2030100001';

  //create a user
  const result = await User.create(userData);

  //create a student
  if (Object.keys(result).length) {
    // set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id; //reference id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
