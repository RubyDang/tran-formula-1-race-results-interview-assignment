import { customDataCategory } from "@/utils/interfaces";
import { Col, Container, Row } from "react-bootstrap";
import CustomTableLive from "../tables/CustomTableLive";
import CustomVerticalChart from "../charts/customVerticalChartTwoBars";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { capitalizeFirstLetter, capitalizeFirstLetterOfEachWord, getColorFromCSS } from "@/utils/functions";

export default function RacesDetailsComponent({dataInput, category="", years=[], navItems=[]}:{dataInput: customDataCategory, category:string, years:[], navItems:[]}) {
    const {query: {name, year}} = useRouter();
    const [ data, setData ]  = useState<{[key:string]:any}[]>([]);
	const colors = [
        getColorFromCSS(document.documentElement, "--orange-500-rgb"),
        getColorFromCSS(document.documentElement, "--red-500-rgb"),
    ]
	useEffect(()=>{
		let dataSets:{[key:string]:any}[] =[];
		if(dataInput.content?.length>0){
			// if(category == "races"){
				dataInput.content.map((item:any, index:number, arr:([] | undefined)[])=>{
					dataSets.push({
						id:item[dataInput.keys.findIndex(i=> i.toLowerCase() =="driver")].match(/\b(\w)/gi).join(""),
						name:item[dataInput.keys.findIndex(i=> i.toLowerCase() =="driver")],
						[dataInput.keys.find(i=> i.toLowerCase() =="laps")?.toLowerCase()||'laps']:parseInt(item[dataInput.keys.findIndex(i=> i.toLowerCase() =="laps")]),
						[dataInput.keys.find(i=> i.toLowerCase() =="pts")?.toLowerCase()||'pts']:parseInt(item[dataInput.keys.findIndex(i=> i.toLowerCase() =="pts")])

					})
				})
			// }
		}
		setData(dataSets)
	},[dataInput, category])

    return(
    <>
    <Container fluid className="custom-heading">
        <Row>
            <Col>
            <h1>F1 - Grand Prix: {typeof name == 'string' && capitalizeFirstLetterOfEachWord(name.split("-").join(" "))}</h1>
            </Col>
        </Row>
    </Container>
    <Container fluid>
        <Row>
            <Col>
                <CustomTableLive
                title={`Grand Prix: ${typeof name == 'string' && (capitalizeFirstLetterOfEachWord(name.split("-").join(" ")) + " - ")}Race Result`}
                data={dataInput}
                category={category}
                years={years}
                navItems={navItems}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <CustomVerticalChart
                xAxis="name"
                yAixs={[]}
                data={data}
                title={`Driver's laps and PTS in ${dataInput.year}`}
                colors={colors}
                />
            </Col>
        </Row>
    </Container>
    </>
    )
}