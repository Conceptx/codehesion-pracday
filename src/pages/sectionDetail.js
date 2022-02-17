import React from "react";
import {useLocation} from "@reach/router";
import {parse} from "query-string";

const SectionDetail = () => {
	const [action, setAction] = React.useState("");
	const [section, setSection] = React.useState("");
	
	const location = useLocation();
	
	React.useEffect(() => {
		const searchParams = parse(location.search);
		
		searchParams && setSection(searchParams.section);
		searchParams && setAction(searchParams.action);
	}, []);
	
	return (
		<>
			<h2>{section}</h2>
			<h5>{action}</h5>
		</>
	)
};

export default SectionDetail;
