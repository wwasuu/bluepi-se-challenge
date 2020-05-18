import cn from "classnames";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { withRedux } from "../redux";
import { AuthLoggedInAction, UserSetAction } from "../redux/store";
import { AuthService, MeService } from "../service";
import { Spinner } from "../components";

interface IformValue {
  username: string;
  password: string;
}

function Lobby() {
  const { handleSubmit, register, errors } = useForm<IformValue>();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function onSubmit(values: IformValue) {
    login(values);
  }

  async function login(data: IformValue) {
    try {
      setLoading(true);
      const {
        data: { access_token, success },
      } = await AuthService.create(data);
      if (!success) {
        setLoading(false);
        return 
      }
      await cookie.set("access_token", access_token);
      const {
        data: { user },
      } = await MeService.get();
      dispatch(AuthLoggedInAction());
      dispatch(UserSetAction(user));
      router.push("/", "/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  console.log(errors);

  return (
    <div className="layout layout__auth">
      {isLoading && (
        <Spinner message="Accessing..." />
      )}
      <form className="auth__container" onSubmit={handleSubmit(onSubmit)}>
        <div className="text text--xxl">The BluePI Game</div>
        <input
          name="username"
          ref={register({
            required: true,
            pattern: /^[A-Za-z0-9]+$/i,
          })}
          className={cn("input input--extra-large border--pixel", {
            error: errors.username,
          })}
          placeholder="Username"
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          ref={register({
            required: true,
            minLength: 4,
          })}
          className={cn("input input--extra-large border--pixel", {
            error: errors.password,
          })}
          placeholder="Password"
          autoComplete="off"
        />
        <button
          type="submit"
          className="button button--extra-large button--block"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}

export default withRedux(Lobby);
