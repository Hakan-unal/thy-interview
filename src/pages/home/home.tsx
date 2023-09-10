import { useMemo, useState } from "react";
import { Row, Form, DatePicker, Select, Input, Popover, Button, Radio, Col } from "antd";
import { showNotification } from "../../components/general/notification";
import type { DatePickerProps } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { BiSolidPlaneLand, BiSolidPlaneTakeOff } from "react-icons/bi";
import { MdDateRange, MdPersonAddAlt1 } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import data from "../../staticData/flights.json"
import useWindowSize from "../../hooks/useWindowSize";
import useLocalStorage from "../../hooks/useLocalStorage";
import FormItem from "antd/es/form/FormItem";





const Home = (props: any) => {
    const size = useWindowSize()
    const [form] = Form.useForm();
    const [open, setOpen] = useState<boolean>(false);
    const person = Form.useWatch('person', form);
    const [lsFormData, setLsFormData] = useLocalStorage("searchData", {})

    const onFinishFailed = () => {
        showNotification("warning", "Uyarı", "Eksik alanları doldurup devam edebilirsiniz", null)
    };

    const onFinish = (data: any) => {

        setLsFormData(data)
    };


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const handlePerson = (type: string) => {
        switch (type) {
            case "decrease": form.setFieldValue("person", person !== 1 ? person - 1 : 1); break;
            case "increase": form.setFieldValue("person", person + 1); break;
            default: console.log("hellow world"); break;
        }
    }



    const PopoverContent = () => {
        return (<Row>
            <Col xs={24}>
                <FormItem
                    name="class"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Radio.Group >
                        <Radio value={1}>Economy Class</Radio>
                        <Radio value={2}>Business Class</Radio>
                    </Radio.Group>
                </FormItem>
            </Col>
            <Col xs={24}>

                <FormItem
                    name="person"
                    label="Yolcu"
                    rules={[{ required: true, message: 'Required' }]}

                >
                    <Row>

                        <Col xs={{ span: 3, offset: 4 }}>
                            <Button onClick={() => handlePerson("decrease")}  >-</Button>
                        </Col>
                        <Col xs={{ span: 3, offset: 0 }}>
                            <Button disabled >{person} </Button>

                        </Col>
                        <Col xs={{ span: 3, offset: 0 }}>
                            <Button onClick={() => handlePerson("increase")}>+</Button>
                        </Col>

                    </Row>
                </FormItem>

            </Col>

        </Row>
        )
    }



    useMemo(() => {


        console.log(data)

    }, [data])


    return (<Row justify={"center"}>
        <Form
            requiredMark={false}
            layout={size.width > 820 ? "inline" : "horizontal"}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            wrapperCol={{ span: 24 }}
            size="large"
            initialValues={{ person: 1, class: 1 }}
        >
            <Form.Item

                name="origin"
                rules={[{ required: true, message: 'Required' }]}
            >
                <Select
                    style={{ width: "180px" }}
                    suffixIcon={<BiSolidPlaneTakeOff size={20} />}
                    placeholder="Nereden"
                    options={[
                        { value: 'origin', label: data.flights[0].originAirport.city.name + " (" + data.flights[0].originAirport.city.code + ")" },
                    ]}
                />
            </Form.Item>

            <Form.Item
                name="destination"
                rules={[{ required: true, message: 'Required' }]}
            >
                <Select

                    style={{ width: "180px" }}
                    suffixIcon={<BiSolidPlaneLand size={20} />}
                    placeholder="Nereye"
                    options={[
                        { value: 'destination', label: data.flights[0].destinationAirport.city.name + " (" + data.flights[0].destinationAirport.city.code + ")" },
                    ]}
                />

            </Form.Item>

            <Form.Item
                name="date"
                rules={[{ required: true, message: 'Required' }]}
            >
                <DatePicker

                    suffixIcon={<MdDateRange size={20} />}
                    placeholder="Tarih"
                    onChange={onChange} />
            </Form.Item>

            <Form.Item name="temp">
                <Popover
                    content={<PopoverContent />}
                    title="Kabin ve Yolcu Seçimi"
                    trigger="click"
                    placement="bottom"
                    open={open}
                    onOpenChange={() => setOpen(!open)}
                >
                    <Button block >
                        <MdPersonAddAlt1 size={20} />
                    </Button>

                </Popover>
            </Form.Item>
            <Form.Item>
                <Button block danger htmlType="submit">
                    <AiOutlineArrowRight size={20} />
                </Button>
            </Form.Item>

        </Form>

    </Row>
    );
};

export default Home;