import HHmmss from "../HHmmss"

describe("HHmmss", () => {
    it("should return 00:00:10 give arg 60", () => {
      const expected = "00:00:10" 
      expect(HHmmss(10)).toEqual(expected);
    });

    it("should return 00:00:00 give arg 0", () => {
        const expected = "00:00:00" 
        expect(HHmmss(0)).toEqual(expected);
      });
})
