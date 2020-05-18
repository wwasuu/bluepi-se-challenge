import React from "react";
import { shallow } from "enzyme";
import { Spinner } from "..";

describe("spinner component", () => {
  it("should show message", () => {
    const wrapper = shallow(<Spinner message="Loading..." />);
    expect(wrapper.find(".text").text()).toMatch("Loading...");
  });
});
