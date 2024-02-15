import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicmanagement/academicsemesterapi";
import { TFilterQuery } from "../../../types/global";

interface DataType {
  key: React.Key;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
  },
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Year",
    dataIndex: "year",
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
  {
    title: "Action",
    render: () => {
      return <Button>Update</Button>;
    },
    width: "1%",
  },
];

const AcademicSemester: React.FC = () => {
  const [filterOption, setFilterOption] = useState<TFilterQuery[] | undefined>(
    undefined
  );

  const { data: semesterData, isFetching } =
    useGetAllSemestersQuery(filterOption);

  const tableData = semesterData?.data.map((semester) => ({
    key: semester._id,
    name: semester.name,
    code: `#${semester.code}`,
    year: semester.year,
    startMonth: semester.startMonth,
    endMonth: semester.endMonth,
  }));

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TFilterQuery[] = [];
      filters?.name?.forEach((name) => {
        queryParams.push({
          name: "name",
          value: name as string,
        });
      });
      setFilterOption(queryParams);
    }
  };

  return (
    <Table
      columns={columns}
      loading={isFetching}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
