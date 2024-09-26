const CancelPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Paiement annulé</h1>
      <p style={styles.text}>
        Votre paiement a été annulé ou a échoué. Vous pouvez réessayer ou
        contacter le support si vous avez des questions.
      </p>
      <button
        style={styles.button}
        onClick={() => (window.location.href = "/")}
      >
        Retour à l&apos;accueil
      </button>
      <button
        style={styles.buttonSecondary}
        onClick={() => (window.location.href = "/checkout")}
      >
        Réessayer le paiement
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  title: {
    fontSize: "32px",
    color: "#FF5722",
  },
  text: {
    fontSize: "18px",
    color: "#333",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#FF5722",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  buttonSecondary: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#FFC107",
    color: "black",
    border: "none",
    cursor: "pointer",
  },
};

export default CancelPage;
