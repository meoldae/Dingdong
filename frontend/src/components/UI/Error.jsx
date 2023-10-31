import React from "react"

class Error extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅을 위한 코드는 여기에 추가하면 됩니다. 예: logErrorToMyService(error, errorInfo);
    // 여기서 페이지를 새로고침 합니다.
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // 컴포넌트가 렌더링 도중에 에러가 발생하면 이곳으로 오게 됩니다.
      // 에러 메시지나 대체 UI를 렌더링하거나, 아무것도 렌더링하지 않을 수 있습니다.
      window.location.reload()
      return null
    }

    return this.props.children
  }
}

export default Error
