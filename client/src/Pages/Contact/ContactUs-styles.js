export const styles = {
    MainContainer: {
        maxWidth: "1200px", 
        margin: "150px auto", 
        display: "flex", 
        alignItems: "center", 
        paddingX: "50px", 
        justifyContent: "center", 
        flexDirection: {xs: "column", sm: "column", md: "row"}
    },
    Container1: {
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        gap: "2rem", 
        textAlign: {xs: "center", sm: "center", md: "left"}
    },
    Container2: {
        width: "100%", 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        gap: "2rem", 
        mt: {xs: "50px", sm: "50px", md: "0"}
    },
  }