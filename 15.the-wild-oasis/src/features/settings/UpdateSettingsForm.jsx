import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settingData, isLoading: settingLoading } = useSettings();
  const { updateSettingMutate, isUpdating: settingUpdating } = useUpdateSettings();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { ...settingData },
  });

  // When data comes from API, update form values
  useEffect(() => {
    if (settingData) reset(settingData);
  }, [settingData, reset]);

  if (settingLoading) return <Spinner />;
  const isChanging = settingLoading || settingUpdating;
  function handleUpdate(e, fieldNmae) {
    const value = e.target.value;
    if (!value) return;
    updateSettingMutate({ [fieldNmae]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength")}
          disabled={isChanging}
          onBlur={e => {
            handleUpdate(e, "minBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength")}
          disabled={isChanging}
          onBlur={e => {
            handleUpdate(e, "maxBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking")}
          disabled={isChanging}
          onBlur={e => {
            handleUpdate(e, "maxGuestsPerBooking");
          }}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfastPrice")}
          disabled={isChanging}
          onBlur={e => {
            handleUpdate(e, "breakfastPrice");
          }}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
