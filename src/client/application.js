// import $ from 'jquery'
import _ from 'lodash'
import { bbb } from 'shared/test'
import './application.scss'

bbb()

// $('body').html('WWWWWOW')
console.log(_)
console.log('IT WOSS')

if (module.hot) {
	module.hot.accept()
}