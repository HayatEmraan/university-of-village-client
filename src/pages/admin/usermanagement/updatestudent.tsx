import { useParams } from "react-router-dom";

const UpdateStudent = () => {
  const { studentId } = useParams();

  return (
    <div>
      <h1>This is update student {studentId}</h1>
    </div>
  );
};

export default UpdateStudent;
