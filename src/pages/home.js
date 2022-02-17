import React from "react";
import {fetchNews} from "../repository";
import {Box, Card, CardContent, CardHeader, CardMedia, Link} from "@mui/material";

const Home = () => {
	const [news, setNews] = React.useState([]);
	
	React.useEffect(() => {
		fetchNews()
			.then((data) => setNews(data))
			.catch(console.error);
	}, []);
	
	return (
		<>
			<h2>HOME</h2>
			<span>Browse the news</span>
			
			<br></br>
			
			{
				news.map((el) => (
					<Card key={el.id} sx={{mt: 6, display: "flex"}}>
						<Box
							sx={{
								mb: 4
							}}
						>
							<img
								src={`${el.url_to_image}`}
								alt={el.source}
								loading="lazy"
								style={{
									width: 360,
									height: 360,
									objectFit: "cover",
									objectPosition: "center center",
								}}
							/>
						</Box>
						<Box>
							<CardHeader
								title={<h6>{el.title}</h6>}
								subheader={<Link href={el.url}>Read More</Link>}
							/>
							<CardContent>
								<p> {el.description} </p>
								<p> Source: {el.source} </p>
							</CardContent>
						</Box>
					</Card>
				))
			}
		</>
		
	)
}

export default Home;
