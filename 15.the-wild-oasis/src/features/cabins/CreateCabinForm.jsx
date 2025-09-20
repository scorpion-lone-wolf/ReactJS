import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { createCabinMutate, isCreating } = useCreateCabin();

  const { updateCabinMutate, isUpdating } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;
  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(data => {
        // check if new image is uplaod or not
        const isImageUploaded = typeof data.image !== "string";
        if (isEditSession)
          updateCabinMutate(
            {
              updatedCabin: { ...data, image: isImageUploaded ? data.image[0] : data.image },
              id: editId,
            },
            {
              onSuccess: () => {
                onCloseModal?.();
              },
            }
          );
        else
          createCabinMutate(
            { ...data, image: data.image[0] },
            {
              onSuccess: () => {
                reset();
                onCloseModal?.();
              },
            }
          );
      })}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          autoComplete="off"
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          autoComplete="off"
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "capacity cant be less then 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          autoComplete="off"
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          autoComplete="off"
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: value => {
              return (
                +value <= +getValues("regularPrice") || "Discount should be less then regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", { required: isEditSession ? false : "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => {
            // Conditionally calling the fn because this form migh not be used in a model.
            // So call this fn is not passed will create an error
            onCloseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
