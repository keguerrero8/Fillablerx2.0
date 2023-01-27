export const styles = {
    MainContainer: {
        maxWidth: "1200px", 
        height: "100vh", 
        margin: "50px auto", 
        display: "flex", 
        alignItems: "center", 
        paddingX: "50px", 
        gap:"5rem", 
        justifyContent: { xs: "center", sm: "center", md: "space-between"}, 
        flexDirection: {xs: "column", sm: "column", md: "row"}
    },
    Container1: {
        textAlign: "center", 
        display: "flex", 
        flexDirection: "column", 
        gap:"3rem"
    },
    Container2: {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column", 
        gap: {xs: "2rem", sm: "2.3", md: "2.5rem"}, 
        textAlign: "center",
        width: "100%",
        mb: "30px"
    },
    PharmaciesText: {
        lineHeight: "1.7", 
        fontSize: { xs: "1.7rem", sm: "2rem", md: "2.3rem"}
    },
    SubText: {
        fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.5rem"}, 
        lineHeight: "1.5", 
        width: { xs: "90%", sm: "80%", md: "60%"}
    }
  }