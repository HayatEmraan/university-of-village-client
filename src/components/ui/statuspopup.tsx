import React, { useState } from "react";
import { Button, Modal } from "antd";

type TStatusPopUp = {
  id: string;
  name: string;
};

const StatusPopUp = ({ id, name }: TStatusPopUp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(id, name);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Block</Button>
      <Modal
        title="Block User !"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>Are you sure you want to block {name}?</p>
      </Modal>
    </>
  );
};

export default StatusPopUp;
