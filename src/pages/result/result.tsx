import { Result } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";

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
                <Link onClick={clearLS} to="/" >
                    Anasayfa'ya Dön
                </Link>,
            ]}
        />
    );
};

export default ResultPage;