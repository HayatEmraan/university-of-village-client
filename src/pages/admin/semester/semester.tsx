import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicmanagement/academicsemesterapi";

const Semester = () => {
  const semester = useGetAllSemestersQuery(undefined);
  console.log(semester);

  return <div>/* Your TSX here */</div>;
};

export default Semester;
