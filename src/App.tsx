import { Typography } from "@gympass/tai-chi";
import { Box } from "@mui/material";

export const App = () => (
  <Box
    justifyContent="center"
    alignItems="center"
    display="flex"
    width="100%"
    sx={{ minHeight: "100vh" }}
  >
    <Typography variant="body1" weight="bold">
      Hello World
    </Typography>
  </Box>
);
