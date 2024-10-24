import { Button, Input } from "@nextui-org/react";
import { UseFormRegister } from 'react-hook-form';

const ForgotPasswordForm = ({
  onSubmit,
  register,
  forgotError
}: {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<any>;
  forgotError?: string;
}) => {
  return (
    <div className="p-2 flex-col items-start">
      <form noValidate onSubmit={onSubmit} className="mt-5 flex items-start flex-col">
        <div className="w-full flex flex-col gap-5">
        <Input isRequired type='email' label='email' className='max-w-xs' {...register('email', { required: true })} />
          {forgotError && <p className="text-red-500">{forgotError}</p>}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
