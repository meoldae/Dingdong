const NotFoundPage = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        background: "#FFF",
      }}
    >
      <img src={`${urlPath}/assets/images/404_error_page.png`} style={{ width: "100%" }} />
    </div>
  )
}

export default NotFoundPage
