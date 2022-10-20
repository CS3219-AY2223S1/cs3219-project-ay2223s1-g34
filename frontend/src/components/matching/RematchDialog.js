import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

export default function RematchDialog({
    openRematch,
    handleCancelRematch,
    handleRematch,
}) {
    return (
        <Dialog open={openRematch}>
            <DialogTitle
                align="center"
                sx={{
                    fontWeight: "700",
                    fontSize: "0.4em",
                    fontFamily: "Poppins",
                }}
            >
                Matching failed.
                <br />
                Try looking for a match again?
            </DialogTitle>

            <DialogActions>
                <Button
                    autoFocus
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        fontSize: "0.3em",
                        fontFamily: "Poppins",
                    }}
                    onClick={handleCancelRematch}
                >
                    Cancel
                </Button>
                <Button
                    autoFocus
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        fontSize: "0.3em",
                        fontFamily: "Poppins",
                    }}
                    onClick={handleRematch}
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
