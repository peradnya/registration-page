import "reflect-metadata";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { createConnection, getConnectionManager } from "typeorm";
import { User } from "../../entity/user";
import OrmConfig from "../../../orm.config";

// Regex to validate email name
const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const OK = "OK";

// Error Code
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

/**
 * Register REST API of Application.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST" && req.body !== null) {
    let mobile = req.body.mobile ?? "";
    let firstname = req.body.firstname ?? "";
    let lastname = req.body.lastname ?? "";
    let birthdate =
      (req.body.birthdate?.year ?? "") +
      (req.body.birthdate?.month ?? "") +
      (req.body.birthdate?.date ?? "");
    let gender = req.body.gender ?? "";
    let email = req.body.email ?? "";

    // check mobile number
    if (mobile.length === 0) {
      res.status(400).json({ type: 2, detail: ERROR_2 });
      return;
    }
    if (!mobile.startsWith("+62") || isNaN(mobile.substring(1))) {
      res.status(400).json({ type: 3, detail: ERROR_3 });
      return;
    }

    // check firstname
    if (firstname.length === 0) {
      res.status(400).json({ type: 4, detail: ERROR_4 });
      return;
    }

    // check lastname
    if (lastname.length === 0) {
      res.status(400).json({ type: 5, detail: ERROR_5 });
      return;
    }

    // check birthdate
    if (
      birthdate.length > 0 &&
      !moment(birthdate, "YYYYMMDD", true).isValid()
    ) {
      res.status(400).json({ type: 6, detail: ERROR_6 });
      return;
    }

    // check email
    if (email.length === 0) {
      res.status(400).json({ type: 7, detail: ERROR_7 });
      return;
    }
    if (!EMAIL_REGEX.test(email.toLowerCase())) {
      res.status(400).json({ type: 8, detail: ERROR_8 });
      return;
    }

    try {
      // check if db connection already created.
      if (!getConnectionManager().has("default")) {
        await createConnection(OrmConfig);
      }

      const db = getConnectionManager().get("default");

      let user = new User();
      user.mobile = mobile;
      user.firstname = firstname;
      user.lastname = lastname;
      user.birthdate = birthdate.length === 0 ? null : birthdate;
      user.gender = gender.length === 0 ? null : gender;
      user.email = email;

      try {
        await db.manager.save(user);
        res.status(200).json({ detail: OK });
      } catch (err) {
        if (err.code === "23505") {
          if (err.detail.includes("(mobile)")) {
            res.status(400).json({ type: 10, detail: ERROR_10 });
          } else if (err.detail.includes("(email)")) {
            res.status(400).json({ type: 11, detail: ERROR_11 });
          }
        }

        res.status(400).json({ type: 12, detail: ERROR_12 });
      }
    } catch (err) {
      res.status(400).json({ type: 9, detail: ERROR_9 });
    }
  } else {
    res.status(405).json({ type: 1, detail: ERROR_1 });
  }
};
