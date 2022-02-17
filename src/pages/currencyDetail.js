import React from "react";
import {Card, CardContent, CardHeader, Link, Grid} from "@mui/material";
import {fetchRates} from "../repository";
import {useLocation} from "@reach/router";
import {parse} from "query-string";
import {baseCurrency} from "../constants";
import {Launch} from "@mui/icons-material";

const CurrencyDetail = () => {
	const [rates, setRates] = React.useState([]);
	const [description, setDescription] = React.useState("");
	
	const location = useLocation();
	
	React.useEffect(() => {
		const searchParams = parse(location.search);
		searchParams && setDescription(searchParams.description);
		
		fetchRates()
			.then((data) => setRates(data))
			.catch(console.error);
	}, []);
	
	return (
		<>
			<h2>FX Rates</h2>
			<span>{description}</span>
			
			<br /><br/>
			
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				{rates.map((el) => (
					<Grid item xs={2} sm={4} md={4} key={el.id}>
						<Card>
							<CardHeader
								title={<h6 style={{fontWeight: "bold"}}>{el.currency}</h6>}
								subheader={<h2>{el.rate} <small>{baseCurrency}</small></h2>}
							/>
							<CardContent>
								<Link target={"_blank"} href={el.url}>
									<Launch />
								</Link>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	)
};

export default CurrencyDetail;
