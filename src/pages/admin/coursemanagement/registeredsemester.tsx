import React, { useState } from "react";
import { Button, Dropdown, Table, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import {
  useGetAllSemesterRegistrationsQuery,
  useUpdateASemesterRegistrationMutation,
} from "../../../redux/features/admin/coursemanagement/semesterregistrationapi";
import moment from "moment";
import { items } from "../../../constants/status";
import { TResponse } from "../../../types/global";
import { toast } from "sonner";

interface DataType {
  key: React.Key;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

const RegisteredSemester: React.FC = () => {
  const { data, isFetching } = useGetAllSemesterRegistrationsQuery(undefined);
  const [updateRegistration] = useUpdateASemesterRegistrationMutation();
  const [id, setId] = useState();
  const handleStatus: MenuProps["onClick"] = (data) => {
    const update = {
      id,
      data: {
        status: data.key,
      },
    };
    console.log(update);
    const toastId = toast.loading("Updating, Please wait...");
    (updateRegistration(update) as Promise<TResponse>)
      .then((res) => {
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        }
        if (res.data) {
          toast.success(res.data.message, { id: toastId });
        }
      })
      .catch(() => {
        toast.error("Something went wrong", { id: toastId });
      });
  };
  const menuProps = { items, onClick: handleStatus };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Semester name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => {
        if (value === "COMPLETED") {
          return <Tag color="green">Completed</Tag>;
        } else if (value === "UPCOMING") {
          return <Tag color="red">Upcoming</Tag>;
        }
        return <Tag color="blue">{value}</Tag>;
      },
    },
    {
      title: "Start date",
      dataIndex: "startDate",
    },
    {
      title: "End date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button
              onClick={() => {
                setId(item.key);
              }}>
              Update
            </Button>
          </Dropdown>
        );
      },
      width: "1%",
    },
  ];

  const tableData = data?.data.map((semester) => ({
    key: semester._id,
    name: `${semester.academicSemester.name} ${semester.academicSemester.year}`,
    status: semester.status,
    startDate: moment(semester.startDate).format("MMMM"),
    endDate: moment(semester.endDate).format("MMMM"),
  }));

  return (
    <Table columns={columns} loading={isFetching} dataSource={tableData} />
  );
};

export default RegisteredSemester;
