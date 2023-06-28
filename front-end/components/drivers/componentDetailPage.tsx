import { customDataCategory } from "@/utils/interfaces";
import { Col, Container, Row } from "react-bootstrap";
import CustomTableLive from "../tables/CustomTableLive";
import CustomVerticalChart_MultipleData from "../charts/customVerticalChartTwoBars";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { capitalizeFirstLetter, capitalizeFirstLetterOfEachWord } from "@/utils/functions";
import CustomVerticalChart from "../charts/customVerticalChartOneBar";

export default function DriversDetailsComponent({dataInput, category="", years=[], navItems=[]}:{dataInput: customDataCategory, category:string, years:[], navItems:[]}) {
    const {query: {name, year}} = useRouter();
    const [ data, setData ]  = useState<{[key:string]:any}[]>([]);
	
	const colors = [
		window.getComputedStyle(document.documentElement).getPropertyValue('--red-500-rgb'),
		window.getComputedStyle(document.documentElement).getPropertyValue('--orange-400-rgb'),
	]
	
	useEffect(()=>{
		let dataSets:{[key:string]:any}[] =[];
		if(dataInput.content?.length>0){
			// if(category == "races"){
				dataInput.content.map((item:any, index:number, arr:([] | undefined)[])=>{
					dataSets.push({
						// id:item[dataInput.keys.findIndex(i=> i.toLowerCase() =="driver")].match(/\b(\w)/gi).join(""),
						name:item[0],
                        id:item[0],
						// [dataInput.keys.find(i=> i.toLowerCase() =="laps")?.toLowerCase()||'laps']:parseInt(item[dataInput.keys.findIndex(i=> i.toLowerCase() =="laps")]),
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
                <h1>F1 - {typeof name == 'string' && capitalizeFirstLetterOfEachWord(name.split("-").join(" "))}</h1>
            </Col>
        </Row>
    </Container>
    <Container fluid>
        <Row>
            <Col>
                <CustomTableLive
                title={`${typeof name == 'string' && capitalizeFirstLetterOfEachWord(name.split("-").join(" "))}`}
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
                xAxisTitle="Grand prix"
                data={data}
                title={`${typeof name == 'string' && capitalizeFirstLetterOfEachWord(name.split("-").join(" "))}'S PTS in ${dataInput.year}`}
                colors={colors}
                />
            </Col>
        </Row>
    </Container>
    </>
    )
}