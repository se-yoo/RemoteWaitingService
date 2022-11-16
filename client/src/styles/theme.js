import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary",
        variant: "contained"
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontWeight: 700,
          borderRadius: 9999,
          fontSize: "24px",
          lineHeight: "29px",
          height: "60px",
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
          },
          "&.Mui-disabled":{
            background:"#D5D5D5"
          },
          ...(ownerState.variant === "text" && {
            background: 'white',
            color: theme.palette[ownerState.color || "primary"].main,
            fontWeight: 400,
            padding: "0.2rem 0.5rem",
            height: "unset",
            "&:hover": {
              boxShadow: "none",
              background: "transparent",
              opacity: "0.8"
            }
          }),
          ...(ownerState.type === "translucent" && {
            background: `${theme.palette[ownerState.color || "primary"].main}1a`,
            border: `1px solid ${theme.palette[ownerState.color || "primary"].main}`,
            color: theme.palette[ownerState.color || "primary"].main,
            "&:hover": {
              boxShadow: "none",
              background: `${theme.palette[ownerState.color || "primary"].main}0d`,
            }
          }),
          ...(ownerState.type === "innerTable"  && {
            border: "1px solid #BCBCBC",
            background: "#FFFFFF",
            color: "#000000",
            "&:hover": {
              boxShadow: "none",
              background: "transparent",
              opacity: "0.8"
            }
          }),
          ...(ownerState.variant === "outlined" && {
            background: 'white',
            color: theme.palette[ownerState.color || "primary"].main,
            border: `2px solid ${theme.palette[ownerState.color || "primary"].main}`,
            "&:hover": {
              background: "transparent",
              opacity: "0.8",
              border: `2px solid ${theme.palette[ownerState.color || "primary"].main}`,
            }
          }),
          ...(ownerState.customsize === "small"  && {
            height: 44,
            fontSize: 20,
            borderRadius: 22
          }),
          ...(ownerState.customsize === "x-small"  && {
            borderRadius: "16px",
            fontSize: "16px",
            height: "32px",
            minWidth: "110px",
            fontWeight: 400,
          })
        })
      }
    },
    MuiTextField: {
      defaultProps: {
        color: "primary",
        fullWidth: true
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          "& fieldset": {
            borderRadius: ownerState.multiline ? 20 : 9999,
            borderColor: theme.palette[ownerState.color || "primary"].main,
          },
          "&:hover fieldset": {
            borderColor: theme.palette[ownerState.color || "primary"].main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette[ownerState.color || "primary"].main,
          },
          "& .MuiInputBase-input": {
            padding: ownerState.multiline ? "8px 10px" : "20px 30px"
          }
        })
      }
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          "& fieldset": {
            borderRadius: 9999,
            borderColor: theme.palette.primary.main
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
          "& .MuiInputBase-input": {
            padding: "20px 30px"
          }
        })
      }
    },
    MuiInputLabel: {
      defaultProps: {
        selectlabel: "false"
      },
      styleOverrides: {
        root: {
          "&[data-shrink=true]": {
            padding: "0 4px"
          },
          "&[data-shrink=false]": {
            padding: "4px 16px",
            lineHeight: "23px"
          }
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderTop: "1px solid #496F46",
          borderBottom: "1px solid #496F46"
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            color: "#000000",
            fontWeight: 700,
            fontSize: 16,
            borderBottom: "1px solid #BCBCBC"
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#000000",
          fontSize: 16,
          borderBottom: "unset"
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.type === "collapse" && {
            "& .MuiTableCell-root": {
              padding: 0
            },
            "& .MuiCollapse-wrapper": {
              padding: "32px 56px",
              background: `${theme.palette[ownerState.color || "primary"].main}08`
            },
          })
        })
      }
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPagination-ul": {
            justifyContent: "center"
          },
          "& .MuiPaginationItem-root": {
            fontSize: 20
          },
          "& .Mui-selected.MuiPaginationItem-root": {
            background: "unset",
            fontWeight: 700
          }
        }
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