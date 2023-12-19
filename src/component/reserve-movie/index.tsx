import { Steps } from 'antd';
import './index.scss';
const ReserveMovies = () => {
    const steps = [
        {
            title: '24/12',
        },
        {
            title: 'Sắp ra mắt',
        },
        {
            title: 'Sắp ra mắt',
        },
        {
            title: 'Sắp ra mắt',
        },
        {
            title: 'Sắp ra mắt',
        },
        {
            title: 'Sắp ra mắt',
        },
    ];

    return (
        <>
            <Steps progressDot className="mt-16 mb-4 ">
                {steps.map((step, index) => (
                    <Steps.Step key={index} title={step.title} />
                ))}
            </Steps>
        </>
    );
};

export default ReserveMovies;
