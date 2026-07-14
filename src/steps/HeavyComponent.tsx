export default function HeavyComponent() { // Separate module allows React.lazy to download this component on demand.
    return <p>heaviness</p>; // Returns the small placeholder UI once the lazy module resolves.
}
