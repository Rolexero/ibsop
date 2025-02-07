import { Modal, ModalProps } from "antd";
import React from "react";
import tw, { styled } from "twin.macro";

interface IModalProps extends ModalProps {
  titleHeader: React.ReactNode;
  width?: number;
}

const BaseModal: React.FC<IModalProps> = (props: IModalProps) => {
  return (
    <Modal
      {...props}
      closeIcon={false}
      className="modalStyle"
      title={props.titleHeader}
      width={props?.width ?? 550}
    >
      {props.children}
    </Modal>
  );
};

export const BaseModalHeader = styled.p`
  ${tw`  text-[16px]`}
`;

export default BaseModal;
