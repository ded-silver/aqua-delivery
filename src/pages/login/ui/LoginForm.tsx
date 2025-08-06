import { Form as AntForm, Button, Input, message as antMessage } from 'antd';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../model/useLogin';
import styles from './LoginForm.module.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const onSubmit = async (values: { login: string; password: string }) => {
    const success = await login(values.login, values.password);

    if (success) {
      antMessage.success('Успешный вход');
      navigate('/messages');
    } else {
      antMessage.error(error || 'Ошибка входа');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.titleMain}>Pockets</div>
        <div className={styles.titleSecondary}>Welcome to Pockets! 👋🏻</div>
        <div className={styles.titleTertiary}>
          Please sign-in to your account and start the adventure
        </div>

        <Form onSubmit={onSubmit}>
          {({ handleSubmit, submitting }) => (
            <AntForm
              layout="vertical"
              onFinish={handleSubmit}
              className={styles.form}
            >
              <Field
                name="login"
                validate={(v) => (!v ? 'Required' : undefined)}
              >
                {({ input, meta }) => (
                  <AntForm.Item
                    label={
                      <span className={styles.formItemLabel}>Login</span>
                    }
                    validateStatus={meta.error && meta.touched ? 'error' : ''}
                    help={meta.touched && meta.error}
                    className={styles.formItem}
                  >
                    <Input
                      {...input}
                      placeholder="123@123.123"
                      className={styles.input}
                    />
                  </AntForm.Item>
                )}
              </Field>

              <Field
                name="password"
                validate={(v) => (!v ? 'Required' : undefined)}
              >
                {({ input, meta }) => (
                  <AntForm.Item
                    label={
                      <span className={styles.formItemLabel}>Password</span>
                    }
                    validateStatus={meta.error && meta.touched ? 'error' : ''}
                    help={meta.touched && meta.error}
                    className={styles.formItem}
                  >
                    <Input.Password
                      {...input}
                      placeholder="••••••••"
                      className={styles.input}
                    />
                  </AntForm.Item>
                )}
              </Field>

              <Button
              type="primary"
              loading={loading || submitting}
              htmlType="submit"
              className={styles.button}
              block
              >
                Login
                </Button>
                {error && (
                  <div className={styles.formError}>
                    {error}
                  </div>
                )}
            </AntForm>
          )}
        </Form>
      </div>
    </div>
  );
};
