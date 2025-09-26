import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signupMutate, isPending: isSigningup } = useSignup();
  const { register, formState, handleSubmit, watch, reset } = useForm();
  const { errors } = formState;
  // watch will look into password field
  const password = watch("password");

  function onSubmit({ fullName, email, password }) {
    signupMutate({ fullName, email, password }, { onSettled: reset });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register("fullName", { required: true })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSigningup}
          type="email"
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide valid email",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          disabled={isSigningup}
          type="password"
          id="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSigningup}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: true,
            validate: value => value === password || "Password do not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isSigningup}>
          Cancel
        </Button>
        <Button disabled={isSigningup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
