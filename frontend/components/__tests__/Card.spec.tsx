import React from "react";
import { shallow } from "enzyme";
import { Card } from "..";

describe("card component", () => {
  it("should render '1' when card open give isOpen is true and value is 1", () => {
    const wrapper = shallow(<Card isOpen value={1} openCard={() => {}} />);
    expect(wrapper.find(".back").text()).toMatch("1");
  });

  it("should render '' when give isOpen is false and value is 1", () => {
    const wrapper = shallow(
      <Card isOpen={false} value={1} openCard={() => {}} />
    );
    expect(wrapper.find(".back").text()).toMatch("");
  });

  it("should have class '.card--open' when give isOpen is true", () => {
    const wrapper = shallow(<Card isOpen value={1} openCard={() => {}} />);
    expect(wrapper.find(".card--open")).toHaveLength(1);
  });

  it("should call fn when click component", () => {
    const stub = jest.fn();
    const wrapper = shallow(<Card isOpen={false} value={1} openCard={stub} />);
    wrapper.simulate("click");
    expect(stub).toHaveBeenCalled();
  });
});
