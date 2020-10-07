import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../../entity/user";

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body !== null) {
      let mobile: string = req.body.mobile ?? "";
      let firstname: string = req.body.firstname ?? "";
      let lastname: string = req.body.lastname ?? "";
      let birthdate: string =
        (req.body.birthdate?.year ?? "") +
        (req.body.birthdate?.month ?? "") +
        (req.body.birthdate?.date ?? "");
      let email: string = req.body.email ?? "";

      // check mobile number
      if (mobile.length === 0) {
        res
          .status(400)
          .json({ type: "mobile", detail: "Mobile number is required" });
        return;
      }
      if (!mobile.startsWith("+62")) {
        res.status(400).json({
          type: "mobile",
          detail: "Not Indonesian mobile number (start with +62)",
        });
        return;
      }

      // check firstname
      if (firstname.length === 0) {
        res
          .status(400)
          .json({ type: "firstname", detail: "Firstname is required" });
        return;
      }

      // check lastname
      if (lastname.length === 0) {
        res
          .status(400)
          .json({ type: "lastname", detail: "Lastname is required" });
        return;
      }

      // check birthdate
      if (
        birthdate.length > 0 &&
        !moment(birthdate, "YYYYMMDD", true).isValid()
      ) {
        res
          .status(400)
          .json({ type: "birthdate", detail: "Day of birth is not valid" });
        return;
      }

      // check email
      if (email.length === 0) {
        res.status(400).json({ type: "email", detail: "Email is required" });
        return;
      }
      if (!emailRegex.test(email.toLowerCase())) {
        res.status(400).json({ type: "email", detail: "Email is not valid" });
        return;
      }

      const connectionOptions = await getConnectionOptions();

      Object.assign(connectionOptions, { entities: [User] });

      createConnection(connectionOptions)
        .then(async (connection) => {
          let user = new User();

          user.mobile = mobile;
          user.firstname = firstname;
          user.lastname = lastname;
          user.birthdate = birthdate.length === 0 ? null : birthdate;
          user.gender = req.body.gender;
          user.email = email;

          await connection.manager.save(user);

          await connection.close();

          res.status(200).json({ detail: "ok" });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ type: "body", detail: "DB error" });
        });
    } else {
      res.status(400).json({ type: "body", detail: "Form is empty" });
    }
  } else {
    res.status(405).json({ type: "method", detail: "Method not allowed" });
  }
};
