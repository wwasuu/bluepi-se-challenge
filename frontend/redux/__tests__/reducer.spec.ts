import { reducer } from "../store";

describe("reducer", () => {
  const user = {
    id: 1,
    username: "test",
    best_time: 10,
    best_score: 12,
    created_at: "00-00-0000 00:00:00",
    updated_at: "00-00-0000 00:00:00",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      spinner: null,
      auth: false,
      user: null,
    });
  });

  it("should handle AUTH/LOGGED_IN", () => {
    const expected = {
      error: null,
      spinner: null,
      auth: true,
      user: null,
    };
    expect(
      reducer(undefined, {
        type: "AUTH/LOGGED_IN",
      })
    ).toEqual(expected);
  });

  it("should handle USER/SET", () => {
    const expected = {
      error: null,
      spinner: null,
      auth: false,
      user,
    };
    expect(
      reducer(undefined, {
        type: "USER/SET",
        payload: user,
      })
    ).toEqual(expected);
  });

  it("should handle ERROR/SET", () => {
    const expected = {
      error: {
        message: "Someting went wrong.",
      },
      spinner: null,
      auth: false,
      user: null,
    };
    expect(
      reducer(undefined, {
        type: "ERROR/SET",
        payload: { message: "Someting went wrong." },
      })
    ).toEqual(expected);
  });

  it("should handle ERROR/CLEAR", () => {
    const expected = {
      error: null,
      spinner: null,
      auth: false,
      user: null,
    };
    expect(
      reducer(undefined, {
        type: "ERROR/CLEAR",
      })
    ).toEqual(expected);
  });

  it("should handle SPINNER/SET", () => {
    const expected = {
      error: null,
      spinner: {
        message: "Loading...",
      },
      auth: false,
      user: null,
    };
    expect(
      reducer(undefined, {
        type: "SPINNER/SET",
        payload: { message: "Loading..." },
      })
    ).toEqual(expected);
  });

  it("should handle SPINNER/CLEAR", () => {
    const expected = {
      error: null,
      spinner: null,
      auth: false,
      user: null,
    };
    expect(
      reducer(undefined, {
        type: "SPINNER/CLEAR",
      })
    ).toEqual(expected);
  });


});
