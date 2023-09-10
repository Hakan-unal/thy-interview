import { useState } from "react";
import { Row, Col, Card, Button, Space, Divider, Typography, Checkbox, List } from "antd";
import useWindowSize from "../../hooks/useWindowSize";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";


const { Text } = Typography;


const SearchResult = (props: any) => {
    const { data, promotion } = props
    const size = useWindowSize()
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [selectedData, setSelectedData] = useState<any | null>(null)
    const [selectedType, setSelectedType] = useState<any | null>(null)
    const [lsSelectedFlight, setLsSelectedFlight] = useLocalStorage("selectedFlight", undefined)

    const handleSelect = (index: number, type: string, data: any) => {
        setSelectedData(data)
        setSelectedIndex(index)
        setSelectedType(type)
        switch (type) {
            case "e": setSelectedData(data.fareCategories.ECONOMY.subcategories); break;
            case "b": setSelectedData(data.fareCategories.BUSINESS.subcategories); break;
            default: setSelectedData(null); break;

        }
    }

    const handleFlightSelect = (obj: any) => {
        setLsSelectedFlight(obj)
    }


    return (
        <Card style={{ width: size.width / 1.2 }} headStyle={{ textAlign: "right", backgroundColor: "#212529", color: "white" }} title={<div >Sıralama Kriteri <Button ghost >Ekonomi Ücreti</Button> <Button ghost >Kalkış</Button></div>}>

            {data.flights.map((flight: any, index: number) => {
                return (<>
                    <Card key={index} style={{ marginTop: 10 }} hoverable>
                        <Row>
                            <Col xs={24} md={12}>
                                <Row>
                                    <Col xs={24} md={4}>
                                        <Space direction="vertical">

                                            <Text>
                                                {flight.arrivalDateTimeDisplay}
                                            </Text>
                                            <Text disabled>
                                                {flight.originAirport.city.code}
                                            </Text>
                                            <Text disabled>
                                                {flight.originAirport.city.name}
                                            </Text>
                                        </Space>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Divider type="horizontal" />
                                    </Col>
                                    <Col xs={24} md={4}>
                                        <Space direction="vertical">

                                            <Text>
                                                {flight.departureDateTimeDisplay}
                                            </Text>
                                            <Text disabled>
                                                {flight.destinationAirport.city.code}
                                            </Text>
                                            <Text disabled>
                                                {flight.destinationAirport.city.name}
                                            </Text>
                                        </Space>
                                    </Col>
                                    <Col xs={{ span: 24, offset: 0 }} md={{ span: 6, offset: 2 }}>
                                        <Space direction="vertical">

                                            <Text disabled>
                                                Uçuş Süresi
                                            </Text>
                                            <Text >
                                                {flight.flightDuration}
                                            </Text>
                                        </Space>
                                    </Col>
                                </Row>


                            </Col>
                            <Col xs={24} md={6}>
                                <Checkbox onChange={() => handleSelect(index, "e", flight)} checked={selectedType === "e" && selectedIndex === index}>
                                    <Text underline disabled>Economy</Text>

                                </Checkbox>
                                <Space direction="vertical">
                                    <Text disabled>Yolcu Başına</Text>
                                    <Text >{flight.fareCategories.ECONOMY.subcategories[0].price.currency} {flight.fareCategories.ECONOMY.subcategories[0].price.amount}</Text>
                                </Space>


                            </Col>
                            <Col xs={24} md={6}>
                                <Checkbox onChange={() => handleSelect(index, "b", flight)} checked={selectedType === "b" && selectedIndex === index}>
                                    <Text underline disabled>Business</Text>
                                </Checkbox>
                                <Space direction="vertical">
                                    <Text disabled>Yolcu Başına</Text>
                                    <Text >{flight.fareCategories.BUSINESS.subcategories[0].price.currency} {flight.fareCategories.BUSINESS.subcategories[0].price.amount}</Text>
                                </Space>
                            </Col>
                        </Row>

                    </Card>
                    {(index === selectedIndex) &&
                        <Row>

                            {selectedData?.map((obj: any, index1: number) => {
                                return (<Col key={index1} xs={24} md={8}>
                                    <List
                                        style={{ height: 260 }}

                                        header={
                                            <Row gutter={[24, 24]} style={{ backgroundColor: "#c7c4bd30" }}>
                                                <Col xs={10} >
                                                    <Text>{obj.brandCode}</Text>
                                                </Col>
                                                <Col xs={{ span: 10, offset: 4 }} >
                                                    <Text>{obj.price.currency} </Text>
                                                    <Text strong>{obj.price.amount}</Text>
                                                </Col>
                                            </Row>
                                        }
                                        bordered
                                        dataSource={obj.rights}
                                        renderItem={(item: string) => (
                                            <List.Item>
                                                <Typography.Text >{item}</Typography.Text>
                                            </List.Item>
                                        )}
                                    />
                                    <Link to="result">
                                        <Button disabled={promotion && index1 !== 0} onClick={() => handleFlightSelect(obj)} danger block>Uçuşu Seç</Button>
                                    </Link>
                                </Col>
                                )
                            })

                            }

                        </Row>
                    }
                </>

                )
            })}

        </Card>
    );
};

export default SearchResult;
