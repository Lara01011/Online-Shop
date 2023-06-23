import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleTypeClick = (type) => {
    device.setSelectedType(type);
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, []);

  return (
    <>
      <button onClick={toggleMenu} style={{
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#333333',
    border: 'none',
    color: '#777 !important',
  }}>
        <AiOutlineMenu size={20} style={{ marginRight: '5px' }} />
        Toggle Menu
      </button>
      {open && (
        <ListGroup ref={menuRef} style={{position: 'fixed',width: '297px', zIndex: 2000}}>
          {device?.types.map((type) => (
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              active={type.id === device.selectedType?.id}
              onClick={() => handleTypeClick(type)}
              key={type.id}
            >
              {type.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
});

export default TypeBar;
