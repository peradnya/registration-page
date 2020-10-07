import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body !== null) {
      let mobile: string = req.body.mobile ?? "";
      let firstname: string = req.body.firstname ?? "";
      let lastname: string = req.body.lastname ?? "";
      let birthdate: string =
        (req.body.birthdate?.year ?? "") +
        "-" +
        (req.body.birthdate?.month ?? "") +
        "-" +
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
        birthdate !== "--" &&
        !moment(birthdate, "YYYY-MM-DD", true).isValid()
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

      res.status(200).json({ detail: "ok" });
    } else {
      res.status(400).json({ type: "body", detail: "Form is empty" });
    }
  } else {
    res.status(405).json({ type: "method", detail: "Method not allowed" });
  }
};
