const SuccessPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Merci pour votre paiement !</h1>
            <p style={styles.text}>
                Votre commande a été confirmée et elle est maintenant en cours de traitement. Nous vous enverrons un email avec plus de détails bientôt.
            </p>
            <button style={styles.button} onClick={() => window.location.href = '/'}>
                Retour à l&apos;accueil
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    title: {
        fontSize: '32px',
        color: '#4CAF50',
    },
    text: {
        fontSize: '18px',
        color: '#333',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    }
};

export default SuccessPage;
