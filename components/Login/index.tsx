import React from 'react';
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
  return (
    <div className={styles.Wrapper}>
      <div className={styles.loginImg}>
        <Image src="/images/Login.png" alt="Curv" width={800} height={840} />
      </div>
      <div className={styles.loginForm}>
        <div className={styles.Logo}>
          <Image src="/images/Logo.png" alt="Curv" width={200} height={50} />
        </div>
        <form>
          <Controller
            name="email"
            rules={{ required: 'Email is required' }}
            control={control}
            render={() => (
              <TextField
                label="Email"
                placeholder="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  label: {
                    color: '#fff',
                  },
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={() => (
              <TextField
                label="Password"
                placeholder="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  margin: '10px',
                  label: {
                    color: '#fff',
                  },
                }}
              />
            )}
          />

          <div className={styles.loginButton}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              // style={{ marginTop: '20px' }}
              // disabled={!isValid || !isDirty}
            >
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
