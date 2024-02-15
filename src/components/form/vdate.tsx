import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

const UVDate = ({ name, label }: { name: string; label?: string }) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item label={label}>
          <DatePicker
            onChange={(e) => onChange(e?.format("YYYY-MM-DD"))}
            style={{ width: "100%" }}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UVDate;
