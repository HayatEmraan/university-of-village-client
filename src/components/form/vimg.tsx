import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const UVImg = ({ name, label }: { name: string; label?: string }) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Input type="file" onChange={(e) => onChange(e.target.files?.[0])} />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UVImg;
