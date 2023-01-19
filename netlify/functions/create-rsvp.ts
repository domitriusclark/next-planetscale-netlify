import type { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";
import { sendEmail } from "@netlify/emails";

export const handler: Handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;

  const { body } = event;

  const { name, email } = JSON.parse(body ?? "{}");

  await connection.execute("INSERT INTO rsvp (name, email) VALUES (?, ?)", [
    name,
    email,
  ]);

  // http://localhost:8888/.netlify/functions/emails for preview

  await sendEmail({
    template: "rsvp",
    from: "domitriusaclark@gmail.com",
    parameters: {
      name,
    },
    subject: "RSVP Confirmation",
    to: email,
  });

  return {
    statusCode: 201,
  };
});

// What are some next steps?

// 1. Handle errors around both the database execution and the email sending and make sure we return the right status code
// 2. Add an event table and update your rsvp table to have a foreign key to the event table
// 3. Pull an RSVP from another platform (Discord for exampl)
