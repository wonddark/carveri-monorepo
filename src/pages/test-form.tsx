import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button.tsx";
import { IconEraser, IconSend } from "@tabler/icons-react";
import { Input } from "@/components/ui/input.tsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field.tsx";
import { Activity } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

function TestForm() {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Must have a valid email format")
          .required("Field required"),
        password: yup
          .string()
          .min(8, "Minimum of 8 chars is required")
          .required("Field required"),
      }),
    ),
  });

  const { handleSubmit, control, reset } = methods;

  const onSubmit = handleSubmit((data) => {
    console.info(data);
    reset();
  });
  const onReset = () => reset();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-xs">
        <Card>
          <CardHeader>
            <CardTitle>Testing Form Validation</CardTitle>
            <CardDescription>
              Try to insert invalid email or password shorten than 8 chars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldSet>
              <FieldGroup>
                <Controller
                  control={control}
                  name="email"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Field data-invalid={invalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        aria-invalid={invalid}
                        {...field}
                        placeholder="user@example.com"
                        type="email"
                      />
                      <Activity mode={invalid ? "visible" : "hidden"}>
                        <FieldError errors={[error]} />
                      </Activity>
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Field data-invalid={invalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        aria-invalid={invalid}
                        {...field}
                        placeholder="********"
                        type="password"
                      />
                      <Activity mode={invalid ? "visible" : "hidden"}>
                        <FieldError errors={[error]} />
                      </Activity>
                    </Field>
                  )}
                />
                <Field orientation="horizontal">
                  <Button>
                    <IconSend /> Send data
                  </Button>
                  <Button variant="secondary" type="reset" onClick={onReset}>
                    <IconEraser />
                    Clear form
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default TestForm;
