import React, { useContext, useEffect } from 'react';
import PageTitleContext from '../contexts/PageTitleContext';

const HoursPage = (props) => {
    const [pageTitle, setPageTitle] = useContext(PageTitleContext);

    useEffect(() => {
        setPageTitle("Hours");
    })

    return (
        <div>
            <h1>Hours</h1>
        </div>
    )
}

export default HoursPage;