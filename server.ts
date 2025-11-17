// server.ts - Next.js Standalone
// import { setupSocket } from "@/lib/socket";
import { createServer } from "http";
import next from "next";
// import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const currentPort = 3000;
const hostname = "0.0.0.0";

// Custom server
async function createCustomServer() {
  try {
    // Create Next.js app
    const nextApp = next({
      dev,
      dir: process.cwd(),
      // In production, use the current directory where .next is located
      conf: dev ? undefined : { distDir: "./.next" },
    });

    await nextApp.prepare();
    const handle = nextApp.getRequestHandler();

    // Create HTTP server that will handle Next.js requests
    const server = createServer((req, res) => {
      handle(req, res);
    });

    // Socket.IO setup commented out for production
    /*
    // Setup Socket.IO
    const io = new Server(server, {
      path: "/api/socketio",
      cors: {
        origin:
          process.env.NODE_ENV === "production"
            ? ["https://yourdomain.com"] // Ganti dengan domain production Anda
            : ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    setupSocket(io);
    */

    // Start the server
    server.listen(currentPort, hostname, () => {
      console.log(`> Ready on http://${hostname}:${currentPort}`);
      console.log(
        `> Socket.IO server running at ws://${hostname}:${currentPort}/api/socketio`
      );
    });
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
}

// Start the server
createCustomServer();
