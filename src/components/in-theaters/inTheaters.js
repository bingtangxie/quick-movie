import React, { Component } from 'react'
import { getDoubanInTheatersData } from '../../api/in-theaters'
import MoviewPreview from '../movie-preview/moviewPreview'
import ScrollView from '../scroll-view/scroll-view'
import LoadingBig from '../../base/loading-big/loading-big'
import InTheaterBigView from '../in-theater-big-view/in-theather-big-view'
import './in-theaters.css'

class InTheaters extends Component {
  constructor() {
    super()
    this.state = {
      inTheaters: [],
      disInthearBigView: false,
      currentIntheaterBigViewData: null
    }
  }
  render() {
    const inTheaters = this.state.inTheaters
    let moviewPreviews = null
    if (inTheaters.subjects && inTheaters.subjects.length !== 0) {
      moviewPreviews = inTheaters.subjects.map((item, i) => (
        <div className="preview-wrapper" key={i}>
          <MoviewPreview className="test"
            data={{
              movieCover: item.images.large,
              name: item.title,
              type: item.genres,
              rating: item.rating.average
            }}
            press={() => {
              this.onPressMovie(i)
            }}
          />
        </div>
      ))
    }
    return (
      <div className="in-theaters">
        <ScrollView style={{ width: 420, height: 560, background: '#344752' }}>
          {this.state.inTheaters.length <= 0 ? <LoadingBig /> : null}
          <div className="previews">{moviewPreviews}</div>
        </ScrollView>
        {this.state.disInthearBigView ? <InTheaterBigView data={this.state.currentIntheaterBigViewData} onClose={()=>{this.closeBigView()}} /> : null}
      </div>
    )
  }
  componentWillMount() {
    this.getDoubanInTheaters()
  }
  getDoubanInTheaters() {
    getDoubanInTheatersData().then(res => {
      this.setState({
        inTheaters: res
      })
    })
  }
  onPressMovie(i) {
    let disInthearBigView = true
    let currentIntheaterBigViewData = this.state.inTheaters.subjects[i]
    this.setState({
      disInthearBigView,
      currentIntheaterBigViewData
    })
  }
  closeBigView(){
    this.setState({
      disInthearBigView:false
    })
  }
}

export default InTheaters
