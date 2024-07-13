import React from 'react';
import Input from './Components/Input/Input';
import List from './Components/List/List';
import UserModal from './Components/Modal/Modal';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <Input />
      <List />
      <UserModal />
    </div>
  );
};

export default App;
