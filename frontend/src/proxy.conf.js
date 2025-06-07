const PROXY_CONFIG = [
  {
    context: [
      "/api/Workspace",
      "/api/Availability",
      "/api/workspaces",
      "/api/Booking",
      "/api/Photo",
      "/api/Coworking",
    ],
    target: "https://localhost:7088",
    secure: false,
    changeOrigin: true,
  },
];
module.exports = PROXY_CONFIG;
