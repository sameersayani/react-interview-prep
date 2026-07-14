import {useState} from 'react';

interface Item{
    id: string;
    label: string;
}

export default function Step04_VirtualDom(){
    const [items, setItems] = useState<Item[]>([
        { id: 'a', label: 'Item A' },
        { id: 'b', label: 'Item B' },
        { id: 'c', label: 'Item C' },
    ]);

    const removeFirstItem = () => {
        setItems((prev) => prev.slice(1));
    };

    const shuffleItems = () => {
        setItems((prev) => [...prev].sort(() => Math.random() - 0.5));
    }

    return (
    <div>
      <h2>Step 4: Virtual DOM & Reconciliation</h2>
      <p>
        Type something distinct into each input on both sides, then click
        "Remove first item." Watch what happens to the typed text.
      </p>

      <div style={{ display: 'flex', gap: '3rem' }}>
        <div>
          <h3>❌ Buggy (key = index)</h3>
          <ol>
            {items.map((item, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                <label>{item.label}: </label>
                <input type="text" placeholder="type something..." />
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3>✅ Fixed (key = item.id)</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                <label>{item.label}: </label>
                <input type="text" placeholder="type something..." />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={removeFirstItem}>Remove first item</button>
      <button onClick={shuffleItems} style={{ marginLeft: '0.5rem' }}>
        Shuffle items
      </button>
    </div>
  );
}
