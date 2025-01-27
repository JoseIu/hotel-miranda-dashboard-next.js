'use client';
import { updateUser } from '@/app/actions/users/updateUser';
import { InputForm } from '@/components/ui/inpot-form/InputForm';
import { SelecForm } from '@/components/ui/select-form/SelecForm';
import { NewUser, User } from '@/interfaces/user';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { USER_STATUS, UserChema, UserS } from './userChema';

type Props = {
  user: User | undefined;
};
export const EditUserForm = ({ user }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserS>({
    resolver: zodResolver(UserChema),
  });

  const [isSubmiting, startSubmiting] = useTransition();

  const onHandleSubmit: SubmitHandler<UserS> = async (data) => {
    const { name, email, phone, status, jog_description } = data;

    const newUser: Partial<NewUser> = {
      name,
      email,
      phone,
      status,
      jog_description,
      user_image: faker.image.avatar(),
    };
    startSubmiting(async () => {
      const userUpdated = await updateUser(user!.id, newUser);

      if (userUpdated?.error) {
        toast.error('Error to update user');
        return;
      }

      toast.success('User updated successfully');
      router.push('/users');
    });
  };

  useEffect(() => {
    if (!user) return;
    reset(user);
  }, [user, reset]);

  return (
    <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="form__row">
        <InputForm
          label="Full Name"
          id="user-name"
          error={errors['name']}
          placeholder="User name..."
          {...register('name')}
        />
        <InputForm
          label="Email"
          id="user-email"
          type="email"
          error={errors['email']}
          placeholder="user email..."
          {...register('email')}
        />
      </div>

      <div className="form__row">
        <InputForm
          label="Phone"
          id="user-phone"
          error={errors['phone']}
          placeholder="user phone..."
          {...register('phone')}
        />
        <SelecForm
          label="Status"
          id="user-status"
          error={errors['status']}
          placeHolder="---select a status--"
          options={USER_STATUS.map((status) => ({
            label: `${status.toLocaleLowerCase()}`,
            value: status === 'Active' ? 'true' : 'false',
          }))}
          {...register('status', {
            setValueAs: (value) => value === 'true',
          })}
        />
      </div>
      <div className="form__row">
        <textarea
          className="form__area"
          placeholder="Write short description..."
          {...register('jog_description')}
        />
      </div>

      <button className="form__submit" type="submit">
        {isSubmiting ? 'Adding...' : 'Save changes'}
      </button>
    </form>
  );
};
