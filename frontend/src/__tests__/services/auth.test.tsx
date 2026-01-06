import axios from "axios";
import {
  registerUser,
  loginUser,
  verifyOtp,
  logoutUser,
} from "../../services/auth";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Auth Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("registerUser calls register API with correct payload", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { message: "Registered" },
    });

    const payload = {
      email: "test@test.com",
      password: "123456",
    };

    const res = await registerUser(payload);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3000/auth/register",
      payload
    );
    expect(res).toEqual({ message: "Registered" });
  });

  test("loginUser calls login API with correct payload", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { token: "abc" },
    });

    const payload = {
      email: "test@test.com",
      password: "123456",
    };

    const res = await loginUser(payload);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3000/auth/login",
      payload
    );
    expect(res).toEqual({ token: "abc" });
  });

  test("verifyOtp calls verify-otp API with email and otp", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: "jwt-token" },
    });

    const res = await verifyOtp("test@test.com", "123456");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3000/auth/verify-otp",
      {
        email: "test@test.com",
        otp: "123456",
      }
    );

    expect(res).toEqual({ access_token: "jwt-token" });
  });

  test("logoutUser sends token in authorization header", async () => {
    mockedAxios.post.mockResolvedValueOnce({});

    await logoutUser("token-123");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3000/auth/logout",
      {},
      {
        headers: {
          Authorization: "Bearer token-123",
        },
      }
    );
  });
});
