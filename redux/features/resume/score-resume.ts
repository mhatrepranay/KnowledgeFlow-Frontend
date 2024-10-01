// client/pages/api/score-resume.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/score-resume`, {
      method: "POST",
      body: req.body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in scoring resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
