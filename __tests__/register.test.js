import { createRequest, createResponse } from "node-mocks-http";
import register from "../src/pages/api/register";

const OK = "OK";
const ERROR_1 = "Method not allowed";
const ERROR_2 = "Mobile number is required";
const ERROR_3 = "Not valid Indonesian number (start with +62)";
const ERROR_4 = "Firstname is required";
const ERROR_5 = "Lastname is required";
const ERROR_6 = "Date of birth is not valid";
const ERROR_7 = "Email is required";
const ERROR_8 = "Email is not valid";
const ERROR_9 = "Cannot connect to Database";
const ERROR_10 = "Mobile number already exist";
const ERROR_11 = "Email already exist";
const ERROR_12 = "Unknown Error";

describe("POST /api/register", () => {
  test("Phone is empty", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: null,
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: "01",
          date: "01",
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_2,
      })
    );
  });

  test("Phone is not +62[number]", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "08123456789",
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: "01",
          date: "01",
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_3,
      })
    );
  });

  test("Phone contain character", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567abc",
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: "01",
          date: "01",
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_3,
      })
    );
  });

  test("firstname is required", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567",
        firstname: null,
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: "01",
          date: "01",
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_4,
      })
    );
  });

  test("lastname is required", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567",
        firstname: "Budi",
        lastname: null,
        birthdate: {
          year: "2020",
          month: "01",
          date: "01",
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_5,
      })
    );
  });

  test("date is invalid (31 February 2020)", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567",
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: "02",
          date: "31",
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_6,
      })
    );
  });

  test("date is invalid (Date not set)", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567",
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: "01",
          date: null,
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_6,
      })
    );
  });

  test("date is invalid (Month not set)", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567",
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: null,
          date: "01",
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_6,
      })
    );
  });

  test("date is invalid (Year not set)", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567",
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: null,
          month: "01",
          date: "01",
        },
        email: "budi@yanto.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_6,
      })
    );
  });

  test("email in empty", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567",
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: "01",
          date: "01",
        },
        email: null,
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_7,
      })
    );
  });

  test("email is not valid", async () => {
    let req = createRequest({
      method: "POST",
      body: {
        mobile: "+621234567",
        firstname: "Budi",
        lastname: "Yanto",
        birthdate: {
          year: "2020",
          month: "01",
          date: "01",
        },
        email: "budi.com",
      },
    });

    let res = createResponse();

    await register(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        detail: ERROR_8,
      })
    );
  });
});
