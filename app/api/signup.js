export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fname, lname, email, password, password2 } = req.body;

    // Handle validation and business logic
    if (password !== password2) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Simulate user creation (replace with DB logic)
    res.status(200).json({ message: "User registered successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
