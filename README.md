### **1\. `useState` ⚙️Hook**

#### **File: `Counter.js`**



```bash
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```

* * * * *

### **2\. `useEffect` 🔧Hook**

#### **File: `UserProfile.js`**



```bash
 import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/user');
      const data = await response.json();
      setUser(data);
    };

    fetchData();
  }, []);  // Empty dependency array ensures this effect runs once, on mount.

  return user ? (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserProfile;
```

* * * * *

### **3\. `useContext` 🌐Hook**

### **STEP-1\. 📝 Creating a Context in a Separate File**

You can create the context in a separate file, where you define the context and the provider. The context provider will wrap your application or specific parts of it, and the consumer (using `useContext`) will access the values provided by the context.

#### **Example:**

**`ThemeContext.js` (Context Provider)**



 ```bash 
 import React, { createContext, useState, useContext } from 'react';

// Create a context
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useTheme = () => {
  return useContext(ThemeContext);
}; 
``` 

Here, we define a `ThemeContext` and `ThemeProvider` in a separate file. We also export a custom hook `useTheme` to make it easier for other components to consume the context.



### **STEP-2\. 📝 Using the Context in a Component**

Now you can import `useTheme` in any component to access the context values.

#### **Example:**

**`ThemedComponent.js` (Using the Context)**



 ```bash 
 import React from 'react';
import { useTheme } from './ThemeContext';

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h1>{theme} Mode</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemedComponent; 
```

Here, we are importing `useTheme` from `ThemeContext.js` to access the `theme` value and `toggleTheme` function.



### **STEP-3\. 📝 Wrapping the Application with the Provider**

Finally, you need to wrap your main application or the components that need access to the context with the `ThemeProvider`.

#### **Example:**

**`App.js` (Wrapping the App)**


 ```bash 
 import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemedComponent from './ThemedComponent';

const App = () => {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
};

export default App; 
```

Here, `ThemeProvider` is wrapping the entire application, so any child component (like `ThemedComponent`) can consume the `theme` context.

* * * * *

### **4\. `useReducer` 🧮Hook**

#### **File: `🗒️ todoReducer.js`**


```bash 
 export const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'TOGGLE_LOADING':
      return { ...state, isLoading: !state.isLoading };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}; 
```

#### **File: `🗒️ TodoContext.js`**



 ```bash 
 import React, { createContext, useReducer, useContext } from 'react';
import { todoReducer, initialState } from './todoReducer';

// Create Context
const TodoContext = createContext();

// Create Provider to wrap the app and pass the state
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to access Todo context
export const useTodoContext = () => useContext(TodoContext); 
```

#### **File: `🗒️ TodoApp.js`**



 ```bash 
 import React, { useEffect } from 'react';
import { useTodoContext } from './TodoContext';

const TodoApp = () => {
  const { state, dispatch } = useTodoContext();

  const addTodo = (todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const removeTodo = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  useEffect(() => {
    dispatch({ type: 'TOGGLE_LOADING' });

    setTimeout(() => {
      addTodo({ id: 1, text: 'Learn React' });
      addTodo({ id: 2, text: 'Build App' });
      dispatch({ type: 'TOGGLE_LOADING' });
    }, 1000);
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      {state.isLoading && <p>Loading...</p>}
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp; 
```

#### **File: `🗒️ App.js`**



 ```bash 
 import React from 'react';
import { TodoProvider } from './TodoContext';
import TodoApp from './TodoApp';

const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App; 
```

* * * * *

### **5\. `useRef` 🔗Hook**

#### **File: `FocusInput.js`**



 ```bash 
 import React, { useRef, useEffect } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();  // Focus the input element when the component mounts
  }, []);

  return <input ref={inputRef} type="text" />;
};

export default FocusInput; 
```

* * * * *

### **6\. `useMemo` 🧠Hook**

#### **File: `ItemList.js`**



 ```bash 
 import React, { useMemo } from 'react';

const ItemList = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.includes(filter));
  }, [items, filter]);

  return (
    <div>
      {filteredItems.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default ItemList; 
```

* * * * *

### **7\. `useCallback` 🔁Hook**

#### **File: `Parent.js`**



 ```bash 
 import React, { useState, useCallback } from 'react';
import Button from './Button';

const Parent = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(count + 1), [count]);

  return (
    <div>
      <h1>{count}</h1>
      <Button onClick={increment} />
    </div>
  );
};

export default Parent; 
```

#### **File: `Button.js`**


 ```bash 
 import React from 'react';

const Button = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

export default Button; 
```

* * * * *

### **8\. `useLayoutEffect` 🛠️Hook**

#### **File: `MeasuredComponent.js`**



 ```bash 
 import React, { useLayoutEffect, useState, useRef } from 'react';

const MeasuredComponent = () => {
  const [width, setWidth] = useState(0);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    setWidth(divRef.current.getBoundingClientRect().width);
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ width: '50%' }}>
        <p>The width of this element is: {width}px</p>
      </div>
    </div>
  );
};

export default MeasuredComponent; 
```
