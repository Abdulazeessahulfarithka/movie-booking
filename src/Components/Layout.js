
import Header from './Header.js'
import Footer from './Footer.js'
import "./Layout.css"

function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "250vh" }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
