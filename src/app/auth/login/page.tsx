'use client';
const SigInPage = () => {
  return (
    <div className="auth-container">
      <form className="custom-form">
        <input type="hidden" name="csrfToken" />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={'email'}
            placeholder="Enter your email"
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={'password'}
            onChange={(e) => console.log(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="custom-button">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SigInPage;
