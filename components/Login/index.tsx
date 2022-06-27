// import React from 'react';
import styles from './Login.module.scss';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import AUTH_BASIC from '@graphql-documents/AUTH_BASIC.graphql';
import { toast, Toaster } from 'react-hot-toast';

import { get } from '@lib/utils';
import { useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
type FormInputs = {
  email: string;
  password: string;
};
const Login: React.FC = () => {
  const [Login] = useMutation(AUTH_BASIC);
  const rouer = useRouter();
  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (formData: FormInputs) => {
    console.log(formData, 'formData');
    const result = await Login({
      variables: {
        input: formData,
      },
    });
    const loginData = get(result, 'data.adminlogin');

    console.log(loginData, 'loginData');
    if (loginData?.data) {
      Router.push('/dashboard');
    } else {
      toast.error(loginData.message);
    }
  };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.loginImg}>
        <Image
          src="/images/Login.png"
          alt="Curv"
          width={800}
          height={990}
          objectFit={'cover'}
        />
      </div>
      <div className={styles.loginFormWrapper}>
        <div className={styles.Logo}>
          <Image src="/images/Logo.png" alt="Curv" width={200} height={50} />
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            rules={{ required: 'Email is required' }}
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                placeholder="Email"
                className={styles.formInput}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  label: {
                    color: '#ffffff',
                  },
                }}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                label="Password"
                placeholder="Password"
                className={styles.formInput}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  margin: '10px',
                  label: {
                    color: '#ffffff',
                  },
                }}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{ marginTop: '20px', width: '150px' }}
            disabled={!isValid || !isDirty}
          >
            LOGIN
          </Button>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
