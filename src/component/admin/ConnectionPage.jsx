/* eslint-disable react/prop-types */
const ConnectionPage = ({
  formInput,
  handleChange,
  handleFormAuthentification,
}) => {
  return (
    <div className="page1">
      
      <p>
        Bienvenue sur l&apos;application Let&apos;s send. Veuillez vous
        connecter pour accéder à nos services.
      </p>
      <form onSubmit={handleFormAuthentification}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formInput.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formInput.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default ConnectionPage;
