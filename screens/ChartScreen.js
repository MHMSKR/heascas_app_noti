import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import CustomGap from '../components/CustomGap'
import CustomLineChart from '../components/CustomLineChart'
import CustomValueDisplay from '../components/CustomValueDisplay'
import CustomLoading from '../components/CustomLoading'
import { AxiosContext } from '../context/AxiosContext'

const ChartScreen = () => {
  const controller = new AbortController();
  const { authAxios } = useContext(AxiosContext)
  const [data,setData] = useState();
  const [hour,setHour] = useState();
  const [energy,setEnergy] = useState();
  const [loading, setLoding] = useState(true);
  const [price,setPrice] = useState(0);


  useEffect(()=>{
    const fetchChart = () =>{
      try {
        authAxios.get('/energy/hour/',{signal:controller.signal})
        .then( (response)=>{
          if(loading){
            const energy_h = response.data.result_hour.map((data)=>{
              return Number(data.sum_energy)
            })
            const hour =  response.data.result_hour.map((data)=>{
              
              const h = new Date(Number(data.iat)).getHours()
              if(h-1 == -1){
                return 23
              }
              return h - 1
            })
            const sum_energy =  response.data.energy_sum.map((data)=>{
              return Number(data.sum_energy_one_day).toFixed(2)
            })
            setData(energy_h.reverse())
            setHour(hour.reverse())
            setEnergy(sum_energy)
            setLoding(false)
          }else{
            setLoding(false)
          }
        })
      } catch (error) {
        setLoding(false)
        throw error
      }
    }
    fetchChart();
    return(()=>{
      setData(null)
      setEnergy(null)
      setHour(null)
      setLoding(null)
      controller.abort();
    })
  },[])

  if (loading) {
    return (
      <CustomLoading visible={loading}/>
    )
  }

  return (
    <View style={styles.center_energy_info}>
      <View style={styles.center_energy_info_status}>

      </View>
      <View style={styles.esp_place_ins}>

      </View>
      <CustomLineChart 
        data={data == null ? [0] : data}
        hour={hour == null ? [0] : hour}
      />
      <View style={styles.energy_chart_2}>
        <CustomValueDisplay
          name={'Energy'}
          value={energy == null ? 0 : energy}
          unit={'kWh'}
        />
        <CustomValueDisplay
          name={'price'}
          value={price == null ? 0 : price}
          unit={'bath'}
        />
      </View>

    </View>
  )
}

export default ChartScreen

const styles = StyleSheet.create({
  // energy field 
  center_energy_info: {
    backgroundColor: '#FFFFFF',
    flex: 4.5,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  center_energy_info_status: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 1
  },
  esp_place_ins: {
    backgroundColor: '#FFF111',
    flex: 0.5,
  },

  // chart field element styles
  energy_chart_2: {
    backgroundColor: '#FFFFFF',
    flex: 1.8,
    borderRadius: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },

})