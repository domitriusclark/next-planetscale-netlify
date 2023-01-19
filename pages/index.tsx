import * as React from "react";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await fetch(`/.netlify/functions/create-rsvp`, {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
      }),
    });
  };

  return (
    <div>
      <h1>Email RSVP Demo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
