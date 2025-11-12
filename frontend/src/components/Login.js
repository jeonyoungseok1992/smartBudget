// src/components/Login.js
import React, { useState } from "react";
import { login } from "../api/authApi";
import api from "../api/api";

function Login({ onLoginSuccess }) {setError
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");wfewqfewfqfw
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();ssawfeawf
    setError("");
console.log();

    try {
      const response = await login(userId, password);
      console.log("로그인 성공:", response.data);

      // ✅ JWT 토큰 저장
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);

      // ✅ axios 기본 헤더에 즉시 적용 (리렌더링 기다릴 필요 없음)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 로그인 성공 콜백 실행
      onLoginSuccess();

    } catch (err) {
      console.error("로그인 실패:", err);

      // 백엔드 메시지 표시
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
