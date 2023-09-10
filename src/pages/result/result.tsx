import { Button, Result } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";

const ResultPage = (props: any) => {
    const [lsFormData, setLsFormData] = useLocalStorage("lsFormData", undefined)
    const [lsSelectedFlight, setLsSelectedFlight] = useLocalStorage("selectedFlight", undefined)


    const clearLS = () => {
        setLsSelectedFlight(undefined)
        setLsFormData(undefined)
    }
    return (
        <Result
            status="success"
            title="Kabin Seçiminiz Tamamlandı"
            subTitle={<>

                <p>
                    Toplam Tutar: {lsSelectedFlight.price.amount * lsFormData.person}
                </p>
            </>}
            extra={[
                <Button onClick={clearLS} href="/" >
                    Anasayfa'ya Dön
                </Button>,
            ]}
        />
    );
};

export default ResultPage;