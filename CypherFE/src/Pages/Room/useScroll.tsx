import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';

function UseScroll() {
  const messagesEndRef = useRef(null);
  const messages = useSelector((redux: RootState) => redux.messages.messages);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array includes messages, so effect runs whenever messages change

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return {
    scrollToBottom,
    messagesEndRef,
  };
}

export default UseScroll;
