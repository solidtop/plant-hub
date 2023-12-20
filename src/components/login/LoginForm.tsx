import { FC, FormEvent, useState } from "react";
import UsernameField from "../input/UsernameField";
import PasswordField from "../input/PasswordField";
import PrimaryButton from "../button/PrimaryButton";

type LoginFormProps = {
  onLoginComplete: () => void;
};

const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
  ev.preventDefault();
};

const LoginForm: FC<LoginFormProps> = ({ onLoginComplete }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <UsernameField
        username={username}
        setUsername={setUsername}
        errorMessage=""
      />
      <PasswordField
        password={password}
        setPassword={setPassword}
        errorMessage=""
      />
      <PasswordField
        label="Confirm password"
        id="confirmPassword"
        password={confirmPassword}
        setPassword={setConfirmPassword}
        errorMessage=""
      />

      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
  );
};

export default LoginForm;
