import { Alert, AlertTitle } from "@mui/material";

export default function EventError( {message} ) {
	return (
		<Alert variant="outlined" severity="error">
			<AlertTitle>Error</AlertTitle>
			{message}
		</Alert>
	);
}