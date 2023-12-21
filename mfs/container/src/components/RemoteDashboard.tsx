// @ts-ignore
import { mount } from 'dashboard/Dashboard';
import { useContext, useEffect, useRef } from 'react';
import { BusContext } from '../features/bus/busContext';

export default () => {
    const ref = useRef(null);
    const integration = useContext(BusContext);

    useEffect(() => {
        if (!mount) return;
        if (!integration) return;
        if (!ref.current) return;
        console.log('mounting Dashboard');
        mount(ref.current, { bus: integration });
    }, [mount, integration, ref]);

    return <div ref={ref} id="dashboard" />;

}