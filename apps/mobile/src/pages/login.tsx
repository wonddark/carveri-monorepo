import LogoFullVertical from "@carveri/shared/components/logos/LogoFullVertical.tsx";
import { OtpLoginForm } from "@carveri/shared/components/auth";

type LoginProps = Record<string, never>;

function Login(props: Readonly<LoginProps>) {
  const {} = props;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-center">
            <LogoFullVertical className="h-auto w-full max-w-24" />
          </div>
          <OtpLoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
