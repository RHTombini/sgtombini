import { Link } from 'react-router-dom';
import { useAuth } from '../app/auth-context';

export function HomePage() {
  const { user } = useAuth();
  return (
    <div className="shell-home">
      <h
