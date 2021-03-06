import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, navigate } from '@reach/router'
import { css } from 'react-emotion'

import 'normalize.css'
import './global/globalStyles'

import RequireAuth from './pages/RequireAuth'
import LoginPage from './pages/LoginPage'
import IngredientsPage from './pages/IngredientsPage'
import IngredientSearch from './pages/IngredientSearch'
import RecipeSearchResults from './pages/RecipeSearchResults'
import RecipePage from './pages/RecipePage'
import colors from './global/colors'

import firebase from 'firebase'
import base, { facebookProvider } from './base'

import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      user: null,
      ingredients: [],
      synced: false,
    }
  }

  addIngredients = ingredients => {
    this.setState({
      ingredients: this.state.ingredients.concat(ingredients),
    })
  }

  removeIngredients = ingredientsListToRemove => {
    var ingredientList = this.state.ingredients
    this.setState({
      ingredients: ingredientList.filter(
        ingredient => !_.some(ingredientsListToRemove, ingredient)
      ),
    })
  }

  login = () => {
    sessionStorage.setItem('loggingIn', true)
    firebase.auth().signInWithRedirect(facebookProvider)
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: null })
        sessionStorage.removeItem('user')
      })
      .catch(error => {
        console.log('logout error:', error)
      })
  }

  syncFirebase = () => {
    if (this.state.user) {
      this.ref = base.syncState(`users/${this.state.user.uid}`, {
        context: this,
        state: 'ingredients',
        asArray: true,
        then: () => {
          this.setState({ synced: true })
        },
      })
    } else {
      console.log('user was undefined', this.state.user)
    }
  }

  componentDidMount() {
    var loggingIn = sessionStorage.getItem('loggingIn')

    if (loggingIn || !this.state.user) {
      var sessionUser = sessionStorage.getItem('user')
      sessionStorage.removeItem('loggingIn')
      if (!sessionUser) {
        firebase
          .auth()
          .getRedirectResult()
          .then(result => {
            // we don't use FB's api for anything else, but keeping this here in case
            // if (result.credential) {
            //   var token = result.credential.accessToken;
            // }

            var user = result.user
            if (user) {
              this.setState({ user: user.providerData[0] }, () => {
                sessionStorage.setItem('user', JSON.stringify(this.state.user))
                this.syncFirebase()
                navigate('/user/ingredients')
              })
            }
          })
          .catch(error => {
            var errorMessage = error.message
            console.log('error in index.js getRedirectResult()', errorMessage)
          })
      } else {
        this.setState({ user: JSON.parse(sessionUser) }, () => {
          sessionStorage.removeItem('loggingIn')
          this.syncFirebase()
          navigate('/user/ingredients')
        })
      }
    } else {
      this.syncFirebase()
      navigate('/user/ingredients')
    }
  }

  render() {
    return (
      <div
        className={css`
          display: flex;
          justify-content: center;
          background: black;
          height: 100vh;
        `}
      >
        <div
          className={css`
            width: 420px;
            @media (max-width: 419px) {
              width: 100vw;
            }
            background: ${colors.offwhite};
            height: 100%;
            > div {
              height: 100%;
              width: inherit;
              overflow-y: scroll;
            }
          `}
        >
          <Router>
            <LoginPage path="/" login={this.login} default />
            <RequireAuth path="user" user={this.state.user}>
              <IngredientsPage
                path="ingredients"
                ingredients={this.state.ingredients}
                removeIngredients={this.removeIngredients}
                user={this.state.user}
                synced={this.state.synced}
              />
              <IngredientSearch
                path="ingredient-search"
                addIngredients={this.addIngredients}
              />
              <RecipeSearchResults
                path="recipe-search-results"
                ingredients={this.state.ingredients}
              />
              <RecipePage path="recipe/:recipeID" />
            </RequireAuth>
          </Router>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
