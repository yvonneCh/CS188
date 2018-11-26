import React, { Component } from 'react'

import Header from '../../components/Header'
import Card from '../../components/Card'
import Page from '../../components/Page'
import ActionBar from '../../components/ActionBar'

class IngredientsPage extends Component {
  render() {
    let ingredientsView
    if (this.props.ingredients.length === 0) {
      ingredientsView = <Header>You have no ingredients.</Header>
    } else {
      ingredientsView = this.props.ingredients.map((item, i) => (
        <Card
          key={i}
          quantity={item.quantity}
          image={item.image}
          text={item.text}
        />
      ))
    }
    return <Page bottomBar={<ActionBar />}>{ingredientsView}</Page>
  }
}

export default IngredientsPage