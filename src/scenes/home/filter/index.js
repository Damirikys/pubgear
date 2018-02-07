import React from 'react'

import { connect } from 'react-redux'
import { ScrollView, Text, View } from 'react-native'

import DatePicker from 'react-native-datepicker'
import Touchable from 'react-native-touchable-safe'
import Button from '../../../components/Button'

import { CURRENT_SEASON, MIN_SEASON } from '../../../constants/seasons'
import * as servers from '../../../constants/servers'
import * as modes from '../../../constants/modes'
import * as types from '../../../constants/types'

import { accentTextColor } from '../../../constants/themeConfig'
import { CHANGE_CONFIG_ACTION } from '../../../actions/configActions'

import styles from '../styles'

class FilterScene extends React.Component {
  state = { ...this.props.config }

  _onValueChange = (name, value) => this.setState({ ...this.state, [name]: value })

  _onSubmit = () => {
    this.props.save(this.state)
    this.props.onBack()
  }

  _datePickerStyles = {
    dateInput: {
      borderWidth: 1,
      borderColor: accentTextColor,
      borderRadius: 5
    },

    dateText: {
      color: accentTextColor,
      fontSize: 14,
      fontFamily: 'Roboto-Light'
    }
  }

  render() {
    const config = this.state
    return (
      <View style={styles.modal}>
        <View>
          <Selector
            data={servers}
            active={config.server}
            name="server"
            onSelect={this._onValueChange}
          />

          <Selector
            data={types}
            active={config.type}
            name="type"
            onSelect={this._onValueChange}
          />

          <View style={styles.filterDate}>

            <Selector
              data={modes}
              active={config.mode}
              name="mode"
              onSelect={this._onValueChange}
            />

            <DatePicker
              style={styles.season}
              date={config.season}
              mode="date"
              placeholder="Выбрать сезон"
              format="YYYY-MM"
              minDate={MIN_SEASON}
              maxDate={CURRENT_SEASON}
              confirmBtnText="ОК"
              cancelBtnText="Назад"
              showIcon={false}
              androidMode="spinner"
              customStyles={this._datePickerStyles}
              onDateChange={season => this._onValueChange('season', season)}
            />

          </View>
        </View>
        <View style={styles.saveBtn}>
          <Button
            onPress={this._onSubmit}
            text="Сохранить"/>
        </View>
      </View>
    )
  }
}

class Selector extends React.PureComponent {
  _isActive = value => this.props.active === value

  render() {
    const { data, name } = this.props
    return (
      <ScrollView horizontal={true}>
        <View style={styles.selector}>
          {Object.keys(data).map((key, index) => (
            <Touchable key={index}  onPress={() => this.props.onSelect(name, data[key])}>
              <View style={this._isActive(data[key]) ? styles.activeSelector : styles.inactiveSelector}>
                <Text style={this._isActive(data[key]) ? styles.activeText : styles.inactiveText}>{key}</Text>
              </View>
            </Touchable>
          ))}
        </View>
      </ScrollView>
    )
  }
}

export default connect(state => ({
  config: state.config
}), dispatch => ({
  save: payload => dispatch({ type: CHANGE_CONFIG_ACTION, payload })
}))(FilterScene)