import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/material";

function LoadAnim({open}) {
	return (
		<Backdrop open={open}>
			<CircularProgress color="secondary" />
		</Backdrop>
	);
}

export default LoadAnim;
