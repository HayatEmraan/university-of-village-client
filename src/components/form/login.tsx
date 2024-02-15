import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authapi";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/features/auth/authslice";
import { decodeToken } from "../../utils/decode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUser } from "../../types";

interface IFormInput {
  id: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "UOV-A-00001",
      password: "admin",
    },
  });

  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSignUp = async (data: IFormInput) => {
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
      style={{ maxWidth: "665px", margin: "0 auto" }}
      className="min-h-screen bg-gray-100 max-w-[665px]">
      <div className="container mx-auto">
        <form
          className="flex items-center justify-center min-h-screen text-gray-600 body-font"
          onSubmit={handleSubmit(handleSignUp)}>
          <div className="w-96 bg-gray-100 rounded-lg p-8 flex flex-col">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Login
            </h2>
            <div className="relative mb-5">
              <label htmlFor="id">User ID</label>
              <input
                style={{
                  border: "1px solid red",
                  padding: "5px",
                  borderRadius: "5px",
                  display: "block",
                }}
                {...register("id")}
                className="w-full"
                id="User ID"
                name="id"
                type="User ID"
                required
              />
            </div>
            <div className="relative mb-3">
              <label htmlFor="password">Password</label>
              <input
                className="w-full"
                style={{
                  border: "1px solid red",
                  padding: "5px",
                  borderRadius: "5px",
                  display: "block",
                }}
                {...register("password")}
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
            <Button htmlType="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
