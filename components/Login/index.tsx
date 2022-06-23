import React from 'react';
import styles from './Login.module.scss';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
const index = () => {
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
          <TextField
            label="Email"
            placeholder="Email"
            sx={{
              label: {
                color: '#fff',
              },
            }}
          />
          <TextField
            label="Password"
            placeholder="Password"
            sx={{
              margin: '10px',
              label: {
                color: '#fff',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            // size="large"
            // style={{ marginTop: '20px' }}
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default index;
