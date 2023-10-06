import { HeaderPay } from '../../component/header-pay';
import './index.scss';
import { MoviesPackageBill } from '../../component/movies-package-bill';

export const Bill = () => {
    return (
        <div>
            <HeaderPay number={2} />
            <div className="bill">
                <img
                    className="bill__img"
                    src="https://w7.pngwing.com/pngs/692/698/png-transparent-money-coins-dollars-bill-icon.png"
                    alt=""
                />
                <div className="bill__info">
                    <MoviesPackageBill />
                </div>
            </div>
        </div>
    );
};
