export const styles = {
    MainContainer: {
        maxWidth: "1200px", 
        height: "100vh", 
        margin: "50px auto", 
        display: "flex", 
        alignItems: "center", 
        paddingX: "50px"
    },
    Container1: {
        flex: 1, 
        textAlign: "center", 
        display: "flex", 
        flexDirection: "column", 
        gap:"3rem"
    },
    Container2: {
        height: "100%", 
        flex: 1, 
        display: {xs: "none", sm: "none", md: "flex"}, 
        justifyContent: "center", 
        alignItems: "center"
    },
    SubContainer1: {
        width: "100%", 
        display: "flex", 
        gap: "2rem", 
        justifyContent: "center", 
        flexDirection: {xs: "column", sm: "row", md: "row"}
    },
    SubContainer2: {
        width: "100%", 
        height: "100%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"
    }
  }