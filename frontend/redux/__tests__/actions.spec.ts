import {
  AuthLoggedInAction,
  UserSetAction,
  ErrorSetAction,
  ErrorClearAction,
  SpinnerSetAction,
  SpinnerClearAction,
} from "../store";

describe("actions", () => {
  it("should create an auth logged in action", () => {
    const expectedAction = {
      type: "AUTH/LOGGED_IN",
    };
    expect(AuthLoggedInAction()).toEqual(expectedAction);
  });

  it("should create set user action", () => {
    const user = {
      id: 1,
      username: "test",
      best_time: 10,
      best_score: 12,
      created_at: "00-00-0000 00:00:00",
      updated_at: "00-00-0000 00:00:00",
    };
    const expectedAction = {
      type: "USER/SET",
      payload: user,
    };
    expect(UserSetAction(user)).toEqual(expectedAction);
  });

  it("should create set error action", () => {
    const error = {
      message: "something went wrong"
    }
    const expectedAction = {
      type: "ERROR/SET",
      payload: error,
    };
    expect(ErrorSetAction(error)).toEqual(expectedAction);
  });

  it("should create clear error action", () => {
    const expectedAction = {
      type: "ERROR/CLEAR",
    };
    expect(ErrorClearAction()).toEqual(expectedAction);
  });

  it("should create set error action", () => {
    const spinner = {
      message: "Loading..."
    }
    const expectedAction = {
      type: "SPINNER/SET",
      payload: spinner,
    };
    expect(SpinnerSetAction(spinner)).toEqual(expectedAction);
  });

  it("should create clear spinner action", () => {
    const expectedAction = {
      type: "SPINNER/CLEAR",
    };
    expect(SpinnerClearAction()).toEqual(expectedAction);
  });
});
