import BaseModal, { BaseModalHeader } from "@/components/BaseModal";
import { Button, Form, Input, InputNumber, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Cancel01Icon } from "hugeicons-react";
import tw, { styled } from "twin.macro";
import { IUserForm } from "../utils";
import { useFormik } from "formik";
import { userValidationSchema } from "../utils/schema";
import { useAddUser, useEditUser } from "@/services/useUserService";

type UsermodalProps = {
  closeModal: VoidFunction;
  isOpen: boolean;
  action?: "create" | "update";
  currData?: IUserForm;
};

const UserModal = ({
  closeModal,
  isOpen,
  currData,
  action = "create",
}: UsermodalProps) => {
  const addUser = useAddUser();
  const editUser = useEditUser();

  const userInitialValues = {
    username: currData?.username ?? "",
    user_type: currData?.user_type ?? "",
    name: currData?.name ?? "",
    email: currData?.email ?? "",
    phone: currData?.phone ?? "",
    id: currData?.id ?? "",
  };

  const { values, handleChange, touched, errors, setFieldValue, handleSubmit } =
    useFormik<IUserForm>({
      initialValues: userInitialValues,
      validationSchema: userValidationSchema,
      validateOnMount: false,
      validateOnBlur: false,
      validateOnChange: false,
      enableReinitialize: true,
      onSubmit(values: IUserForm) {
        if (action === "create") {
          addUser.mutate(values, {
            onSuccess: () => {
              closeModal();
            },
          });
        } else {
          console.log(values);
          // Update user logic
          editUser.mutate(values, {
            onSuccess: () => {
              closeModal();
            },
          });
        }
      },
    });

  return (
    <BaseModal
      okButtonProps={{
        form: "userForm",
      }}
      titleHeader={
        <div className="flex justify-between">
          <BaseModalHeader>
            {action === "create" ? "Create User" : "Update User"}
          </BaseModalHeader>
          <Button className="border-none " onClick={closeModal}>
            <Cancel01Icon size={24} color={"#000000"} />
          </Button>
        </div>
      }
      destroyOnClose
      footer={null}
      open={isOpen}
      onCancel={closeModal}
      maskClosable={false}
    >
      <Form
        size={"large"}
        onFinish={() => handleSubmit()}
        layout="vertical"
        id="topupWalletForm"
      >
        <FormFieldWrapper>
          <FormItem
            className="w-full"
            label={<p>Name</p>}
            help={touched.name && errors.name ? errors.name : ""}
            validateStatus={touched.name && errors.name ? "error" : undefined}
          >
            <Input
              className="w-full"
              name={"name"}
              placeholder="Name"
              onChange={handleChange}
              value={values.name}
            />
          </FormItem>

          <FormItem
            className="w-full"
            label={<p>Email</p>}
            help={touched.email && errors.email ? errors.email : ""}
            validateStatus={touched.email && errors.email ? "error" : undefined}
          >
            <Input
              className="w-full"
              type="email"
              name={"email"}
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
            />
          </FormItem>
        </FormFieldWrapper>

        <FormFieldWrapper>
          <FormItem
            className="w-full"
            label={<p>Username</p>}
            help={touched.username && errors.username ? errors.username : ""}
            validateStatus={
              touched.username && errors.username ? "error" : undefined
            }
            hasFeedback={!!errors.username}
          >
            <Input
              className="!w-full"
              name={"username"}
              placeholder="Username"
              onChange={handleChange}
              value={values.username}
            />
          </FormItem>
          <FormItem
            className="!w-full"
            label={<p className="">Phone</p>}
            help={touched.phone && errors.phone ? errors.phone : ""}
            validateStatus={touched.phone && errors.phone ? "error" : undefined}
            hasFeedback={!!errors.phone}
          >
            <InputNumber
              className="!w-full"
              name={"phone"}
              onChange={(val) => {
                setFieldValue("phone", val);
              }}
              placeholder=" Phone"
              value={values.phone}
            />
          </FormItem>
        </FormFieldWrapper>

        <FormItem
          className="w-full"
          label={<p>User type</p>}
          help={touched.user_type && errors.user_type ? errors.user_type : ""}
          validateStatus={
            touched.user_type && errors.user_type ? "error" : undefined
          }
        >
          <Select
            className="w-full"
            value={values.user_type}
            placeholder="User type"
            onChange={(value) => setFieldValue("user_type", value)}
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
          />
        </FormItem>

        <ActionButtonWrapper className="flex flex-col md:flex-row">
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            loading={addUser.isPending || editUser.isPending}
            className=" bg-primary text-white !hover:text-white"
            htmlType="submit"
          >
            {action === "create" ? "Create User" : "Edit User"}
          </Button>
        </ActionButtonWrapper>
      </Form>
    </BaseModal>
  );
};

export const FormFieldWrapper = styled.div`
  ${tw`w-full flex flex-col gap-4 md:flex-row`}
  p {
    ${`text-base text-secondary m-0`}
  }
`;

export const ActionButtonWrapper = styled.div`
  ${tw`flex justify-end  w-full gap-4  mt-[16px]`}
`;

export default UserModal;
