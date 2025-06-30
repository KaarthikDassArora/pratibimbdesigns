import { VercelRequest, VercelResponse } from "@vercel/node";
import { DemoResponse } from "../shared/api";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const response: DemoResponse = {
      message: "Hello from Express server",
    };
    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
