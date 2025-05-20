import { QueryClient } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  isServer: true,
}));

describe("getQueryClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("makeQueryClient configuration", () => {
    it("should create a QueryClient with correct default options", () => {
      const queryClient = getQueryClient();

      expect(queryClient).toBeInstanceOf(QueryClient);
      expect(queryClient.getDefaultOptions().queries?.staleTime).toStrictEqual(
        60 * 1000
      );
    });

    it("should configure dehydrate options correctly", () => {
      const queryClient = getQueryClient();
      const dehydrateOptions = queryClient.getDefaultOptions().dehydrate;

      expect(dehydrateOptions).toBeDefined();
      expect(typeof dehydrateOptions?.shouldDehydrateQuery).toStrictEqual(
        "function"
      );
    });
  });

  describe("server environment", () => {
    it("should create a new QueryClient instance on each call in server environment", () => {
      const client1 = getQueryClient();
      const client2 = getQueryClient();

      expect(client1).not.toBe(client2);
    });
  });

  describe("browser environment", () => {
    jest.mock("@tanstack/react-query", () => ({
      ...jest.requireActual("@tanstack/react-query"),
      isServer: false,
    }));

    it("should create a new QueryClient instance only on first call", () => {
      const client1 = getQueryClient();
      const client2 = getQueryClient();
      const client3 = getQueryClient();

      expect(client1).toStrictEqual(client2);
      expect(client2).toStrictEqual(client3);
    });
  });
});
