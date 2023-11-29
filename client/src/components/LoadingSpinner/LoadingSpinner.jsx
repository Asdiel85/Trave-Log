import * as style from './LoadingSpinner.module.css'

export default function Spinner  () {
    return (
        <div data-testid = 'spinner' className={style.spinner}></div>
    );
};
