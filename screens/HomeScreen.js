// import component
import { StyleSheet, View, Text, ImageBackground, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomeImage from '../components/CustomeImage'
import CustomeIcon from '../components/CustomIcon'
import CustomeTextOutput from '../components/CustomeTextOutput'
import CustomeLoading from '../components/CustomLoading'
import { AuthContext } from '../context/AuthContext'
import { AxiosContext } from '../context/AxiosContext'

// import assets image or icon
import background from '../assets/image/background.png'
import menu from '../assets/icons/menu.png'
import noti from '../assets/icons/notification.png'
import logout from '../assets/icons/logout.png'
import home from '../assets/icons/home.png'
import history from '../assets/icons/history_file.png'
import chat from '../assets/icons/chat.png'
import user from '../assets/icons/user.png'
import warning from '../assets/icons/warning.png'
import ChartScreen from './ChartScreen'


const HomeScreen = ({ navigation }) => {
  const controller = new AbortController();
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const authContext = useContext(AuthContext)
  const { authAxios } = useContext(AxiosContext)
  const [users, setUsers] = useState({});
  const [loading, setLoding] = useState(true);


  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await authAxios.get('/', { signal: controller.signal});
        if (loading) {
          setUsers(await response.data);
          setLoding(false)
        } else {
          setLoding(false)
        }
      } catch (error) {
        setLoding(false)
        throw error
      }
    }
    fecthData();
    return () => { 
      setLoding(null)
      controller.abort(); };
  }, [])

  if (loading) {
    return (
      <CustomeLoading visible={loading} />
    )
  }

  return (
    <SafeAreaView>
      <ImageBackground
        source={background}
        resizeMode='cover'
        style={styles.imageBackground}
      >  
        <View style={styles.container}>
          {/* top bar menu */}
          <View style={styles.menu_bar}>
            {/* icon menu bar in left side  */}
            <CustomeIcon
              source={menu}
              iconStyle={styles.icon_menu}

            />
            {/*  ring icon and logout icon group in right side top menu bar */}
            <View style={styles.menu_bar_1} >
              <CustomeIcon
                source={noti}
                iconStyle={styles.icon_ring}
              />
              <CustomeIcon
                source={logout}
                iconStyle={styles.icon_logout}
                onPress={() => {
                  authContext.Logout()
                }}
              />
            </View>
          </View >
          {/* center infor field */}
          <View style={styles.center}>
            <View style={styles.center_user_info}>
              <View style={styles.user_info_left}>
                <CustomeImage
                  souceUri={users.user.image_profile}
                  touchStyle={styles.touch_profile_img}
                  stylesImage={styles.profile_img}
                />
                <CustomeTextOutput
                  text={`Hello, ${users.user.fullname}`}
                  size={18}
                  family='Medium'
                  color={'#FFFFFF'}
                />
                <Text
                  style={
                    {
                      color: '#C1DDF8',
                      fontFamily: 'Kanit-Medium',
                      fontSize: 12
                    }
                  }>{day[new Date().getDay()]}, {new Date().getDate()} {month[new Date().getMonth()]} {new Date().getFullYear()}</Text>
              </View>
              <View style={styles.user_info_right}>
                <CustomeTextOutput
                  text={"ID : " + users.info.HS_ID}
                  size={12}
                  family='Medium'
                  color='#FFFFFF'
                />
                <CustomeTextOutput
                  text={`address: ${users.info.info.address}`}
                  size={10}
                  color='#C1DDF8'
                  family='Medium'
                />
                <CustomeTextOutput
                  text={`Sub district : ${users.info.info.Sub_district}`}
                  size={10}
                  color='#C1DDF8'
                  family='Medium'
                />
                <CustomeTextOutput
                  text={`district : ${users.info.info.district}`}
                  size={10}
                  color='#C1DDF8'
                  family='Medium'
                />
                <CustomeTextOutput
                  text={`Province: ${users.info.info.Province} ${users.info.info.Postal_Code}`}
                  size={10}
                  color='#C1DDF8'
                  family='Medium'
                />
                <CustomeTextOutput
                  text={`CA_Ref : ${users.info.info.CA_Ref}`}
                  size={10}
                  color='#C1DDF8'
                  family='Medium'
                />
                <CustomeTextOutput
                  text={`type meter: ${users.info.info.type_meter}`}
                  size={10}
                  color='#C1DDF8'
                  family='Medium'
                />
              </View>
            </View>
            {/*  energy side */}
            <ChartScreen />
          </View>
          {/*  buttom menu bar */}
          <View style={styles.foot_menu_bar}>
            <CustomeIcon
              source={home}
              iconStyle={styles.foot_menu_icon}
              text={"home"}
              textStyle={styles.text_icon}
            />
            <CustomeIcon
              source={chat}
              iconStyle={styles.foot_menu_icon}
              text={"chat"}
              textStyle={styles.text_icon}
            />
            <CustomeIcon
              source={history}
              iconStyle={styles.foot_menu_icon}
              text={"history"}
              textStyle={styles.text_icon}
            />
            <CustomeIcon
              source={warning}
              iconStyle={styles.foot_menu_icon}
              text={"warning"}
              textStyle={styles.text_icon}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: "100%",
  },
  imageBackground: {
    width: 360,
    height: "100%",
  },

  //  main element in screen style
  // ** top menu element style
  menu_bar: {
    width: "100%",
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5

  },
  menu_bar_1: {
    width: "25%",
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  // center element 
  center: {
    flex: 1
  },
  // user information field
  center_user_info: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  // user profile
  user_info_right: {
    flex: 1.5,
    alignContent: 'flex-end'
  },

  // user home infomation
  user_info_left: {
    flex: 1.7,
    paddingLeft: 10,
    paddingTop: 2
  },
  profile_img: {
    width: 55,
    height: 55,
    borderRadius: 55
  },
  touch_profile_img: {
    width: 55,
    height: 55,
  },


  // bottom element menu bar 
  foot_menu_bar: {
    width: "100%",
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#FFFFFF',
  },

  // icon and text style
  icon_menu: {
    width: 20,
    height: 20
  },
  icon_ring: {
    width: 20,
    height: 20
  },
  icon_logout: {
    width: 20,
    height: 20
  },
  text_icon: {
    color: '#FFFFFF',
    fontFamily: 'Kanit-Light',
    fontSize: 10
  },
  foot_menu_icon: {
    width: 18,
    height: 18
  }
})