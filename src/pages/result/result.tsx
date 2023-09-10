import { Result } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { changePageTitle } from "../../components/general/changePageTitle";

const ResultPage = (props: any) => {
    const [lsFormData, setLsFormData] = useLocalStorage("lsFormData", undefined)
    const [lsSelectedFlight, setLsSelectedFlight] = useLocalStorage("selectedFlight", undefined)


    const clearLS = () => {
        setLsSelectedFlight(undefined)
        setLsFormData(undefined)
    }

    useMemo(() => {
        changePageTitle("Özet Ekranı")
    }, [])

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