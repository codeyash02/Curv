// import React from 'react';
import styles from './Login.module.scss';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
type FormInputs = {
  email: string;
  password: string;
};
const Login: React.FC = () => {
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
  const onSubmit = (formData: FormInputs) => {
    console.log(formData, 'formData');
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
            // disabled={!isValid || !isDirty}
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
