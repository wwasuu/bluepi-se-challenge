import React from "react";
import { shallow } from "enzyme";
import { Error } from "..";

describe("error component", () => {
  it("should show message", () => {
    const wrapper = shallow(<Error message="Something went wrong." />);
    expect(wrapper.find(".error__message").text()).toMatch("Something went wrong.");
  });
});
