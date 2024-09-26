import { Button, TextField, Typography, Box } from "@mui/material";

/* eslint-disable react/prop-types */
const ConnectionPage = ({
  formInput,
  handleChange,
  handleFormAuthentification,
}) => {
  return (
    <Box className="page1" sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Bienvenue sur l&apos;application Let&apos;s send. Veuillez vous
        connecter pour accéder à nos services.
      </Typography>
      <form onSubmit={handleFormAuthentification}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            id="username"
            name="username"
            value={formInput.username}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            id="password"
            name="password"
            value={formInput.password}
            onChange={handleChange}
            required
          />
        </Box>
        <Button variant="contained" type="submit" color="primary">
          Se connecter
        </Button>
      </form>
    </Box>
  );
};

export default ConnectionPage;
