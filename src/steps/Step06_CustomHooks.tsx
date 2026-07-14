import { useWindowWidth } from '../hooks/useWindowWidth';

export default function Step06_CustomHooks() {
    const width = useWindowWidth();
    console.log(`Step06_CustomHooks rendered with width: ${width}`);
    return (
        <div>
           <p>Window width: {width}px</p> 
           <WidthDisplay />
        </div>
    );
}

const WidthDisplay = () => {
    const width = useWindowWidth();
    console.log(`WidthDisplay rendered with width: ${width}`);
    return (
        <div>
            <p>Width from child: {width}px</p>
        </div>
    );
}