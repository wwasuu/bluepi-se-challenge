import cookie from "js-cookie";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Spinner } from "../components";
import { withRedux } from "../redux";
import {
  AuthLoggedInAction,
  UserSetAction,
  ApplicationState,
} from "../redux/store";
import { MeService } from "../service";
import "../styles/main.scss";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector((state: ApplicationState) => state.error);
  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    validateAuthentication();
  }, []);

  async function validateAuthentication() {
    try {
      const accessToken = cookie.get("access_token");
      if (!accessToken) {
        router.push("/lobby", "/lobby");
        setAuthenticating(false);
        return
      }
      
      const {
        data: { user },
      } = await MeService.get();
      dispatch(AuthLoggedInAction());
      dispatch(UserSetAction(user));
    } catch (error) {
      console.log(error);
    }
    setAuthenticating(false);
  }

  if (isAuthenticating) {
    return (
      <div className="layout">
        <Spinner message="Identifying..." />
      </div>
    );
  }

  return (
    <>
      {error && <Error message={error.message} />}
      <Component {...pageProps} />
    </>
  );
}

export default withRedux(App);
