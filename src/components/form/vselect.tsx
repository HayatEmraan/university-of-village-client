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
  multi?: "multiple" | undefined;
};

const UVSelect = ({ Options, label, name, disabled, multi }: TUVSelect) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            mode={multi}
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
