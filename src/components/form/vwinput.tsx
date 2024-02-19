import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const VWInput = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label?: string;
  onInputChange: boolean;
}) => {
  const { control } = useFormContext();
  const inputValue = {
    control,
    name,
  };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Input {...field} id={name} type={type} />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default VWInput;
