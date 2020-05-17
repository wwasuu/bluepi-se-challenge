import { useState } from 'react'
import { useForm } from "react-hook-form";
import cookie from 'js-cookie';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AuthService, MeService } from "../service";
import { withRedux } from '../redux'
import { AuthLoggedInAction, UserSetAction } from '../redux/store'

function Lobby() {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false)
  const router = useRouter();

  function onSubmit(values: any) {
    login(values);
  }

  async function login(data: any) {
    try {
      setLoading(true)
      const { data: { access_token } } = await AuthService.create(data);
      await cookie.set('access_token', access_token)
      const { data: { user } } =  await MeService.get()
      dispatch(AuthLoggedInAction())
      dispatch(UserSetAction(user))
      router.push('/', '/')
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  return (
    <div className="layout layout__auth">
       {isLoading && (
        <div className="overlay__container">
          <div className="overlay__content">
            <div className="text text--xxl">Accessing...</div>
          </div>
        </div>
      )}
      <form className="auth__container" onSubmit={handleSubmit(onSubmit)}>
        <div className="text text--xxl">The BluePI Game</div>
        <input
          name="username"
          ref={register({
            required: "Required",
          })}
          className="input input--extra-large border--pixel"
          placeholder="Username"
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          ref={register({
            required: "Required",
          })}
          className="input input--extra-large border--pixel"
          placeholder="Password"
          autoComplete="off"
        />
        <button className="button button--extra-large button--block">
          Start Game
        </button>
      </form>
    </div>
  );
}

export default withRedux(Lobby);
