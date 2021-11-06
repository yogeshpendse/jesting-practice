import getUser from "./get-user";
import * as axios from "axios";

jest.mock("axios");

describe("get user service", () => {
  test("should return user when API call is successful", async () => {
    axios.get.mockResolvedValue({
      data: { name: "tanay", age: 30, address: "Bokaro" },
    });
    const user = await getUser();
    expect(user).toEqual({ name: "tanay", age: 30, address: "Bokaro" });
  });
  test("should return error when API call is fails", async () => {
    axios.get.mockRejectedValue({
      response: { data: "it's not here!" },
    });
    axios.isAxiosError.mockImplementation((_) => true);
    const user = await getUser();
    expect(user).toEqual("it's not here!");
  });
  test("should return error when API call is fails outta scope", async () => {
    axios.get.mockRejectedValue({
      response: { data: { errorMessage: "it's not here!" } },
    });
    axios.isAxiosError.mockImplementation((_) => false);
    const user = await getUser();
    expect(user).toEqual({ errorMessage: "something went wrong!" });
  });
});
