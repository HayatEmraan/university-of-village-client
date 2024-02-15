import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authapi";
import { useAppDispatch } from "../redux/hooks";
import { decodeToken } from "../utils/decode";
import { setCredentials } from "../redux/features/auth/authslice";
import { TUser } from "../types";
import UVForm from "../components/form/vform";
import UVInput from "../components/form/vinput";
import { FieldValues } from "react-hook-form";


const Login = () => {
  const navigate = useNavigate();

  const defaultValues = {
    id: "UOV-A-00001",
    password: "admin123",
  };
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const loading = toast.loading("Please wait...", { duration: 2000 });
    try {
      const res = await login(data).unwrap();
      const user = (await decodeToken(res.data.accessToken)) as TUser;
      dispatch(setCredentials({ user, token: res.data.accessToken }));
      toast.success("Login Success", { id: loading, duration: 1000 });
      return navigate(`/${user.role}`);
    } catch (error) {
      toast.error("Login Failed", { id: loading, duration: 1000 });
    }
  };

  return (
    <div
      style={{
        maxWidth: "475px",
        margin: "10% auto",
        border: "1px solid red",
        borderRadius: "5px",
        padding: "20px",
      }}>
      <UVForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <h2>Login</h2>
        <div>
          <label htmlFor="id">User ID</label>
          <UVInput name="id" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <UVInput name="password" type="password" />
        </div>
        <Button htmlType="submit">Login</Button>
      </UVForm>
    </div>
  );
};

export default Login;
