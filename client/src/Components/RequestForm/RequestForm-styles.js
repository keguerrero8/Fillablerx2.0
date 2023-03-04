export const styles = {
    FormContainer: {
        marginTop: "50px",
        marginBottom: "50px",
        padding: "50px 5px",
        width: {xs: "80%", sm: "80%", md: "90%"},
        backgroundColor: "rgba(255,255,255,1)", 
        borderRadius: "20px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        gap: {xs: "4rem", sm: "4rem", md: "3rem"}
    },
    InputContainer: {
        margin: "auto", 
        width: {xs: "100%", sm: "100%", md: "60%"}, 
        gap: "2rem", 
        display: "flex", 
        justifyContent: "left", 
        flexDirection: "column"
    },
    PharmacyInsuranceText: {
        textAlign: "center", 
        fontWeight: "bolder", 
        fontSize: {xs: "1rem", sm: "1rem", md: "1.4rem"}
    },
    InsuranceFields: {
        margin: "auto",
        width: "100%",
        gap: "2rem", 
        display: "flex", 
        justifyContent: "center", 
        flexDirection: "column"
    },
    PaymentMethodText: {
        fontSize: {xs: "1rem", sm: "1rem", md: "1.4rem"},
        fontWeight: "bold"
    },
    ButtonsContainer: {
        margin: "auto", 
        width: "90%", 
        textAlign: "center", 
        display: "flex", 
        justifyContent: "center", 
        gap: "2rem", 
        flexDirection: {xs: "column", sm: "column", md: "row"}
    }
  }