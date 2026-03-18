import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700&display=swap");

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0a0a0f; }

  .login-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0f;
    font-family: "DM Mono", monospace;
    position: relative;
    overflow: hidden;
  }
  .login-bg { position: absolute; inset: 0; pointer-events: none; }
  .login-bg__circle {
    position: absolute; border-radius: 50%;
    filter: blur(80px); opacity: 0.25;
  }
  .login-bg__circle--1 {
    width: 480px; height: 480px;
    background: radial-gradient(circle, #6c63ff 0%, transparent 70%);
    top: -140px; left: -120px;
    animation: drift 12s ease-in-out infinite alternate;
  }
  .login-bg__circle--2 {
    width: 360px; height: 360px;
    background: radial-gradient(circle, #a78bfa 0%, transparent 70%);
    bottom: -100px; right: -80px;
    animation: drift 16s ease-in-out infinite alternate-reverse;
  }
  @keyframes drift {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(30px,20px) scale(1.05); }
  }
  .login-bg__grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.4;
  }
  .login-card {
    position: relative; z-index: 10;
    width: 100%; max-width: 420px;
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 48px 40px 40px;
    box-shadow: 0 0 0 1px rgba(108,99,255,0.1), 0 32px 80px rgba(0,0,0,0.6);
    animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .login-brand {
    display: flex; align-items: center; gap: 10px; margin-bottom: 32px;
  }
  .login-brand__icon { font-size: 22px; color: #a78bfa; }
  .login-brand__name {
    font-family: "Syne", sans-serif; font-size: 15px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: #e8e8f0;
  }
  .login-title {
    font-family: "Syne", sans-serif; font-size: 28px; font-weight: 700;
    color: #e8e8f0; margin-bottom: 8px;
  }
  .login-subtitle { font-size: 13px; color: #6b6b80; margin-bottom: 36px; }
  .login-form { display: flex; flex-direction: column; gap: 20px; }
  .login-field { display: flex; flex-direction: column; gap: 8px; }
  .login-label {
    font-size: 11px; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; color: #6b6b80;
  }
  .login-input {
    background: #1c1c26; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px; color: #e8e8f0; font-family: "DM Mono", monospace;
    font-size: 14px; padding: 13px 16px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .login-input::placeholder { color: rgba(255,255,255,0.18); }
  .login-input:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 0 3px rgba(108,99,255,0.15);
  }
  .login-error {
    font-size: 13px; color: #ff5e6c;
    background: rgba(255,94,108,0.08);
    border: 1px solid rgba(255,94,108,0.2);
    border-radius: 8px; padding: 10px 14px;
  }
  .login-btn {
    margin-top: 6px; background: #6c63ff; border: none;
    border-radius: 8px; color: #fff; cursor: pointer;
    font-family: "Syne", sans-serif; font-size: 15px; font-weight: 600;
    letter-spacing: 0.04em; padding: 14px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .login-btn:hover:not(:disabled) {
    background: #7c74ff;
    box-shadow: 0 4px 24px rgba(108,99,255,0.4);
    transform: translateY(-1px);
  }
  .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .login-spinner {
    display: inline-block; width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .login-footer {
    margin-top: 28px; font-size: 12px; color: #6b6b80; text-align: center;
  }
  @media (max-width: 480px) {
    .login-card { margin: 16px; padding: 36px 24px 32px; }
  }
`;

export default function Login() {
  const [form,    setForm]    = useState({ email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const { login }             = useContext(AuthContext);
  const navigate              = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <div className="login-bg">
          <div className="login-bg__circle login-bg__circle--1" />
          <div className="login-bg__circle login-bg__circle--2" />
          <div className="login-bg__grid" />
        </div>
        <div className="login-card">
          <div className="login-brand">
            <span className="login-brand__icon">◈</span>
            <span className="login-brand__name">Eagle Gaming</span>
          </div>
          <h1 className="login-title">Bienvenido</h1>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label className="login-label" htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                className="login-input"
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-field">
              <label className="login-label" htmlFor="password">Contraseña</label>
              <input
                id="password"
                className="login-input"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="login-error">⚠ {error}</p>}
            <button
              className={`login-btn ${loading ? "login-btn--loading" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? <span className="login-spinner" /> : "Ingresar"}
            </button>
          </form>
          <p className="login-footer">¿Problemas para acceder? Contacta al administrador</p>
        </div>
      </div>
    </>
  );
}