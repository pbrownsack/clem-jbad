import React, { useEffect, useContext } from 'react';
import PageTitleContext from '../contexts/PageTitleContext';

const DashboardPage = (props) => {
    const [pageTitle, setPageTitle] = useContext(PageTitleContext);

    useEffect(() => {
        setPageTitle("Dashboard");
    })

    return (
        <div>
            <h3>hi</h3>
        </div>
    )
}

export default DashboardPage;