import React from "react";
import {Card, CardContent, CardHeader, Link, Stack} from "@mui/material";
import {useLocation, useParams} from "@reach/router";
import {parse} from "query-string";

const ItemDetail = () => {
	const [name, setName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [sections, setSections] = React.useState([]);
	
	const location = useLocation();
	const params = useParams();
	
	React.useEffect(() => {
		const searchParams = parse(location.search);
		
		searchParams && setDescription(searchParams.description);
		
		setName(params.name);
		
		const sectionData = localStorage.getItem("sections");
		
		sectionData && setSections(JSON.parse(sectionData));
	}, []);
	
	return (
		<>
			<h2>{name.toUpperCase()}</h2>
			<span>{description}</span>
			
			<br /><br/>
			
			{
				sections.map((el, index) => {
					return (
						<Card key={index} sx={{ maxWidth: 360, mt: 6 }}>
							<CardHeader
								title={<h6>{el.name}</h6>}
								subheader={el.description}
							/>
							<CardContent>
								<Stack spacing={4}>
									{
										el.items.map((item, itemIndex) => (
											<Link key={itemIndex} href={`/home/${name}/section?section=${el.name}&action=${item.name}`}>{item.name}</Link>
										))
									}
								</Stack>
							</CardContent>
						</Card>
					)
				})
			}
		</>
	)
};

export default ItemDetail;
