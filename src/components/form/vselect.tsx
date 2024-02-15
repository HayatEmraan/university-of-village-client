import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TOptions = {
  value: string | number;
  label: string | number;
  disabled?: boolean;
};

type TUVSelect = {
  Options: TOptions[];
  label: string;
  name: string;
  disabled?: boolean;
};

const UVSelect = ({ Options, label, name, disabled }: TUVSelect) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            style={{ width: "100%" }}
            disabled={disabled}
            options={Options}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UVSelect;
