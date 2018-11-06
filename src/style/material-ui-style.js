const primaryColor = '#0A0208'
const secondaryColor = '#fff'
const appFonts = [
  'Play',
  'Roboto',
  'Arial',
  'sans-serif',
].join(',')

module.exports = {
  pollerTheme:{
    palette: {
      primary: {
        light: '#0A0208',
        main: primaryColor,
        dark: '#0A0208',
        contrastText: '#fff',
      },
      secondary: {
        light: '#616161',
        main: secondaryColor,
        dark: '#616161',
        contrastText: '#000',
      }
    },
    typography:{
      fontFamily: [
        'Play',
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
      text:{
        fontFamily:"Play",
        fontSize: 15,
      },
      headline:{
        fontFamily:"Play",
        fontSize: 30,
        textAlign:'center'
      },
      display2:{
        fontFamily:"Play",
        textAlign:'center',
        color:primaryColor,
        backgroundColor:secondaryColor,
      },
      subheading:{
        display:'block',
        fontFamily:"Play",
      },

      title:{
        color:secondaryColor,
        backgroundColor: primaryColor,
        margin:'auto',
      },
      
      display1:{
        color:secondaryColor,
        backgroundColor: primaryColor,
      },

      display3:{
        fontFamily: [
          'Play',
          'Roboto',
          'Arial',
          'sans-serif',
        ].join(','),
        margin:'auto',
        color:primaryColor,
        backgroundColor: secondaryColor,
        textAlign:'center'
      }

    },
    overrides: {
      MuiCardMenu:{
        height: 65
      },

      MuiMenuItem: {
        root:{
          backgroundColor: secondaryColor,
          color:primaryColor,
          fontFamily: [
            'Play',
            'Roboto',
            'Arial',
            'sans-serif',
          ].join(','),
        }
      },

      MuiButton: {
        root:{
          borderRadius: 0,
          margin:'auto',
          display: 'flex',
          flexWrap: 'wrap',
          textAlign:'center',
               '&:hover': {
            backgroundColor: '#000',
            color:'#fff'
          },
        }
      },
      // MuiMenu:{
      //   borderColor: primaryColor,
      // },
      MuiListItem:{
        container:{
          border: '1px black solid',
          // maxWidth: 500,
          width:'60%',
        },
      },
      MuiSelectField: {
        width: 250,
        display:'inline-block',
        margin:'auto'
      },
      MuiPaper:{
        root:{
          maxWidth: 900, 
          margin: 'auto',
          marginBottom:20,
          flexGrow: 1
        }
      },
      MuiAppBar:{
        root:{
          fontSize: 20,
          fontFamily: "Play",
          backgroundColor: '#000',
        },
      },
      PollCard:{
        cardHeader:{
          textAlign:'center',
          fontFamily: appFonts,
          color: secondaryColor,
          backgroundColor: primaryColor,
          },
        pollActions:{
          backgroundColor: primaryColor,
          color: secondaryColor
        },
        cardContent:{
          root:{
            fontFamily:appFonts,
            backgroundColor: primaryColor,
          },
          // textAlign:'center',
          margin:0,
        },
      },
      MuiCheckbox: {
        root:{
          color: primaryColor,
          // backgroundColor: secondaryColor,
          // marginBottom: 16,
          marginLeft: 10,
          fontFamily: 'Play',
          fontSize: 20,
        }
      },

      MuiIcon:{
        root:{
        },
        colorPrimary: secondaryColor,
      },


      MuiCardActions:{
       root:{
        maxWidth: 900, 
        margin: 'auto',
        flexGrow: 1,
        backgroundColor:primaryColor,
        color:secondaryColor,
        }
      },
      MuiCollapse:{
        container:{
          maxWidth: 900, 
          margin: 'auto',
          backgroundColor:secondaryColor,
          color:primaryColor,
          flexGrow: 1,
        },
        wrapperInner:{
          display:"inline-block"
        }
      }
    },
    uniqueStyles:{
      colorChangeButton:{
        root: {
          // Some CSS
          color: 'linear-gradient(45deg, orange, yellow, green, cyan, blue, violet)',
          background: 'black',
          height: 48,
          // padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
      highCharts:{
        title:{
          fontSize: 25,
          fontFamily: "Play",
        },
        text:{
          fontSize: 12,
          fontFamily: "Play",
        }
      },
      MuiVoteButton:{
        titleText:{
          width:'20%',
          fontSize:30,
        },
        optionText:{
          wordBreak: 'break-all',
          fontSize:20,
          width:'80%',
        },
        textAlign:'center',
            margin:15,
            textAlign: 'center',
            backgroundColor: '#fff',
            color:"#000",
            fontFamily: [
              'Play',
              'Roboto',
              'Arial',
              'sans-serif',
            ].join(','),
            '&:hover': {
              backgroundColor: '#000',
              color:'#fff'
            },
            margin:'1em auto',
            width:'75%',
            height:'4em',
            textAlign:'center',
            fontSize: 20,
          },
          helpBarButton:{
            margin:0,
            padding:0,
            textAlign:'center',
            backgroundColor: '#000',
            display:'inline-block',
            // verticalAlign:'top',
            color:"#fff",
            fontFamily: [
              'Play',
              'Roboto',
              'Arial',
              'sans-serif',
            ].join(','),
            // '&:hover': {
            //   backgroundColor: '#fff',
            //   color:'#000'
            // },
              // verticalAlign:'top',
              width: '75%',
              maxWidth: '75%', 
              flexGrow: 1,
              display:'inline-block'
    
          },
          filterButton:{
            margin:0,
            padding:0,
            textAlign:'center',
            backgroundColor: '#000',
            display:'inline-block',
            // verticalAlign:'top',
            color:"#fff",
            fontFamily: [
              'Play',
              'Roboto',
              'Arial',
              'sans-serif',
            ].join(','),
            // '&:hover': {
            //   backgroundColor: '#fff',
            //   color:'#000'
            // },
              // verticalAlign:'top',
              width: '100%',
              flexGrow: 1,
              display:'inline-block'
          },
          dialogStretchedButtons:{
            root:{
              display:'block',
            }
          },
          pie_hover_text:{
            fontSize: 20,
            fontFamily: "Play",
            margin:'auto',
            color:'white',
            backgroundColor:'black'
          },
          backButton:{
            marginRight:"5%",
            textAlign: 'center',
            backgroundColor: '#000',
            display:'inline-block',
            verticalAlign:'top',
            width:'20%',
            maxWidth: '20%', 

            color:"#fff",
            fontFamily: [
              'Play',
              'Roboto',
              'Arial',
              'sans-serif',
            ].join(','),
            '&:hover': {
              backgroundColor: '#fff',
              color:'#000'
            }
          },
    },
  },
    pie_hover_text:{
      fontSize: 20,
      fontFamily: "Play",
      margin:'auto',
      color:'white',
      backgroundColor:'black'
    },
    legendText:{
      fontSize: 10,
      fontFamily: "Play",
    },
      block: {
        maxWidth: 250,
      },
      loginTitle: {
        fontFamily: 'Play,sans-serif',
        fontSize: '5em',
        display: 'flex',
        alignItems: 'center',
        margin:'0 auto',
        padding:0,
    }
}