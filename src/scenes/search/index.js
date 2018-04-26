import React from 'react'
import { connect } from 'react-redux'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import Touchable from 'react-native-touchable-safe'
import Icon from 'react-native-vector-icons/Feather'

import localization from '../../localization'
import { APPLY_PROFILE_ACTION, SEARCH_PROFILE_ACTION } from '../../actions/profileActions'
import Body from '../../components/Body'
import { primaryLight } from '../../constants/themeConfig'
import { noavatarUrl } from '../../constants/utils'
import pubgear from '../../assets/images/logo'

import styles from './styles'

class SearchScene extends React.Component {
  _submit = () => this.searchInput && this.props.search(this.searchInput)

  render() {
    const { search } = localization.locale
    return (
      <Body>
        <View style={styles.logoWrapper}>
          <View style={styles.logo}>
            <Image
              style={styles.logoImg}
              source={{ uri: pubgear }}
            />
          </View>

          <View>
            <TextInput
              style={styles.searchInput}
              underlineColorAndroid="transparent"
              placeholder={search.placeholder}
              placeholderTextColor={primaryLight}
              onChangeText={text => this.searchInput = text}
              onSubmitEditing={this._submit}
            />

            <Touchable style={styles.searchButton} onPress={this._submit} >
              <Icon style={styles.searchIcon} name="search"/>
            </Touchable>
          </View>

          {this.props.queries.length !== 0 && (
            <View>
              <Text style={styles.viewedText}>{search.viewed}:</Text>

              <ScrollView
                horizontal={true}>
                <View style={styles.lastViewed}>
                  {this.props.queries.map((item, index) => (
                    <Touchable key={index} onPress={() => this.props.apply(item)}>
                      <View style={styles.queryView}>
                        <Image
                          style={styles.avatar}
                          source={{ uri: item.avatarUrl || noavatarUrl }}
                        />

                        <Text style={styles.queryName}>{item.name}</Text>
                      </View>
                    </Touchable>
                  ))}
                </View>
              </ScrollView>

            </View>
          )}

          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>BY JEMINAY.PRO</Text>
          </View>
        </View>
      </Body>
    )
  }
}

export default connect(state => ({
  queries: state.queries
}), dispatch => ({
  search: payload => dispatch({ type: SEARCH_PROFILE_ACTION, payload }),
  apply: payload => dispatch({ type: APPLY_PROFILE_ACTION, payload })
}))(SearchScene)
