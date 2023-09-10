
import { useMemo, useState } from "react";
import { Row, Popover, Table, Button, Space, Drawer, Form, Input, Tooltip } from "antd"
import { showNotification } from "./components/general/notification";
import { PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { BiTrashAlt, BiPencil } from "react-icons/bi";

const deletePopoverContent = (
  <div>
    <p>Click for delete</p>
  </div>
);

const editPopoverContent = (
  <div>
    <p>Click for edit</p>
  </div>
);




type FormValues = {
  name: string,
  description: string,
  price: number,
  key?: number,
  id: number
}


const App = () => {
  const [data, setData] = useState<object[]>([])
  const [open, setOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  const [form] = Form.useForm();





  return (<Row justify={"center"}>


  </Row>
  )
}


export default App;