import React, {Component} from 'react';
import {Dimensions,TouchableOpacity,Platform, StyleSheet, Text, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Image} from 'react-native-elements'


type Props = {};
export default class App extends Component<Props> {
  state = {
    isDateTimePickerVisible: false,
    date:undefined,
    millSecLeft:0,
    dateOpacity:1,
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    date=new Date(date)
    this.setState({date:date},()=>{
      this._hideDateTimePicker();
      this._calculateTheDifference()
    })
  };
  _calculateTheDifference(){
    if(!this.state.date){
      return;
    }
    let current_date=new Date().getDate()
    let current_month=new Date().getMonth()
    let current_year=new Date().getFullYear()
    let birth_date=this.state.date.getDate()
    let birth_month=this.state.date.getMonth()
    let birth_year=this.state.date.getFullYear()
    let month = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    if (birth_date > current_date) {
        current_month = current_month - 1;
        current_date = current_date + month[birth_month - 1];
    }
    if (birth_month > current_month) {
        current_year = current_year - 1;
        current_month = current_month + 12;
    }
    let calculated_date = current_date - birth_date;
    let calculated_month = current_month - birth_month;
    let calculated_year = current_year - birth_year;
    if(calculated_date||calculated_month||calculated_year)
    this.setState({
      calculated_date:calculated_date,
      calculated_month:calculated_month,
      calculated_year:calculated_year,
      dateOpacity:1,
    })
  }
  render () {
    return (

      <View style={styles.container}>
       <Text style={{fontSize: 18,color:'green'}}>~ مرحباً بك في تطبيق مها لحساب العمر  ~</Text>
       <Image source={{uri:'https://sites.google.com/site/21sujoodmajadly/_/rsrc/1452800723221/home/%D7%99%D7%90%D7%9B.png'}}
       style={{ width:375, height: 300}}
        />
        <View style={{margin:10,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{
            height:Dimensions.get('window').width/10,
            width:Dimensions.get('window').height/4,
            backgroundColor:'#ff69b4',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:5,
          }} onPress={this._showDateTimePicker}>
            <Text style={{fontSize: 20,color:'white'}}>أدخل تاريخ ميلادي :) :)</Text>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={'date'}
          maximumDate={new Date()}
        />
        <View style={{
          marginTop:Dimensions.get('window').width/10,
          opacity:this.state.dateOpacity,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
         <Text style={{fontSize: 22,color:'green'}}>عمرك هُـــو: </Text>
          <Text style={styles.text}>{this.state.calculated_year} </Text><Text style={styles.text1}> سنة</Text>
          <Text style={styles.text}>{this.state.calculated_month} </Text><Text style={styles.text1}> شهر</Text>
          <Text style={styles.text}>{this.state.calculated_date} </Text><Text style={styles.text1}> يوم</Text>
          <Text style={{fontSize: 15,color:'green', alignItems: 'center'}}>
          {"\n"}
          إنا لنفرح بالأيام نقطعها وكل يوم مضى يدني من الأجلِ فاعمل لنفسك قبل الموت مجتهداً فإنما الربح والخسران في العملِ !</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5dc'
  },

});
