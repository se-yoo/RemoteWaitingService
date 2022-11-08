import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontWeight: 700,
          borderRadius: 9999,
          boxShadow: "none",
          textAlign: "center",
          border: "none",
          padding: "0.5rem 1.5rem",
          cursor: "pointer",
          position: "relative",
          color: "#FFFFFF",
          background: theme.palette[ownerState.color || "primary"].main,
          "&:before": {
            opacity: 0,
            backgroundColor: "#FFFFFF",
            borderRadius: "inherit",
            bottom: 0,
            color: "inherit",
            content: "''",
            left: 0,
            pointerEvents: "none",
            position: "absolute",
            right: 0,
            top: 0,
            transition: "opacity .2s cubic-bezier(.4,0,.6,1)"
          },
          "&:hover": {
            boxShadow: "none",
            backgroundColor: theme.palette[ownerState.color || "primary"].main
          },
          "&:hover:before": {
            opacity: "0.08"
          }
        })
      }
    }
  },
  palette: {
    primary: {
      main: "#496F46"
    },
    yellow: {
      main: "#DBBD70"
    },
    grey: {
      main: "#A6A6A6"
    },
    red: {
      main: "#CA3737"
    }
  }
});