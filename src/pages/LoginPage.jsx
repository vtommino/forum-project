import LoginForm from "../features/authentication/components/LoginForm";
import RegisterContainer from "../features/authentication/components/RegisterContainer";

export default function LoginPage() {
  return (
    <>
      <div className="bg-white p-8 rounded-xl max-w-sm mx-auto mt-32">
        <LoginForm />
        <hr className="my-6 border" />
        <RegisterContainer />
      </div>
    </>
  );
}
